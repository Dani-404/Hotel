import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";

export type UserWalkTo = {
    userId: string;
    from: RoomPosition;
    to: RoomPosition;
};
