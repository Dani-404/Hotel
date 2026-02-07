import { FurnitureFlagsData } from "../Furniture/FurnitureFlags.js";
import { RoomPosition } from "./RoomPosition.js";

export type FurnitureData = {
    id: string;
    
    type: string;
    color?: number;
    
    name: string;
    description?: string;

    placement: "floor" | "wall";

    flags: FurnitureFlagsData;
    dimensions: RoomPosition;
    interactionType: string;
};

export type RoomFurnitureData = {
    id: string;
    userId: string;
    furniture: FurnitureData;
    position: {
        row: number;
        column: number;
        depth: number;
    };
    direction: number;
    animation: number;
    data: unknown;
};
