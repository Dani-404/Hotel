import { Fragment, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { AppContext, Dialog, TypedEventTarget } from "../contexts/AppContext";
import Toolbar from "./Toolbar/Toolbar";
import WebSocketClient from "@shared/WebSocket/WebSocketClient";
import WebSocketEvent from "@shared/WebSocket/Events/WebSocketEvent";
import { UserDataUpdated } from "@shared/WebSocket/Events/User/UserDataUpdated";
import { EnterRoom } from "@shared/WebSocket/Events/Rooms/EnterRoom";
import { createRoot, Root } from "react-dom/client";

export type InterfaceInstanceProps = {
    internalEventTarget: TypedEventTarget;
    webSocketClient: WebSocketClient;
}

export default function InterfaceInstance({ internalEventTarget, webSocketClient }: InterfaceInstanceProps) {
    const rootRef = useRef<Root>(null);
    const dialogContainerRef = useRef<HTMLDivElement>(null);
    const dialogs = useRef<Dialog[]>([]);

    const ready = useRef<boolean>(false);
    const [user, setUser] = useState<UserDataUpdated>();

    useEffect(() => {
        const listener = (event: Event) => {
            //console.log("Received client ping in interface instance.", event);
        };

        internalEventTarget.addEventListener("client", listener);

        internalEventTarget.dispatchEvent(new Event("interface"));

        return () => internalEventTarget.removeEventListener("client", listener);
    }, []);

    useEffect(() => {
        const listener = (event: WebSocketEvent<UserDataUpdated>) => {
            setUser(event.data);
        };

        webSocketClient.addEventListener("UserDataUpdated", listener);

        return () => {
            webSocketClient.removeEventListener("UserDataUpdated", listener);
        };
    }, []);

    useEffect(() => {
        if(!ready.current) {
            webSocketClient.send("RequestUserData", null);

            webSocketClient.send<EnterRoom>("EnterRoom", {
                roomId: "room1"
            });

            ready.current = true;
        }
    }, []);

    const updateDialogs = useCallback((dialogs: Dialog[]) => {
        if (!dialogContainerRef.current) {
            return;
        }

        if (!rootRef.current) {
            rootRef.current = createRoot(dialogContainerRef.current);
        }

        rootRef.current.render(
            <>
                {dialogs.map((dialog) => (
                    <Fragment key={dialog.id}>
                        {dialog.element}
                    </Fragment>
                ))}
            </>
        );
    }, [dialogContainerRef, rootRef]);

    const addUniqueDialog = useCallback((id: string, element: ReactElement) => {
        if(dialogs.current.some((dialog) => dialog.id === id)) {
            closeDialog(id);
            
            return;
        }

        dialogs.current.push({
            id,
            element    
        });

        updateDialogs(dialogs.current);
    }, [dialogs]);

    const closeDialog = useCallback((id: string) => {
        const index = dialogs.current.findIndex((dialog) => dialog.id === id);

        if(index === -1) {
            console.warn("Dialog does not exist", id);

            return;
        }

        dialogs.current.splice(index, 1);

        updateDialogs(dialogs.current);
    }, [dialogs]);

    return (
        <AppContext value={{
            //dialogs: dialogs.current,
            addUniqueDialog,
            closeDialog,

            user,

            internalEventTarget,
            webSocketClient
        }}>
            <div ref={dialogContainerRef}/>

            <Toolbar/>
        </AppContext>
    );
}