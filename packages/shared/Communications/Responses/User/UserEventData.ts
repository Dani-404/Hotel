import { FigureConfiguration } from "../../../Interfaces/Figure/FigureConfiguration.js";

export type UserEventData = {
    id: string;
    name: string;
    developer: boolean;
    credits: number;
    duckets: number;
    diamonds: number;
    figureConfiguration: FigureConfiguration;
    homeRoomId: string | null;
};
