import { MousePosition } from "@/Interfaces/MousePosition";
import RoomItemInterface from "./Interfaces/RoomItemInterface";
import RoomCamera from "./RoomCamera.js";
import { RoomPointerPosition } from "@/Interfaces/RoomPointerPosition";
import ContextNotAvailableError from "../Exceptions/ContextNotAvailableError.js";

export default class RoomRenderer {
    public readonly element: HTMLCanvasElement;
    private readonly camera: RoomCamera;

    public readonly items: RoomItemInterface[] = [];

    private center: MousePosition = {
        left: 0,
        top: 0
    };

    private renderedOffset: MousePosition = {
        left: 0,
        top: 0
    };

    constructor(private readonly parent: HTMLElement) {
        this.element = document.createElement("canvas");
        this.element.classList.add("renderer");

        this.camera = new RoomCamera(this);

        this.parent.appendChild(this.element);

        window.requestAnimationFrame(this.render.bind(this));
    }

    private render() {
        const boundingRectangle = this.parent.getBoundingClientRect();

        this.center = {
            left: Math.floor(boundingRectangle.width / 2),
            top: Math.floor(boundingRectangle.height / 2)
        };

        const image = this.renderOffScreen(boundingRectangle.width, boundingRectangle.height);

        // Automatically clears the context
        this.element.width = boundingRectangle.width;
        this.element.height = boundingRectangle.height;

        const context = this.element.getContext("2d");

        if(!context) {
            throw new ContextNotAvailableError();
        }

        context.drawImage(image, 0, 0);

        window.requestAnimationFrame(this.render.bind(this));
    }

    private renderOffScreen(width: number, height: number) {
        const canvas = new OffscreenCanvas(width, height);

        const context = canvas.getContext("2d");

        if(!context) {
            throw new ContextNotAvailableError();
        }

        for(let index = 0; index < this.items.length; index++) {
            this.items[index].process();
        }

        this.renderedOffset = {
            left: this.center.left + this.camera.cameraPosition.left,
            top: this.center.top + this.camera.cameraPosition.top
        };

        context.translate(this.renderedOffset.left, this.renderedOffset.top);

        const sprites = this.items.flatMap((item) => item.sprites).sort((a, b) => a.priority - b.priority);

        for(let index = 0; index < sprites.length; index++) {
            context.save();

            sprites[index].render(context);

            context.restore();
        }
        

        return canvas;
    }

    public getItemAtPosition(): RoomPointerPosition | null {
        if(this.camera.mousePosition) {
            const offsetMousePosition = {
                left: this.camera.mousePosition.left - this.renderedOffset.left,
                top: this.camera.mousePosition.top - this.renderedOffset.top
            };

            const sprites = this.items.flatMap((item) => item.sprites).sort((a, b) => a.priority - b.priority);

            for(let index = 0; index < sprites.length; index++) {
                const tile = sprites[index].mouseover(offsetMousePosition);

                if(tile) {
                    return {
                        item: sprites[index].item,
                        sprite: sprites[index],
                        position: tile
                    }
                }
            }
        }

        return null;
    }
}
