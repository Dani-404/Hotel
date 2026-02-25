import IncomingEvent from "@Client/Communications/IncomingEvent";
import { RoomBotPositionEventData } from "@Shared/Communications/Responses/Rooms/Bots/RoomBotPositionEventData";
import { clientInstance } from "../../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";

export default class RoomBotPositionEvent implements IncomingEvent<WebSocketEvent<RoomBotPositionEventData>> {
    async handle(event: WebSocketEvent<RoomBotPositionEventData>) {
        if(!clientInstance.roomInstance.value) {
            throw new Error("Room instance is not created.");
        }
        
        const bot = clientInstance.roomInstance.value.getBotById(event.data.botId);

        if(event.data.usePath) {
            bot.item.setPositionPath(bot.item.position!, event.data.position, 0, false);
        }
        else {
            bot.item.finishPositionPath();

            bot.item.setPosition(event.data.position);

            if(event.data.direction !== undefined) {
                bot.item.figureRenderer.direction = event.data.direction;
            }
        }
    }
}
