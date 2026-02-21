import IncomingEvent from "@Client/Communications/IncomingEvent";
import { UserChatEventData } from "@Shared/Communications/Responses/Rooms/Users/UserChatEventData";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";
import { clientInstance } from "../../../..";

export default class UserChatEvent implements IncomingEvent<WebSocketEvent<UserChatEventData>> {
    async handle(event: WebSocketEvent<UserChatEventData>) {
        const roomUser = clientInstance.roomInstance.value?.getUserById(event.data.userId);

        if(roomUser) {
            roomUser.item.typing = false;
        }
    }
}
