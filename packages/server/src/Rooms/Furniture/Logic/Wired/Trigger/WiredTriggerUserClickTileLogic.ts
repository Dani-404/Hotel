import RoomFurniture from "../../../RoomFurniture";
import WiredTriggerLogic from "../WiredTriggerLogic";
import RoomUser from "../../../../Users/RoomUser";
import { WiredFurnitureSelectionData } from "@shared/Interfaces/Room/Furniture/Wired/WiredFurnitureSelectionData";
import { RoomPosition } from "@shared/Interfaces/Room/RoomPosition";

export default class WiredTriggerUserClickTileLogic extends WiredTriggerLogic<WiredFurnitureSelectionData> {
    constructor(roomFurniture: RoomFurniture<WiredFurnitureSelectionData>) {
        super(roomFurniture);
    }
    
    public async handleUserClicksTile(roomUser: RoomUser, position: RoomPosition): Promise<void> {
        if(this.roomFurniture.model.data?.furnitureSource === "list" && this.roomFurniture.model.data?.furnitureIds.length) {
            if(this.roomFurniture.model.data.furnitureIds.some((furnitureId) => this.roomFurniture.room.furnitures.find((furniture) => furniture.model.id === furnitureId)?.isPositionInside(position))) {
                this.setActive();
                
                this.handleTrigger(roomUser);
            }
        }
    }
}
