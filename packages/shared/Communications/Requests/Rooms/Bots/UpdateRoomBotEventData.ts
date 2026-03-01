import { FigureConfigurationData } from "@pixel63/events";
import { BotSpeechData } from "../../../../Interfaces/Bots/BotSpeechData.js";
import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";

export type UpdateRoomBotEventData = {
    userBotId: string;

    direction?: number;
    position?: RoomPosition;

    motto?: string | null;
    figureConfiguration?: FigureConfigurationData;

    speech?: BotSpeechData;
    relaxed?: boolean;
};
