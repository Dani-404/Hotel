import { RoomMapData, RoomMapsEventData } from "@Shared/Communications/Responses/Navigator/RoomMapsEventData";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";
import { useEffect, useRef, useState } from "react";
import { webSocketClient } from "../../../..";
import { NavigatorRoomsEventData } from "@Shared/Communications/Responses/Navigator/NavigatorRoomsEventData";
import { GetNavigatorRoomsEventData } from "@Shared/Communications/Requests/Navigator/GetNavigatorRoomsEventData";

export default function useNavigatorRooms(category: "all") {
    const roomMapsRequested = useRef<string>("");

    const [rooms, setRooms] = useState<NavigatorRoomsEventData>([]);

    useEffect(() => {
        if(roomMapsRequested.current) {
            return;
        }

        roomMapsRequested.current = category;

        const listener = (event: WebSocketEvent<NavigatorRoomsEventData>) => {
            setRooms(event.data);
        };

        webSocketClient.addEventListener<WebSocketEvent<NavigatorRoomsEventData>>("NavigatorRoomsEvent", listener, {
            once: true
        });

        webSocketClient.send<GetNavigatorRoomsEventData>("GetNavigatorRoomsEvent", {
            category
        });
    }, [category]);

    return rooms;
}
