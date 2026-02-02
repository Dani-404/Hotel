import { FigureConfiguration } from "@Shared/Interfaces/Figure/FigureConfiguration";
import { FigureRendererSprite } from "../Renderer/FigureRenderer";

export type FigureRenderEvent = {
    id: number;
    configuration: FigureConfiguration;
    direction: number;
    frame: number;
    actions: string[];
    cropped?: boolean;
    headOnly?: boolean;
};

export type FigureRenderResultEvent = {
    id: number;
    figure: FigureRendererSprite;
    effects: FigureRendererSprite[];
};
