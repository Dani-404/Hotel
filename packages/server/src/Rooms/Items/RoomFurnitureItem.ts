import RoomInstance from "../RoomInstance";
import { RoomFurniture } from "../../Database/Models/Rooms/RoomFurniture.js";
import { RoomFurnitureData } from "@shared/Interfaces/Room/RoomFurnitureData.js";

export default class RoomFurnitureItem {
    constructor(private readonly roomInstance: RoomInstance, public readonly roomFurniture: RoomFurniture) {
    }

    public getFurnitureData(): RoomFurnitureData {
        return {
            id: this.roomFurniture.id,
            furniture: this.roomFurniture.furniture,
            position: this.roomFurniture.position,
            direction: this.roomFurniture.direction,
            animation: this.roomFurniture.animation
        };
    }
}
