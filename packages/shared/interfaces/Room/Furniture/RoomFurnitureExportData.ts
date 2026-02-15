import { RoomPosition } from "../RoomPosition.js";

export type RoomFurnitureExportData = {
    furniture: {
        type: string;
        color: number | null;

        data: any;

        position: RoomPosition;
        direction: number;

        animation: number;
    }[];
};
