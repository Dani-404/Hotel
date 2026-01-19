import { ShopPageFurnitureData, ShopPageFurnitureEventData } from "@Shared/Communications/Shop/Responses/ShopPageFurnitureEventData";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";
import { useEffect, useRef, useState } from "react";
import { webSocketClient } from "../../../../..";
import { GetShopPageFurnitureEventData } from "@Shared/Communications/Shop/Requests/GetShopPageFurnitureEventData";

export default function useShopPageFurniture(pageId: string) {
    const [shopFurnitures, setShopFurnitures] = useState<ShopPageFurnitureData[]>([]);
    const shopFurnituresRequested = useRef<string>("");

    useEffect(() => {
        if(shopFurnituresRequested.current === pageId) {
            return;
        }

        shopFurnituresRequested.current = pageId;

        setShopFurnitures([]);

        const listener = (event: WebSocketEvent<ShopPageFurnitureEventData>) => {
            if(event.data.pageId === pageId) {
                setShopFurnitures(event.data.furniture);
            }
        }

        webSocketClient.addEventListener<WebSocketEvent<ShopPageFurnitureEventData>>("ShopPageFurnitureEvent", listener, {
            once: true
        });

        webSocketClient.send<GetShopPageFurnitureEventData>("GetShopPageFurnitureEvent", {
            pageId: pageId
        });
    }, [pageId]);

    return shopFurnitures;
}
