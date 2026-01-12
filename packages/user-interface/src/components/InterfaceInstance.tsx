import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AppContext, Dialog, TypedEventTarget } from "../contexts/AppContext";
import Toolbar from "./Toolbar/Toolbar";
import WebSocketClient from "@shared/WebSocket/WebSocketClient";
import WebSocketEvent from "@shared/WebSocket/Events/WebSocketEvent";
import { UserDataUpdated } from "@shared/WebSocket/Events/User/UserDataUpdated";
import { EnterRoom } from "@shared/WebSocket/Events/Rooms/EnterRoom";

export type InterfaceInstanceProps = {
    internalEventTarget: TypedEventTarget;
    webSocketClient: WebSocketClient;
}

export default function InterfaceInstance({ internalEventTarget, webSocketClient }: InterfaceInstanceProps) {
    const [dialogs, setDialogs] = useState<Dialog[]>([
        /*{
            name: "wardrobe",
            element: (<WardrobeDialog/>)
        }*/
    ]);

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

    const addUniqueDialog = useCallback((dialog: Dialog) => {
        if(dialogs.some((existingDialog) => existingDialog.name === dialog.name)) {
            return;
        }

        setDialogs(dialogs.concat([ dialog ]));
    }, [dialogs, setDialogs]);

    return (
        <AppContext value={{
            dialogs,
            addUniqueDialog,

            user,

            internalEventTarget,
            webSocketClient
        }}>
            {dialogs.map((dialog) => (
                <Fragment key={dialog.name}>
                    {dialog.element}
                </Fragment>
            ))}

            <Toolbar/>
        </AppContext>
    );
}