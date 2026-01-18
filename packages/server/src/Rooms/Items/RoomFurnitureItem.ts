import Room from "../Room";
import { RoomFurnitureModel } from "../../Database/Models/Rooms/RoomFurnitureModel.js";
import { RoomFurnitureData } from "@shared/Interfaces/Room/RoomFurnitureData.js";

export default class RoomFurnitureItem {
    constructor(private readonly room: Room, public readonly model: RoomFurnitureModel) {
    }

    public getFurnitureData(): RoomFurnitureData {
        return {
            id: this.model.id,
            furniture: this.model.furniture,
            position: this.model.position,
            direction: this.model.direction,
            animation: this.model.animation
        };
    }
}
