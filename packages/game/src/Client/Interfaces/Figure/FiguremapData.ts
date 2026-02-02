import { FigurePartKeyAbbreviation } from "@Shared/Interfaces/Figure/FigureConfiguration";

export type FiguremapData = {
    id: string;

    parts: {
        id: string;
        type: FigurePartKeyAbbreviation;
    }[];
}[];
