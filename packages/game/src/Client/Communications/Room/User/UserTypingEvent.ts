import IncomingEvent from "@Client/Communications/IncomingEvent";
import { UserTypingEventData } from "@Shared/Communications/Responses/Rooms/Users/UserTypingEventData";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";
import { clientInstance } from "../../../..";

export default class UserTypingEvent implements IncomingEvent<WebSocketEvent<UserTypingEventData>> {
    async handle(event: WebSocketEvent<UserTypingEventData>) {
        const roomUser = clientInstance.roomInstance.value?.getUserById(event.data.userId);

        if(roomUser) {
            roomUser.item.typing = event.data.typing;
        }
    }
}
