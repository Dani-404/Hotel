import registerFigureEvents from "@/Figure/Events/FigureEvents.js";
import registerRoomEvents from "@/Room/Events/RoomEvents.js";
import { TypedEventTarget } from "@shared/Interfaces/TypedEventTarget";
import WebSocketClient from "@shared/WebSocket/WebSocketClient.js";
import RoomInstance from "./Room/RoomInstance.js";

export default class ClientInstance {
    public roomInstance?: RoomInstance;

    constructor(public readonly element: HTMLElement, public readonly internalEventTarget: TypedEventTarget, public readonly webSocketClient: WebSocketClient) {
        registerRoomEvents(this);
        registerFigureEvents(this);
    }
}
