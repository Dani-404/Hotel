import IncomingEvent from "@Client/Communications/IncomingEvent";
import { RoomBotActionEventData } from "@Shared/Communications/Responses/Rooms/Bots/RoomBotActionEventData";
import { clientInstance } from "../../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";

export default class RoomBotActionEvent implements IncomingEvent<WebSocketEvent<RoomBotActionEventData>> {
    async handle(event: WebSocketEvent<RoomBotActionEventData>) {
        if(!clientInstance.roomInstance.value) {
            throw new Error("Room instance is not created.");
        }
        
        const bot = clientInstance.roomInstance.value.getBotById(event.data.botId);

        if(event.data.actionsAdded) {
            for(const action of event.data.actionsAdded) {
                bot.item.figureRenderer.addAction(action);
            }
        }

        if(event.data.actionsRemoved) {
            for(const action of event.data.actionsRemoved) {
                bot.item.figureRenderer.removeAction(action);
            }
        }
    }
}
