import { FigureConfigurationData } from "@pixel63/events";
import { BotTypeData } from "../../../Interfaces/Bots/BotTypeData.js";

export type ShopPageBotData = {
    id: string;

    credits?: number | undefined;
    duckets?: number | undefined;
    diamonds?: number | undefined;

    figureConfiguration: FigureConfigurationData;

    name: string;
    motto: string | null;

    type: BotTypeData;
};

export type ShopPageBotsEventData = {
    pageId: string;
    bots: ShopPageBotData[];
};
