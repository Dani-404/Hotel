import IncomingEvent from "../../../Interfaces/IncomingEvent.js";
import User from "../../../../Users/User.js";
import { SetTypingEventData } from "@shared/Communications/Requests/Rooms/User/SetTypingEventData.js";
import OutgoingEvent from "../../../../Events/Interfaces/OutgoingEvent.js";
import { UserTypingEventData } from "@shared/Communications/Responses/Rooms/Users/UserTypingEventData.js";

export default class SetTypingEvent implements IncomingEvent<SetTypingEventData> {
    public readonly name = "SetTypingEvent";

    async handle(user: User, event: SetTypingEventData) {
        if(!user.room) {
            throw new Error("User is not in a room.");
        }

        const roomUser = user.room.getRoomUser(user);

        if(roomUser.typing === event.typing) {
            return;
        }

        roomUser.typing = event.typing === true;

        user.room.sendRoomEvent(new OutgoingEvent<UserTypingEventData>("UserTypingEvent", {
            userId: user.model.id,
            typing: roomUser.typing
        }));
    }
}
