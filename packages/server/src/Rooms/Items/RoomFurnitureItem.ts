import RoomInstance from "../RoomInstance";
import { RoomFurniture } from "../../Database/Models/RoomFurniture";

export default class RoomFurnitureItem {
    constructor(private readonly roomInstance: RoomInstance, public readonly roomFurniture: RoomFurniture) {
    }
}
