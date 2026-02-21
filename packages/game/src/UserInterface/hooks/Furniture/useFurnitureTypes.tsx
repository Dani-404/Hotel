import { useEffect, useState } from "react";
import { webSocketClient } from "../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";
import { FurnitureTypesEventData } from "@Shared/Communications/Responses/Furniture/FurnitureTypesEventData";

export default function useFurnitureTypes() {
    const [categories, setCategories] = useState<string[]>([]);
    const [interactionTypes, setInteractionTypes] = useState<string[]>([]);

    useEffect(() => {
        const listener = (event: WebSocketEvent<FurnitureTypesEventData>) => {
            setCategories(event.data.categories);
            setInteractionTypes(event.data.interactionTypes);
        };

        webSocketClient.addEventListener<WebSocketEvent<FurnitureTypesEventData>>("FurnitureTypesEvent", listener);

        webSocketClient.send("GetFurnitureTypesEvent", null);

        return () => {
            webSocketClient.removeEventListener<WebSocketEvent<FurnitureTypesEventData>>("FurnitureTypesEvent", listener);
        };
    }, []);

    return {
        categories, interactionTypes
    };
}