import { FigureConfiguration } from "@Shared/Interfaces/Figure/FigureConfiguration";
import { FigureRendererSpriteResult } from "../Renderer/FigureRenderer";

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
    figure: FigureRendererSpriteResult;
    effects: FigureRendererSpriteResult[];
};
