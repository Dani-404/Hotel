import IncomingEvent from "@Client/Communications/IncomingEvent";
import { ActorActionEventData } from "@Shared/Communications/Responses/Rooms/Actors/ActorActionEventData";
import { clientInstance } from "../../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";

export default class ActorActionEvent implements IncomingEvent<WebSocketEvent<ActorActionEventData>> {
    async handle(event: WebSocketEvent<ActorActionEventData>) {
        if(!clientInstance.roomInstance.value) {
            throw new Error("Room instance is not created.");
        }

        const actor = clientInstance.roomInstance.value.getActor(event.data);

        if(event.data.actionsAdded) {
            for(const action of event.data.actionsAdded) {
                actor.item.figureRenderer.addAction(action);
            }
        }

        if(event.data.actionsRemoved) {
            for(const action of event.data.actionsRemoved) {
                actor.item.figureRenderer.removeAction(action);
            }
        }

        clientInstance.roomInstance.value.focusedUser.update();
    }
}
