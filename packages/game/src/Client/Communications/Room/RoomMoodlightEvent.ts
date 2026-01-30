import IncomingEvent from "@Client/Communications/IncomingEvent";
import { RoomMoodlightEventData } from "@Shared/Communications/Responses/Rooms/Furniture/RoomMoodlightEventData";
import { clientInstance } from "../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";

export default class RoomMoodlightEvent implements IncomingEvent<WebSocketEvent<RoomMoodlightEventData>> {
    async handle(event: WebSocketEvent<RoomMoodlightEventData>) {
        if(!clientInstance.roomInstance.value) {
            throw new Error("Room instance is not created.");
        }
        
        clientInstance.roomInstance.value.setMoodlight(event.data.moodlight);
    }
}
