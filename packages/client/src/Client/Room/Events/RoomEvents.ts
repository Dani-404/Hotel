import ClientInstance from "@/ClientInstance.js";
import WebSocketEvent from "@shared/WebSocket/Events/WebSocketEvent.js";
import { LoadRoom } from "@shared/WebSocket/Events/Rooms/LoadRoom.js";
import RoomInstance from "../RoomInstance.js";

export default function registerRoomEvents(clientInstance: ClientInstance) {
    clientInstance.webSocketClient.addEventListener<WebSocketEvent<LoadRoom>>("LoadRoom", (event) => {
        if(clientInstance.roomInstance) {
            throw new Error("TODO: room is already loaded!!");
        }

        clientInstance.roomInstance = new RoomInstance(clientInstance, event.data);
    });
}
