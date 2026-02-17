import User from "../../../Users/User.js";
import IncomingEvent from "../../Interfaces/IncomingEvent.js";
import { UpdateRoomStructureEventData } from "@shared/Communications/Requests/Rooms/UpdateRoomStructureEventData.js";

export default class UpdateRoomStructureEvent implements IncomingEvent<UpdateRoomStructureEventData> {
    public readonly name = "UpdateRoomStructureEvent";

    async handle(user: User, event: UpdateRoomStructureEventData) {
        if(!user.room) {
            throw new Error("User is not in a room.");
        }

        const structure = user.room.getStructure();

        if(event.floorThickness !== undefined && [0, 4, 8, 12, 16].includes(event.floorThickness)) {
            structure.floor.thickness = event.floorThickness;
        }
        
        if(event.wallThickness !== undefined && [0, 4, 8, 12, 16].includes(event.wallThickness)) {
            structure.wall.thickness = event.wallThickness;
        }
        
        if(event.wallHidden !== undefined) {
            structure.wall.hidden = Boolean(event.wallHidden);
        }
        
        await user.room.setStructure(structure);
    }
}
