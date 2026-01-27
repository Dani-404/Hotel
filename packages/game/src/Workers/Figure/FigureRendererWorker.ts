import FigureAssets from "@Client/Assets/FigureAssets";
import FigureWorkerRenderer from "@Client/Figure/Worker/FigureWorkerRenderer";
import { FigureRenderEvent } from "@Client/Figure/Interfaces/FigureRenderEvent";

onmessage = async (event: MessageEvent<FigureRenderEvent>) => {
    try {
        await FigureAssets.loadAssets();

        const figureRenderer = new FigureWorkerRenderer(event.data.configuration, event.data.direction, event.data.actions, event.data.frame, event.data.headOnly);
        
        if(event.data.type === "sprites") {
            const { sprites, effectSprites } = await figureRenderer.render();
            
            postMessage({
                id: event.data.id,
                type: "sprites",
                sprites,
                effectSprites
            });
        }
        else if(event.data.type === "canvas") {
            const { figure, effects } = await figureRenderer.renderToCanvas(event.data.cropped);
            
            postMessage({
                id: event.data.id,
                type: "canvas",
                figure,
                effects
            });
        }
    }
    catch(error) {
        console.error(error);
    }
};
