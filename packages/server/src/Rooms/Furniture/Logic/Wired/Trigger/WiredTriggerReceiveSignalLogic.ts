import { WiredFurnitureSelectionData } from "@shared/Interfaces/Room/Furniture/Wired/WiredFurnitureSelectionData";
import RoomUser from "../../../../Users/RoomUser";
import RoomFurniture from "../../../RoomFurniture";
import WiredTriggerLogic from "../WiredTriggerLogic";
import { WiredTriggerOptions } from "../WiredLogic";

export default class WiredTriggerReceiveSignalLogic extends WiredTriggerLogic<WiredFurnitureSelectionData> {
    constructor(roomFurniture: RoomFurniture<WiredFurnitureSelectionData>) {
        super(roomFurniture);
    }

    public async handleWiredSignal(roomFurniture: RoomFurniture<WiredFurnitureSelectionData>, options?: WiredTriggerOptions): Promise<void> {

        if(this.roomFurniture.model.data?.furnitureSource === "list") {
            const signalFurnitureId = this.roomFurniture.model.data.furnitureIds.find((furnitureId) => roomFurniture.model.data?.furnitureSource === "list" && roomFurniture.model.data?.furnitureIds.includes(furnitureId));
            
            if(signalFurnitureId) {
                const signalFurniture = this.roomFurniture.room.getRoomFurniture(signalFurnitureId);

                this.setActive();
                this.handleTrigger({
                    ...options,
                    signalFurniture
                });
            }
        }
    }
}
