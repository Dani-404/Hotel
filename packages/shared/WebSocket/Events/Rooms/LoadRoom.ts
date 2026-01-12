import { RoomFurnitureData } from "../../../Interfaces/Room/RoomFurnitureData.js";
import { RoomStructure } from "../../../Interfaces/Room/RoomStructure.js";
import { RoomUserData } from "../../../Interfaces/Room/RoomUserData.js";

export type LoadRoom = {
    structure: RoomStructure;
    users: RoomUserData[];
    furnitures: RoomFurnitureData[];
};
