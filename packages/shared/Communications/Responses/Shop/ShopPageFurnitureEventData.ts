import { FurnitureData } from "../../../Interfaces/Room/RoomFurnitureData.js";

export type ShopPageFurnitureData = {
    id: string;
    furniture: FurnitureData;
};

export type ShopPageFurnitureEventData = {
    pageId: string;
    furniture: ShopPageFurnitureData[];
};
