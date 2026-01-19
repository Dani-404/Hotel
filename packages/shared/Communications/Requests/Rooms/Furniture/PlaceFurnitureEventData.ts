import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";

export type PlaceFurnitureEventData = {
    userFurnitureId: string;

    position: RoomPosition;
    direction: number;
}
