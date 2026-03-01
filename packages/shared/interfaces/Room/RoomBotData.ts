import { BotTypeData } from "../Bots/BotTypeData.js";
import { FigureConfigurationData } from "@pixel63/events";

export type UserBotData = {
    id: string;
    userId: string;

    type: BotTypeData;

    name: string;
    motto: string | null;

    figureConfiguration: FigureConfigurationData;
    
    position: {
        row: number;
        column: number;
        depth: number;
    };
    
    direction: number;

    relaxed: boolean;
};
