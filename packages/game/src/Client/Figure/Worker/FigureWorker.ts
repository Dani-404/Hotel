import FigureRenderer from "../FigureRenderer";
import { FigureRenderEvent, FigureRenderResultEvent } from "../Interfaces/FigureRenderEvent";
import { FigureRendererResult, FigureRendererSprite } from "./FigureWorkerRenderer";

export default class FigureWorker {
    private worker = (() => {
        const worker = new Worker(new URL("/src/Workers/Figure/FigureRendererWorker.ts", import.meta.url), {
            type: "module"
        });
        
        worker.onmessage = (event: MessageEvent<FigureRenderResultEvent>) => {
            const id = event.data.id;

            if(event.data.type === "canvas") {
                const request = this.canvasRequests.find((request) => request.id === id);

                if(!request) {
                    return;
                }

                request.resolve({
                    figure: event.data.figure,
                    effects: event.data.effects
                });

                this.canvasRequests.slice(this.canvasRequests.indexOf(request), 1);
            }
            else if(event.data.type === "sprites") {
                throw new Error("Method not implemented");

                const request = this.spritesRequests.find((request) => request.id === id);

                if(!request) {
                    return;
                }

                //request.resolve({
                //    sprites: event.data.sprites,
                //});

                //this.spritesRequests.slice(this.spritesRequests.indexOf(request), 1);
            }
        };

        worker.onerror = (event: ErrorEvent) => {
            console.error(event);
        }

        return worker;
    })();

    private spritesRequests: {
        id: number;
        resolve: (value: FigureRendererSprite[]) => void;
    }[] = [];

    private canvasRequests: {
        id: number;
        resolve: (value: FigureRendererResult) => void;
    }[] = [];

    constructor(private readonly terminateOnComplete: boolean) {

    }

    public renderSpritesInWebWorker(figureRenderer: FigureRenderer, frame: number): Promise<FigureRendererSprite[]> {
        return new Promise<FigureRendererSprite[]>((resolve, reject) => {
            const id = Math.random();

            this.spritesRequests.push({
                id,
                resolve
            });

            this.worker.postMessage({
                id,
                frame,

                type: "sprites",

                configuration: figureRenderer.configuration,
                direction: figureRenderer.direction,
                actions: figureRenderer.actions,
            } satisfies FigureRenderEvent);
        });
    }

    public renderInWebWorker(figureRenderer: FigureRenderer, frame: number, cropped: boolean): Promise<FigureRendererResult> {
        return new Promise<FigureRendererResult>((resolve, reject) => {
            const id = Math.random();

            this.canvasRequests.push({
                id,
                resolve
            });

            this.worker.postMessage({
                id,
                frame,
                cropped,

                type: "canvas",

                configuration: figureRenderer.configuration,
                direction: figureRenderer.direction,
                actions: figureRenderer.actions,
                headOnly: figureRenderer.headOnly,
            } satisfies FigureRenderEvent);
        });
    }

    public terminate() {
        if(!this.terminateOnComplete) {
            return;
        }

        this.worker.terminate();
    }
}