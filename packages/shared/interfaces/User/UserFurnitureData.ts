import { FurnitureData } from "../Room/RoomFurnitureData.js";

export type UserFurnitureData = {
    id: string;
    furniture: FurnitureData;
    quantity: number;
};
