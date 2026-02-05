import { RoomInformationEventData } from "@shared/Communications/Responses/Rooms/RoomInformationEventData.js";
import OutgoingEvent from "../../../Events/Interfaces/OutgoingEvent.js";
import User from "../../../Users/User.js";
import IncomingEvent from "../../Interfaces/IncomingEvent.js";
import { UpdateRoomInformationEventData } from "@shared/Communications/Requests/Rooms/UpdateRoomInformationEventData.js";

export default class UpdateRoomInformationEvent implements IncomingEvent<UpdateRoomInformationEventData> {
    async handle(user: User, event: UpdateRoomInformationEventData) {
        if(!user.room) {
            throw new Error("User is not in a room.");
        }

        if(event.name !== undefined) {
            user.room.model.name = event.name;
        }
        
        if(event.description !== undefined) {
            user.room.model.description = event.description;
        }

        if(user.room.model.changed()) {
            await user.room.model.save();

            user.room.sendRoomEvent(new OutgoingEvent<RoomInformationEventData>("RoomInformationEvent", {
                information: {
                    name: user.room.model.name,
                    description: user.room.model.description,

                    owner: {
                        id: user.room.model.owner.id,
                        name: user.room.model.owner.name,
                    }
                }
            }));
        }
    }
}
