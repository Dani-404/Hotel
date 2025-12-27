import { MousePosition } from "@/Interfaces/MousePosition";
import RoomItemInterface from "./RoomItemInterface";
import { RoomPosition } from "@/Interfaces/RoomPosition";

export default interface RoomItemSpriteInterface {
    item: RoomItemInterface;
    priority: number;

    render(context: OffscreenCanvasRenderingContext2D): void;
    mouseover(position: MousePosition): RoomPosition | null;
};
