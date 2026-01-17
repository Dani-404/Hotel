import registerFigureEvents from "@/Figure/Events/FigureEvents";
import registerFurnitureEvents from "@/Furniture/Events/FurnitureEvents";
import registerRoomEvents from "@/Room/Events/RoomEvents";
import registerUserInterfaceRoomRenderer from "@/Room/UserInterface/CreateRoomRenderer";
import registerRoomInventoryEvents from "@/Room/UserInterface/StartPlacingFurnitureInRoom";
import { TypedEventTarget } from "@shared/Interfaces/TypedEventTarget";
import WebSocketClient from "@shared/WebSocket/WebSocketClient";
import RoomInstance from "./Room/RoomInstance";

export default class ClientInstance {
    public roomInstance?: RoomInstance;

    constructor(public readonly element: HTMLElement, public readonly internalEventTarget: TypedEventTarget, public readonly webSocketClient: WebSocketClient) {
        registerRoomEvents(this);
        registerUserInterfaceRoomRenderer(this);
        registerFigureEvents(this);
        registerFurnitureEvents(this);
        registerRoomInventoryEvents(this);
    }
}
