import { RoomPosition } from "../../../Interfaces/Room/RoomPosition.js";

export type RoomClickEventData = {
    userId?: string;
    furnitureId?: string;
    
    position?: RoomPosition;
};
