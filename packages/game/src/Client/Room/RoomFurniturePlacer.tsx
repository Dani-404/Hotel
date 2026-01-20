import FurnitureRenderer from "@Client/Furniture/FurnitureRenderer";
import RoomRenderer from "./Renderer";
import RoomFurnitureItem from "./Items/Furniture/RoomFurnitureItem";
import { FurnitureData } from "@Shared/Interfaces/Room/RoomFurnitureData";
import { RoomPosition } from "@Client/Interfaces/RoomPosition";
import ContextNotAvailableError from "@Client/Exceptions/ContextNotAvailableError";
import { UserFurnitureData } from "@Shared/Interfaces/User/UserFurnitureData";

export default class RoomFurniturePlacer {
    private paused: boolean = true;

    private onPlace?: (position: RoomPosition, direction: number) => void;
    private onCancel?: () => void;

    private readonly renderListener = this.render.bind(this);
    private readonly clickListener = this.click.bind(this);

    private readonly iconElement: HTMLCanvasElement;

    private readonly originalPosition?: RoomPosition;

    public static fromFurnitureData(roomRenderer: RoomRenderer, furnitureData: FurnitureData) {
        const roomFurnitureItem = new RoomFurnitureItem(
            new FurnitureRenderer(furnitureData.type, 64, undefined, 0, furnitureData.color)
        );

        return new RoomFurniturePlacer(roomRenderer, roomFurnitureItem, true);
    }

    constructor(private readonly roomRenderer: RoomRenderer, private readonly roomFurnitureItem: RoomFurnitureItem, private readonly temporaryFurniture: boolean = false) {
        if(this.roomRenderer.furniturePlacer) {
            this.roomRenderer.furniturePlacer.destroy();
        }

        if(roomFurnitureItem.position) {
            this.originalPosition = {
                row: roomFurnitureItem.position.row,
                column: roomFurnitureItem.position.column,
                depth: roomFurnitureItem.position.depth
            };
        }

        //this.furnitureRenderer = new FurnitureRenderer(userFurnitureData.furnitureData.type, 64, undefined, 0, userFurnitureData.furnitureData.color);

        /*this.furnitureItem = new RoomFurnitureItem(this.furnitureRenderer, {
            row: 0,
            column: 0,
            depth: 0
        });*/

        this.roomFurnitureItem.disabled = true;
        this.roomFurnitureItem.alpha = 0.5;

        if(this.roomRenderer.cursor) {
            this.roomRenderer.cursor.cursorDisabled = true;
        }

        if(!this.roomRenderer.items.includes(this.roomFurnitureItem)) {
            this.roomRenderer.items.push(this.roomFurnitureItem);
        }

        this.roomRenderer.addEventListener("render", this.renderListener);
        this.roomRenderer.element.addEventListener("click", this.clickListener);

        this.iconElement = document.createElement("canvas");
        this.iconElement.style.display = "none";
        this.iconElement.style.position = "fixed";
        this.iconElement.style.pointerEvents = "none";
        this.iconElement.style.transform = "translate(-50%, -50%)";

        new FurnitureRenderer(this.roomFurnitureItem.furnitureRenderer.type, 1, 0, 0, this.roomFurnitureItem.furnitureRenderer.color).renderToCanvas().then((image) => {
            this.iconElement.width = image.width;
            this.iconElement.height = image.height;

            const context = this.iconElement.getContext("2d");

            if(!context) {
                throw new ContextNotAvailableError();
            }

            context.drawImage(image, 0, 0);
        });
        
        this.roomRenderer.parent.appendChild(this.iconElement);
    }

    private render() {
        if(this.paused) {
            return;
        }

        const entity = this.roomRenderer.getItemAtPosition((item) => item.type === this.roomFurnitureItem.furnitureRenderer.placement);

        if(entity) {
            if(entity.position.direction !== undefined) {
                this.roomFurnitureItem.furnitureRenderer.direction = entity.position.direction;
            }

            this.roomFurnitureItem.setPosition(entity.position);
            this.roomFurnitureItem.disabled = false;
            this.iconElement.style.display = "none";
        }
        else {
            this.roomFurnitureItem.disabled = true;

            if(this.roomRenderer.camera.mousePosition) {
                this.iconElement.style.display = "block";
                this.iconElement.style.left = `${Math.round(this.roomRenderer.camera.mousePosition.left)}px`;
                this.iconElement.style.top = `${Math.round(this.roomRenderer.camera.mousePosition.top)}px`;
            }
        }
    }

    private click() {
        if(this.paused) {
            return;
        }

        const entity = this.roomRenderer.getItemAtPosition((item) => item.type === this.roomFurnitureItem.furnitureRenderer.placement);

        if(!entity) {
            this.onCancel?.();

            if(this.originalPosition) {
               this.roomFurnitureItem.position = this.originalPosition;
            }
        }
        else {
            this.onPlace?.({...entity.position}, this.roomFurnitureItem.furnitureRenderer.direction!);
        }

        this.stopPlacing();
    }

    public startPlacing(onPlace: (position: RoomPosition, direction: number) => void, onCancel: () => void) {
        this.onPlace = onPlace;
        this.onCancel = onCancel;

        this.paused = false;
    }

    public stopPlacing() {
        this.paused = true;

        delete this.onPlace;
        delete this.onCancel;
    }

    public destroy() {
        if(this.roomRenderer.cursor) {
            this.roomRenderer.cursor.cursorDisabled = false;
        }

        this.iconElement.remove();

        this.roomRenderer.removeEventListener("render", this.renderListener);
        this.roomRenderer.element.removeEventListener("click", this.clickListener);

        if(this.temporaryFurniture) {
            const index = this.roomRenderer.items.indexOf(this.roomFurnitureItem);

            if(index !== -1) {
                this.roomRenderer.items.splice(index, 1);
            }
        }
        else {
            this.roomFurnitureItem.alpha = 1;
        }
    }
}
