import RoomUser from "../../../../Users/RoomUser";
import RoomFurniture from "../../../RoomFurniture";
import WiredTriggerLogic from "../WiredTriggerLogic";
import { WiredTriggerUserPerformsActionData } from "@shared/Interfaces/Room/Furniture/Wired/Trigger/WiredTriggerUserPerformsActionData";

export default class WiredTriggerUserPerformsActionLogic extends WiredTriggerLogic<WiredTriggerUserPerformsActionData> {
    constructor(roomFurniture: RoomFurniture<WiredTriggerUserPerformsActionData>) {
        super(roomFurniture);
    }

    public async handleUserAction(roomUser: RoomUser, actionId: string): Promise<void> {
        const actionName = actionId.split('.')[0];
        const actionNumber = actionId.split('.')[1];

        console.log(this.roomFurniture.model.data?.action);
        console.log(actionName);

        if(this.roomFurniture.model.data?.action === actionName) {
            if(this.roomFurniture.model.data?.filter && ["Dance", "Sign"].includes(this.roomFurniture.model.data.action)) {
                if(actionNumber && parseInt(actionNumber) === this.roomFurniture.model.data.filterId) {
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
}
