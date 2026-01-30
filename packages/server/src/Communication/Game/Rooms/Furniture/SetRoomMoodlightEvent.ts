import { SetRoomMoodlightEventData } from "@shared/Communications/Requests/Rooms/Furniture/SetRoomMoodlightEventData.js";
import IncomingEvent from "../../../Interfaces/IncomingEvent.js";
import User from "../../../../Users/User.js";
import RoomFurniture from "../../../../Rooms/Furniture/RoomFurniture.js";
import OutgoingEvent from "../../../../Events/Interfaces/OutgoingEvent.js";
import { RoomMoodlightEventData } from "@shared/Communications/Responses/Rooms/Furniture/RoomMoodlightEventData.js";

export default class SetRoomMoodlightEvent implements IncomingEvent<SetRoomMoodlightEventData> {
    async handle(user: User, event: SetRoomMoodlightEventData) {
        if(!user.room) {
            return;
        }

        // TODO: verify that it can be enabled

        user.room.model.moodlight = event.moodlight;
        
        await user.room.model.save();

        user.room.sendRoomEvent(
            new OutgoingEvent<RoomMoodlightEventData>("RoomMoodlightEvent", {
                moodlight: user.room.model.moodlight
            })
        );
    }
}
