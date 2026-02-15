import { MousePosition } from "@Client/Interfaces/MousePosition";
import RoomSprite from "../../RoomSprite";
import RoomFurnitureItem from "./../RoomFurnitureItem";

export default class RoomFurnitureBackgroundSprite extends RoomSprite {
    private readonly offset: MousePosition = {
        left: 0,
        top: 0
    };

    constructor(public readonly item: RoomFurnitureItem, public readonly image: ImageBitmap, public readonly position?: { x: number; y: number; z: number; }) {
        super(item);

        this.priority = this.position?.z ?? 0;

        if(item.furnitureRenderer.placement === "floor") {
            this.offset.left += 64;
            this.offset.top += 16;
        }
        else {
            if(item.furnitureRenderer.direction === 2) {
                this.offset.left += 96;
            }
            else {
                this.offset.left += 32;
            }

            this.offset.top -= 16;
        }

        if(this.item.furnitureRenderer.type !== "tile_cursor") {
            this.offset.left *= this.item.roomRenderer.getSizeScale();
            this.offset.top *= this.item.roomRenderer.getSizeScale();
        }

        if(this.position) {
            this.offset.left += this.position.x;
            this.offset.top += this.position.y;
        }
    }

    render(context: OffscreenCanvasRenderingContext2D) {
        context.drawImage(this.image, this.offset.left, this.offset.top);
    }

    mouseover() {
        return null;
    }
}
