import { RoomPosition } from "../RoomPosition.js";
import { RoomStructure } from "../RoomStructure.js";

export type RoomFloorplanEditData = {
    structure: RoomStructure;
    offsets: Omit<RoomPosition, "depth">;
};
