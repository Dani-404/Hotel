import RoomFurniture from "../../../RoomFurniture";
import WiredTriggerLogic from "../WiredTriggerLogic";
import RoomUser from "../../../../Users/RoomUser";
import { WiredFurnitureSelectionData } from "@shared/Interfaces/Room/Furniture/Wired/WiredFurnitureSelectionData";

export default class WiredTriggerStateChangedLogic extends WiredTriggerLogic<WiredFurnitureSelectionData> {
    constructor(roomFurniture: RoomFurniture<WiredFurnitureSelectionData>) {
        super(roomFurniture);
    }
    
    public async handleUserUsesFurniture(roomUser: RoomUser, roomFurniture: RoomFurniture): Promise<void> {
        if(this.roomFurniture.model.data?.furnitureSource === "list" && this.roomFurniture.model.data?.furnitureIds.length) {
            if(this.roomFurniture.model.data.furnitureIds.includes(roomFurniture.model.id)) {
                this.setActive();
                
                this.handleTrigger({
                    roomFurniture,
                    roomUser
                });
            }
        }
    }
}
