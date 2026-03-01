import { useEffect, useState } from "react";
import { clientInstance, webSocketClient } from "../..";
import { GetNavigatorRoomsEventData } from "@Shared/Communications/Requests/Navigator/GetNavigatorRoomsEventData";

export function useNavigator(category: string, search?: string) {
    const [navigator, setNavigator] = useState(clientInstance.navigator.value);
    const [_state, setState] = useState(clientInstance.navigator.state);

    useEffect(() => {
        return clientInstance.navigator.subscribe((navigator) => {
            setNavigator(navigator);
            setState(clientInstance.navigator.state);
        });
    }, []);

    useEffect(() => {
        if (search?.length) {
            webSocketClient.send<GetNavigatorRoomsEventData>("GetNavigatorRoomsEvent", {
                type: "search",
                search
            });
        }
        else {
            webSocketClient.send<GetNavigatorRoomsEventData>("GetNavigatorRoomsEvent", {
                type: "category",
                category
            });
        }
    }, [category, search]);

    return navigator;
}
