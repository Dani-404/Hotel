import RoomFurniture from "../../../RoomFurniture";
import RoomUser from "../../../../Users/RoomUser";
import WiredLogic, { WiredTriggerOptions } from "../WiredLogic";
import { WiredActionTeleportToFurnitureData } from "@shared/Interfaces/Room/Furniture/Wired/Action/WiredActionTeleportToFurnitureData";

export type DelayedMessageData = {
    userId: string;
    timestamp: number;
};

export default class WiredActionTeleportToLogic extends WiredLogic<WiredActionTeleportToFurnitureData> {
    constructor(roomFurniture: RoomFurniture<WiredActionTeleportToFurnitureData>) {
        super(roomFurniture);
    }

    public async handleTrigger(options?: WiredTriggerOptions): Promise<void> {
        if(options?.roomUser) {
            if(this.roomFurniture.model.data?.furnitureIds.length) {
                const availableFurnitures = this.roomFurniture.room.furnitures.filter((furniture) => this.roomFurniture.model.data?.furnitureIds.includes(furniture.model.id));

                const randomFurniture = availableFurnitures[Math.floor(Math.random() * availableFurnitures.length)];

                if(randomFurniture) {
                    this.setActive();
                    
                    options.roomUser.path.teleportTo(randomFurniture.model.position);
                }
            }
        }

        return super.handleTrigger(options);
    }
}