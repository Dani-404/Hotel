import { RoomFloorplanEditData } from "../../../../Interfaces/Room/Floorplan/RoomFloorplanEditData.js";
import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";
import { RoomStructure } from "../../../../Interfaces/Room/RoomStructure.js";

export type UpdateRoomFloorplanEventData = {
    offsets: Omit<RoomPosition, "depth">;
    grid: RoomStructure["grid"];
    door: NonNullable<RoomStructure["door"]>;

    floorThickness: number;
    wallThickness: number;
    
    wallHidden: boolean;
    wallHeight: number;
};
