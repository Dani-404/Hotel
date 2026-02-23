import { useEffect, useState } from "react";
import { webSocketClient } from "../../..";
import WebSocketEvent from "@Shared/WebSocket/Events/WebSocketEvent";
import { RoomBotSpeechEventData } from "@Shared/Communications/Responses/Rooms/Bots/RoomBotSpeechEventData";
import { GetRoomBotSpeechEventData } from "@Shared/Communications/Requests/Rooms/Bots/GetRoomBotSpeechEventData";
import { BotSpeechData } from "@Shared/Interfaces/Bots/BotSpeechData";

export function useBotSpeech(userBotId: string) {
    const [value, setValue] = useState<BotSpeechData | null>(null);

    useEffect(() => {
        const listener = (event: WebSocketEvent<RoomBotSpeechEventData>) => {
            if (event.data.userBotId === userBotId) {
                setValue(event.data.speech);
            }
        };

        webSocketClient.addEventListener<WebSocketEvent<RoomBotSpeechEventData>>("RoomBotSpeechEvent", listener);

        webSocketClient.send<GetRoomBotSpeechEventData>("GetRoomBotSpeechEvent", {
            userBotId
        });

        return () => {
            webSocketClient.removeEventListener<WebSocketEvent<RoomBotSpeechEventData>>("RoomBotSpeechEvent", listener);
        };
    }, [userBotId]);

    return value;
}
