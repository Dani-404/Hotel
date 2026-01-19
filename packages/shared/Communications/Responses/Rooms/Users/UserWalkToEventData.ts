import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";

export type UserWalkToEventData = {
    userId: string;
    from: RoomPosition;
    to: RoomPosition;
};
