import RoomFurniture from "../../../RoomFurniture";
import RoomUser from "../../../../Users/RoomUser";
import WiredLogic from "../WiredLogic";
import { WiredFurnitureSelectionData } from "@shared/Interfaces/Room/Furniture/Wired/WiredFurnitureSelectionData";
import WiredTriggerReceiveSignalLogic from "../Trigger/WiredTriggerReceiveSignalLogic";

export default class WiredActionSendSignalLogic extends WiredLogic<WiredFurnitureSelectionData> {
    constructor(roomFurniture: RoomFurniture<WiredFurnitureSelectionData>) {
        super(roomFurniture);
    }

    public async handleTrigger(roomUser?: RoomUser): Promise<void> {
        for(const logic of this.roomFurniture.room.getFurnitureWithCategory(WiredTriggerReceiveSignalLogic)) {
            await logic.handleWiredSignal(this.roomFurniture);
        }

        return super.handleTrigger(roomUser);
    }
}