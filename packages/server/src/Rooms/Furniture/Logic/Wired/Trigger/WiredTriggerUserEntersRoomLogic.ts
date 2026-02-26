import RoomFurniture from "../../../RoomFurniture";
import RoomUser from "../../../../Users/RoomUser";
import { WiredTriggerUserEntersRoomData } from "@shared/Interfaces/Room/Furniture/Wired/Trigger/WiredTriggerUserEntersRoomData";
import WiredLogic from "../WiredLogic";

export default class WiredTriggerUserEntersRoomLogic extends WiredLogic<WiredTriggerUserEntersRoomData> {
    constructor(roomFurniture: RoomFurniture<WiredTriggerUserEntersRoomData>) {
        super(roomFurniture);
    }

    public async handleUserEnteredRoom(roomUser: RoomUser): Promise<void> {
        if(this.roomFurniture.model.data?.match === "user") {
            if(roomUser.user.model.name === this.roomFurniture.model.data.matchUser) {
                this.lastTriggered = performance.now();
                this.roomFurniture.setAnimation(101);
                
                this.handleTrigger(roomUser);
            }
        }
        else {
            this.lastTriggered = performance.now();
            this.roomFurniture.setAnimation(101);
            
            this.handleTrigger(roomUser);
        }
    }
}
