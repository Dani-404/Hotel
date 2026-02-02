import { useEffect, useRef, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Toolbar from "./Toolbar/Toolbar";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";
import RoomInterface from "./Room/RoomInterface";
import DialogInstances from "./Dialog/DialogInstances";
import { webSocketClient } from "../..";
import { EnterRoomEventData } from "@Shared/Communications/Requests/Rooms/EnterRoomEventData";
import { UserEventData } from "@Shared/Communications/Responses/User/UserEventData";
import Reception from "./Reception/Reception";
import { useRoomInstance } from "../hooks/useRoomInstance";
import Widget from "./Widget/Widget";

export default function InterfaceInstance() {
    const room = useRoomInstance();
    
    const ready = useRef<boolean>(false);
    const [user, setUser] = useState<UserEventData>();

    useEffect(() => {
        const listener = (event: WebSocketEvent<UserEventData>) => {
            setUser(event.data);
        };

        webSocketClient.addEventListener("UserEvent", listener);

        return () => {
            webSocketClient.removeEventListener("UserEvent", listener);
        };
    }, []);

    useEffect(() => {
        if(!ready.current) {
            webSocketClient.send("GetUserEvent", null);

            webSocketClient.send<EnterRoomEventData>("EnterRoomEvent", {
                roomId: "room1"
            });

            ready.current = true;
        }
    }, []);

    if(!user) {
        return null;
    }

    return (
        <AppContext value={{
            user
        }}>
            {(!room) && (
                <Reception/>
            )}

            <RoomInterface/>

            <DialogInstances/>

            <Toolbar/>
            <Widget/>
        </AppContext>
    );
}