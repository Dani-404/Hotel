import RoomFurniture from "../../../RoomFurniture";
import RoomUser from "../../../../Users/RoomUser";
import { WiredUserSpecifierData } from "@shared/Interfaces/Room/Furniture/Wired/WiredUserSpecifierData";
import WiredLogic from "../WiredLogic";

export default class WiredTriggerUserEntersRoomLogic extends WiredLogic<WiredUserSpecifierData> {
    constructor(roomFurniture: RoomFurniture<WiredUserSpecifierData>) {
        super(roomFurniture);
    }

    public async handleUserEnteredRoom(roomUser: RoomUser): Promise<void> {
        if(this.roomFurniture.model.data?.match === "user") {
            if(roomUser.user.model.name === this.roomFurniture.model.data.matchUser) {
                this.setActive();
                
                this.handleTrigger({
                    roomUser
                });
            }
        }
        else {
            this.setActive();
            
            this.handleTrigger({
                roomUser
            });
        }
    }
}
