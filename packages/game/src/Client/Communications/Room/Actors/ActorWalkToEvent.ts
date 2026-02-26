import IncomingEvent from "@Client/Communications/IncomingEvent";
import { ActorWalkToEventData } from "@Shared/Communications/Responses/Rooms/Actors/ActorWalkToEventData";
import { clientInstance } from "../../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";

export default class ActorWalkToEvent implements IncomingEvent<WebSocketEvent<ActorWalkToEventData>> {
    async handle(event: WebSocketEvent<ActorWalkToEventData>) {
        if(!clientInstance.roomInstance.value) {
            throw new Error("Room instance is not created.");
        }

        const actor = clientInstance.roomInstance.value.getActor(event.data);

        actor.item.setPositionPath(event.data.from, event.data.to);
    }
}
