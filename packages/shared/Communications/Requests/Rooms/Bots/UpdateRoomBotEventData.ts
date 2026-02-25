import { BotSpeechData } from "../../../../Interfaces/Bots/BotSpeechData.js";
import { FigureConfiguration } from "../../../../Interfaces/Figure/FigureConfiguration.js";
import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";

export type UpdateRoomBotEventData = {
    userBotId: string;

    direction?: number;
    position?: RoomPosition;

    motto?: string | null;
    figureConfiguration?: FigureConfiguration;

    speech?: BotSpeechData;
    relaxed?: boolean;
};
