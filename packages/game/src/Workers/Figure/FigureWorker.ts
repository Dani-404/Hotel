import FigureAssets from "@Client/Assets/FigureAssets";
import FigureRenderer from "@Client/Figure/Renderer/FigureRenderer";
import { FigureRenderEvent } from "@Client/Figure/Interfaces/FigureRenderEvent";

onmessage = async (event: MessageEvent<FigureRenderEvent>) => {
    try {
        await FigureAssets.loadAssets();

        const figureRenderer = new FigureRenderer(event.data.configuration, event.data.direction, event.data.actions, event.data.frame, event.data.headOnly);
        
        const { figure, effects } = await figureRenderer.renderToCanvas(event.data.cropped);
        
        postMessage({
            id: event.data.id,
            figure,
            effects
        });
    }
    catch(error) {
        console.error(error);
    }
};
