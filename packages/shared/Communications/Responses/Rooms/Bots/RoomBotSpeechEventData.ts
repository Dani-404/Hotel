import { BotSpeechData } from "../../../../Interfaces/Bots/BotSpeechData.js";

export type RoomBotSpeechEventData = {
    userBotId: string;

    speech: BotSpeechData;
};
