import IncomingEvent from "@Client/Communications/IncomingEvent";
import { UserEventData } from "@Shared/Communications/Responses/User/UserEventData";
import { clientInstance } from "../../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";

export default class UserEvent implements IncomingEvent<WebSocketEvent<UserEventData>> {
    async handle(event: WebSocketEvent<UserEventData>) {
        clientInstance.user.value = event.data;
    }
}
