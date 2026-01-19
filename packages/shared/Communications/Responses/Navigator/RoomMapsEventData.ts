import { RoomStructure } from "../../../Interfaces/Room/RoomStructure.js";

export type RoomMapData = {
    id: string;
    grid: string[];
    door: Required<RoomStructure["door"]>;
};

export type RoomMapsEventData = RoomMapData[];
