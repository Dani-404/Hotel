import ClientInstance from "@Client/ClientInstance";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";
import RoomInstance from "../RoomInstance";
import { webSocketClient } from "../../..";
import { LoadRoomEventData } from "@Shared/Communications/Rooms/Responses/LoadRoomEventData";

export default function registerRoomEvents(clientInstance: ClientInstance) {
    webSocketClient.addEventListener<WebSocketEvent<LoadRoomEventData>>("LoadRoomEvent", (event) => {
        if(clientInstance.roomInstance) {
            clientInstance.roomInstance.terminate();
            //throw new Error("TODO: room is already loaded!!");
        }

        clientInstance.roomInstance = new RoomInstance(clientInstance, event.data);
    });
}
