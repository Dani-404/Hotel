import ContextNotAvailableError from "../../../Exceptions/ContextNotAvailableError.js";
import { MousePosition } from "@/Interfaces/MousePosition";
import RoomItemInterface from "@/Room/Interfaces/RoomItemInterface.js";
import RoomItemSpriteInterface from "@/Room/Interfaces/RoomItemSpriteInterface";
import RoomSprite from "../RoomSprite.js";
import WallRenderer from "@/Room/Structure/WallRenderer.js";

export default class RoomWallSprite extends RoomSprite {
    priority = -2000;

    private image?: OffscreenCanvas;
    private readonly offset: MousePosition;

    constructor(public readonly item: RoomItemInterface, private readonly wallRenderer: WallRenderer) {
        super(item);

        this.wallRenderer.renderOffScreen().then((image) => {
            this.image = image;
        })

        this.offset = {
            left: -(wallRenderer.rows * 32),
            top: -((wallRenderer.depth + 3.5) * 32)  
        }
    }

    render(context: OffscreenCanvasRenderingContext2D) {
        if(!this.image) {
            return;
        }
        
        context.drawImage(this.image, this.offset.left - this.wallRenderer.structure.wall.thickness, this.offset.top);
    }

    mouseover(position: MousePosition) {
        return null;
    }
}