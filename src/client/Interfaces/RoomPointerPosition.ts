import RoomItemInterface from "@/Room/Interfaces/RoomItemInterface";
import RoomItemSpriteInterface from "@/Room/Interfaces/RoomItemSpriteInterface";

export type RoomPointerPosition = {
    item: RoomItemInterface;
    sprite: RoomItemSpriteInterface;

    position: {
        row: number;
        column: number;
        depth: number;
    };
}

