import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";

export type PlaceFurnitureEventData = {
    furnitureId: string;
    userFurnitureId: string;
    stackable: boolean;

    position: RoomPosition;
    direction: number;
}
