import IncomingEvent from "@Client/Communications/IncomingEvent";
import { HotelEventData } from "@Shared/Communications/Responses/Hotel/HotelEventData";
import { clientInstance } from "../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";

export default class HotelEvent implements IncomingEvent<WebSocketEvent<HotelEventData>> {
    async handle(event: WebSocketEvent<HotelEventData>) {
        clientInstance.hotel.value = event.data;
    }
}
