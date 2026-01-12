import FigureAssets from "@/Assets/FigureAssets.js";
import ClientInstance from "./ClientInstance.js";
import "@/../Workers/Figure/FigureRendererWorker.js";
import "@/Figure/Worker/FigureWorkerRenderer.js";
import WebSocketClient from "@shared/WebSocket/WebSocketClient.js";
import { TypedEventTarget } from "@shared/Interfaces/TypedEventTarget.js";
import FigureConfigurationHelper from "@shared/Figure/FigureConfigurationHelper.js";

(window as any).createClientInstance = async function createClientInstance(element: HTMLElement, internalEventTarget: TypedEventTarget, webSocketClient: WebSocketClient) {
    await FigureAssets.loadAssets();

    //console.log(JSON.stringify(FigureConfigurationHelper.getConfigurationFromString("hd-180-2.hr-828-31.ea-3196-62.ch-255-1415.lg-3216-110.sh-305-62")));

    const clientInstance = new ClientInstance(element, internalEventTarget, webSocketClient);
}
