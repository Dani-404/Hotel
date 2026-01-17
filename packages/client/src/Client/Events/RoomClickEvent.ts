import RoomSprite from "@/Room/Items/RoomSprite";
import RoomItem from "../Room/Items/RoomItem";
import { RoomPosition } from "@/Interfaces/RoomPosition";
import { RoomPointerPosition } from "@/Interfaces/RoomPointerPosition";

export default class RoomClickEvent extends Event {
    constructor(public readonly floorEntity: RoomPointerPosition | null, public readonly otherEntity: RoomPointerPosition | null) {
        super("click");
    }
}
