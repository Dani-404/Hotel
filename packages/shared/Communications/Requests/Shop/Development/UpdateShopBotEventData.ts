import { FigureConfigurationData } from "@pixel63/events";
import { BotTypeData } from "../../../../Interfaces/Bots/BotTypeData.js";

export type UpdateShopBotEventData = {
    id: string | null;

    pageId: string;

    type: BotTypeData;
    
    name: string;
    motto: string | null;
    
    figureConfiguration: FigureConfigurationData;

    credits: number;
    duckets: number;
    diamonds: number;
};
