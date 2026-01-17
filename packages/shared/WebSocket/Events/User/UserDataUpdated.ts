import { FigureConfiguration } from "../../../Interfaces/Figure/FigureConfiguration.js";

export type UserDataUpdated = {
    id: string;
    name: string;
    figureConfiguration: FigureConfiguration;
};
