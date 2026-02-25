import IncomingEvent from "@Client/Communications/IncomingEvent";
import { RoomBotWalkToEventData } from "@Shared/Communications/Responses/Rooms/Bots/RoomBotWalkToEventData";
import { clientInstance } from "../../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";

export default class RoomBotWalkToEvent implements IncomingEvent<WebSocketEvent<RoomBotWalkToEventData>> {
    async handle(event: WebSocketEvent<RoomBotWalkToEventData>) {
        if(!clientInstance.roomInstance.value) {
            throw new Error("Room instance is not created.");
        }

        const bot = clientInstance.roomInstance.value.getBotById(event.data.botId);

        bot.item.setPositionPath(event.data.from, event.data.to);
    }
}
