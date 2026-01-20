import { useCallback, useEffect, useRef, useState } from "react";
import { AppContext, Dialog } from "../contexts/AppContext";
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

export type InterfaceInstanceProps = {
}

export default function InterfaceInstance({  }: InterfaceInstanceProps) {
    const room = useRoomInstance();
    
    const [dialogs, setDialogs] = useState<Dialog[]>([]);

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

    const addUniqueDialog = useCallback((type: string) => {
        if(dialogs.some((dialog) => dialog.id === type)) {
            closeDialog(type);
            
            return;
        }

        setDialogs(dialogs.concat({
            id: type,
            data: null,
            type
        }));
    }, [dialogs, user]);

    const closeDialog = useCallback((id: string) => {
        const index = dialogs.findIndex((dialog) => dialog.id === id);

        if(index === -1) {
            console.warn("Dialog does not exist", id);

            return;
        }

        setDialogs(dialogs.filter((dialog) => dialog.id !== id));
    }, [dialogs, user]);

    const setDialogHidden = useCallback((id: string, hidden: boolean) => {
        const index = dialogs.findIndex((dialog) => dialog.id === id);

        if(index === -1) {
            console.warn("Dialog does not exist", id);

            return;
        }

        const mutatedDialogs = [...dialogs];

        mutatedDialogs[index].hidden = hidden;

        setDialogs(mutatedDialogs);
    }, [dialogs, user]);

    if(!user) {
        return null;
    }

    return (
        <AppContext value={{
            dialogs,
            addUniqueDialog,
            setDialogHidden,
            closeDialog,

            user
        }}>
            {(!room) && (
                <Reception/>
            )}

            <RoomInterface/>

            <DialogInstances dialogs={dialogs}/>

            <Toolbar/>
            <Widget/>
        </AppContext>
    );
}