import RoomFurniture from "../../../RoomFurniture";
import WiredTriggerLogic from "../WiredTriggerLogic";
import RoomUser from "../../../../Users/RoomUser";
import { WiredUserSpecifierData } from "@shared/Interfaces/Room/Furniture/Wired/WiredUserSpecifierData";

export default class WiredTriggerUserClickUserLogic extends WiredTriggerLogic<WiredUserSpecifierData> {
    constructor(roomFurniture: RoomFurniture<WiredUserSpecifierData>) {
        super(roomFurniture);
    }
    
    public async handleUserClickUser(roomUser: RoomUser, targetUser: RoomUser): Promise<void> {
        if(this.roomFurniture.model.data?.match === "user") {
            if(targetUser.user.model.name === this.roomFurniture.model.data.matchUser) {
                this.setActive();
                
                this.handleTrigger(roomUser);
            }
        }
        else {
            this.setActive();
            
            this.handleTrigger(roomUser);
        }
    }
}
