import IncomingEvent from "@Client/Communications/IncomingEvent";
import { UserFigureConfigurationEventData } from "@Shared/Communications/Responses/Rooms/Users/UserFigureConfigurationEventData";
import { clientInstance } from "../../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";

export default class UserFigureConfigurationEvent implements IncomingEvent<WebSocketEvent<UserFigureConfigurationEventData>> {
    async handle(event: WebSocketEvent<UserFigureConfigurationEventData>) {
        if(!clientInstance.roomInstance.value) {
            throw new Error("Room instance is not created.");
        }
        
        const roomUser = clientInstance.roomInstance.value.getUserById(event.data.userId);

        roomUser.data.figureConfiguration = event.data.figureConfiguration;
        roomUser.item.figureRenderer.configuration = event.data.figureConfiguration;
    }
}
