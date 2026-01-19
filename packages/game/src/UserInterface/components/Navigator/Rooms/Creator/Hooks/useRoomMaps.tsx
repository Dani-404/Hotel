import { RoomMapData, RoomMapsResponse } from "@Shared/WebSocket/Events/Rooms/Maps/RoomMapsResponse";
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

        const listener = (event: WebSocketEvent<RoomMapsResponse>) => {
            setRoomMaps(event.data);
        };

        webSocketClient.addEventListener<WebSocketEvent<RoomMapsResponse>>("RoomMapsResponse", listener, {
            once: true
        });

        webSocketClient.send("RoomMapsRequest", null);
    }, []);

    return roomMaps;
}
