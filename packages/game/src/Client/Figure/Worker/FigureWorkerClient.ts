import Figure from "../Figure";
import { FigureRenderEvent, FigureRenderResultEvent } from "../Interfaces/FigureRenderEvent";
import { FigureRendererResult } from "../Renderer/FigureRenderer";

export default class FigureWorkerClient {
    private worker = (() => {
        const worker = new Worker(new URL("/src/Workers/Figure/FigureWorker.ts", import.meta.url), {
            type: "module"
        });
        
        worker.onmessage = (event: MessageEvent<FigureRenderResultEvent>) => {
            const id = event.data.id;

            const request = this.canvasRequests.find((request) => request.id === id);

            if(!request) {
                return;
            }

            request.resolve({
                figure: event.data.figure,
                effects: event.data.effects
            });

            this.canvasRequests.splice(this.canvasRequests.indexOf(request), 1);
        };

        worker.onerror = (event: ErrorEvent) => {
            console.error(event);
        }

        return worker;
    })();

    private canvasRequests: {
        id: number;
        resolve: (value: FigureRendererResult) => void;
    }[] = [];

    constructor(private readonly terminateOnComplete: boolean) {

    }

    public renderInWebWorker(figureRenderer: Figure, frame: number, cropped: boolean): Promise<FigureRendererResult> {
        return new Promise<FigureRendererResult>((resolve) => {
            const id = Math.random();

            this.canvasRequests.push({
                id,
                resolve
            });

            this.worker.postMessage({
                id,
                frame,
                cropped,

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