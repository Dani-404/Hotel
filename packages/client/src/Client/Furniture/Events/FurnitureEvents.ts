import ClientFurnitureRequest from "@shared/events/Furniture/ClientFurnitureRequest";
import ClientFurnitureResponse from "@shared/events/Furniture/ClientFurnitureResponse";
import ClientInstance from "@/ClientInstance";
import FurnitureRenderer from "../FurnitureRenderer";

export default function registerFurnitureEvents(clientInstance: ClientInstance) {
    clientInstance.internalEventTarget.addEventListener<ClientFurnitureRequest>("ClientFurnitureRequest", (event) => {
        const furnitureRenderer = new FurnitureRenderer(event.type, event.size, event.direction, event.animation, event.color);

        furnitureRenderer.renderToCanvas().then((image) => {
            clientInstance.internalEventTarget.dispatchEvent(new ClientFurnitureResponse(event.id, image));
        });
    });
}
