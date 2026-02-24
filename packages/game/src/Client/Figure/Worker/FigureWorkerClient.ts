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

            this.canvasRequests.splice(this.canvasRequests.indexOf(request), 1);

            if(request.type === "render") {
                request.resolve({
                    figure: event.data.figure,
                    effects: event.data.effects
                });
            }
            else if(request.type === "preload") {
                request.resolve();
            }
        };

        worker.onerror = (event: ErrorEvent) => {
            console.error(event);
        }

        return worker;
    })();

    private canvasRequests: ({
        id: number;
        type: "render";
        resolve: (value: FigureRendererResult) => void;
    } | {
        id: number;
        type: "preload";
        resolve: () => void;
    })[] = [];

    constructor(private readonly terminateOnComplete: boolean) {

    }

    public preload(figure: Figure) {
        const channel = new MessageChannel();

        this.worker.postMessage({
            type: "preload",

            configuration: figure.configuration
        } satisfies FigureRenderEvent, [channel.port1]);

        return new Promise<void>((resolve, reject) => {
            channel.port2.onmessage = () => {
                resolve();
            };

            channel.port2.onmessageerror = () => {
                reject();
            }
        });
    }

    public renderInWebWorker(figureRenderer: Figure, frame: number, cropped: boolean): Promise<FigureRendererResult> {
        const channel = new MessageChannel();

        this.worker.postMessage({
            type: "render",

            frame,
            cropped,

            configuration: figureRenderer.configuration,
            direction: figureRenderer.direction,
            actions: figureRenderer.actions,
            headOnly: figureRenderer.headOnly,
        } satisfies FigureRenderEvent, [channel.port1]);

        return new Promise((resolve, reject) => {
            channel.port2.onmessage = (event) => {
                resolve(event.data);
            };

            channel.port2.onmessageerror = () => {
                reject();
            }
        });
    }

    public terminate() {
        if(!this.terminateOnComplete) {
            return;
        }

        this.worker.terminate();
    }
}