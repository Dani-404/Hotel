import { WiredFurnitureSelectionData } from "@shared/Interfaces/Room/Furniture/Wired/WiredFurnitureSelectionData";
import RoomUser from "../../../../Users/RoomUser";
import RoomFurniture from "../../../RoomFurniture";
import WiredTriggerLogic from "../WiredTriggerLogic";

export default class WiredTriggerReceiveSignalLogic extends WiredTriggerLogic<WiredFurnitureSelectionData> {
    constructor(roomFurniture: RoomFurniture<WiredFurnitureSelectionData>) {
        super(roomFurniture);
    }

    public async handleWiredSignal(roomFurniture: RoomFurniture<WiredFurnitureSelectionData>): Promise<void> {
        if(this.roomFurniture.model.data?.furnitureSource === "list" && this.roomFurniture.model.data.furnitureIds.some((furnitureId) => roomFurniture.model.data?.furnitureSource === "list" && roomFurniture.model.data?.furnitureIds.includes(furnitureId))) {
            this.setActive();
            this.handleTrigger();
        }
    }
}
