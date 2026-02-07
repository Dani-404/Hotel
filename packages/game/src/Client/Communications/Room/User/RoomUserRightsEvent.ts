import IncomingEvent from "@Client/Communications/IncomingEvent";
import { RoomUserRightsEventData } from "@Shared/Communications/Responses/Rooms/Users/RoomUserRightsEventData";
import { clientInstance } from "../../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";

export default class RoomUserRightsEvent implements IncomingEvent<WebSocketEvent<RoomUserRightsEventData>> {
    async handle(event: WebSocketEvent<RoomUserRightsEventData>) {
        if(!clientInstance.roomInstance.value) {
            throw new Error("Room instance is not created.");
        }
        
        const roomUser = clientInstance.roomInstance.value.getUserById(event.data.userId);

        roomUser.data.hasRights = event.data.hasRights;

        if(clientInstance.user.value?.id === event.data.userId) {
            clientInstance.roomInstance.value.hasRights = event.data.hasRights;
        }

        clientInstance.roomInstance.update();
    }
}
