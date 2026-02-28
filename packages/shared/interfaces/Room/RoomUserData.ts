import { FigureConfigurationData } from "@pixel63/events";

export type RoomUserData = {
    id: string;
    name: string;
    figureConfiguration: FigureConfigurationData;
    
    position: {
        row: number;
        column: number;
        depth: number;
    };

    typing: boolean;
    idling: boolean;
    
    direction: number;
    hasRights: boolean;
    actions: string[];
};
