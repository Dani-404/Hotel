import { RoomMapData, RoomMapsEventData } from "@Shared/Communications/Responses/Navigator/RoomMapsEventData";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";
import { useEffect, useRef, useState } from "react";
import { webSocketClient } from "../../../../../..";

export default function useRoomMaps() {
    const roomMapsRequested = useRef(false);

    const [roomMaps, setRoomMaps] = useState<RoomMapData[]>([]);

    useEffect(() => {
        if(roomMapsRequested.current) {
            return;
        }

        roomMapsRequested.current = true;

        const listener = (event: WebSocketEvent<RoomMapsEventData>) => {
            setRoomMaps(event.data);
        };

        webSocketClient.addEventListener<WebSocketEvent<RoomMapsEventData>>("RoomMapsEvent", listener, {
            once: true
        });

        webSocketClient.send("RoomMapsRequest", null);
    }, []);

    return roomMaps;
}
