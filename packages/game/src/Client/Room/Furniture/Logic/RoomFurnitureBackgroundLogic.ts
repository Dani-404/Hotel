import FurnitureLogic from "@Client/Furniture/Logic/Interfaces/FurnitureLogic";
import RoomInstance from "@Client/Room/RoomInstance";
import RoomFurniture from "@Client/Room/Furniture/RoomFurniture";
import { clientInstance } from "../../../..";
import { RoomFurnitureBackgroundDialogData } from "../../../../UserInterface/components/Room/Furniture/Logic/Background/RoomFurnitureBackgroundDialog";

export default class RoomFurnitureBackgroundLogic implements FurnitureLogic {
    constructor(private readonly room: RoomInstance, private readonly roomFurniture: RoomFurniture) {
    }

    isAvailable() {
        return this.room.hasRights;
    }

    use(): void {
        if(!this.isAvailable()) {
            return;
        }

        clientInstance.dialogs.value = clientInstance.dialogs.value?.concat({
            id: Math.random().toString(),
            type: "room-furniture-logic",
            data: {
                furniture: this.roomFurniture,
                type: "furniture_background"
            } satisfies RoomFurnitureBackgroundDialogData
        });
    }
}
