import RoomFurniture from "../../../RoomFurniture";
import WiredTriggerLogic from "../WiredTriggerLogic";
import { WiredTriggerStuffStateData } from "@shared/Interfaces/Room/Furniture/Wired/Trigger/WiredTriggerStuffStateData";

export default class WiredTriggerStuffStateLogic extends WiredTriggerLogic<WiredTriggerStuffStateData> {
    constructor(roomFurniture: RoomFurniture<WiredTriggerStuffStateData>) {
        super(roomFurniture);
    }

    public async handleFurnitureAnimationChange(roomFurniture: RoomFurniture): Promise<void> {
        if(this.roomFurniture.model.data?.furnitureSource === "list" && this.roomFurniture.model.data?.furnitureIds.length) {
            const index = this.roomFurniture.model.data.furnitureIds.indexOf(roomFurniture.model.id);

            if(index !== -1) {
                if(this.roomFurniture.model.data.trigger === "all") {
                    this.setActive();
                    
                    this.handleTrigger();
                }
                else if(this.roomFurniture.model.data.trigger === "state") {
                    const expectedState = this.roomFurniture.model.data.furnitureTriggerStates.at(index);

                    if(expectedState !== undefined) {
                        if(roomFurniture.model.animation === expectedState) {
                            this.setActive();
                            
                            this.handleTrigger();
                        }
                    }
                }
            }
        }
    }
}
