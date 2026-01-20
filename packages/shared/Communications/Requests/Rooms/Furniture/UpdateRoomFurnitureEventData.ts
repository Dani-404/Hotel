import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";

export type UpdateRoomFurnitureEventData = {
    roomFurnitureId: string;

    animation?: number;
    direction?: number;
    position?: RoomPosition;
};
