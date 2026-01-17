import ClientInstance from "@/ClientInstance.js";
import CreateRoomRendererEvent from "@shared/Events/Room/Renderer/CreateRoomRendererEvent.js";
import RoomRenderer from "../Renderer.js";
import { RoomStructure } from "@shared/Interfaces/Room/RoomStructure.js";
import RoomMapItem from "../Items/Map/RoomFurnitureItem.js";
import FloorRenderer from "../Structure/FloorRenderer.js";
import WallRenderer from "../Structure/WallRenderer.js";
import RoomFurnitureItem from "../Items/Furniture/RoomFurnitureItem.js";
import FurnitureRenderer from "@/Furniture/FurnitureRenderer.js";
import FurnitureAssets from "@/Assets/FurnitureAssets.js";
import StartPlacingFurnitureInRoom, { PlaceFurnitureInRoomProperties } from "@shared/Events/Room/Cursor/StartPlacingFurnitureInRoom.js";
import RoomClickEvent from "@/Events/RoomClickEvent.js";

export default function registerRoomInventoryEvents(clientInstance: ClientInstance) {
    clientInstance.internalEventTarget.addEventListener<StartPlacingFurnitureInRoom>("StartPlacingFurnitureInRoom", (event) => {
        if(!clientInstance.roomInstance) {
            return;
        }

        console.log(event);

        clientInstance.roomInstance.roomRenderer.cursor!.cursorDisabled = true;

        const furnitureRenderer = new FurnitureRenderer(event.furnitureData.type, 64, undefined, 0, event.furnitureData.color);
        
        const roomFurnitureItem = new RoomFurnitureItem(furnitureRenderer, {
            row: 0,
            column: 0,
            depth: 0
        });

        const renderListener = () => {
            const entity = clientInstance.roomInstance!.roomRenderer.getItemAtPosition((item) => item.type === "map");

            if(!entity) {
                const index = clientInstance.roomInstance!.roomRenderer.items.indexOf(roomFurnitureItem);

                if(index !== -1) {
                    clientInstance.roomInstance!.roomRenderer.items.splice(clientInstance.roomInstance!.roomRenderer.items.indexOf(roomFurnitureItem), 1);
                }

                return;
            }

            const index = clientInstance.roomInstance!.roomRenderer.items.indexOf(roomFurnitureItem);

            if(index === -1) {
                clientInstance.roomInstance!.roomRenderer.items.push(roomFurnitureItem);
            }

            roomFurnitureItem.setPosition(entity.position);
        };

        clientInstance.roomInstance.roomRenderer.addEventListener("render", renderListener);

        const clickListener = (clickEvent: Event) => {
            if(!(clickEvent instanceof RoomClickEvent)) {
                return;
            }

            if(clickEvent.floorEntity) {
                event.options.onPlace(properties, clickEvent.floorEntity.position);
            }
            else {
                event.options.onCancel(properties);
            }
        };

        clientInstance.roomInstance.roomRenderer.cursor?.addEventListener("click", clickListener);

        const properties: PlaceFurnitureInRoomProperties = {
            terminate: () => {
                clientInstance.roomInstance!.roomRenderer.removeEventListener("render", renderListener);
                clientInstance.roomInstance!.roomRenderer.removeEventListener("click", clickListener);

                const index = clientInstance.roomInstance!.roomRenderer.items.indexOf(roomFurnitureItem);

                if(index !== -1) {
                    clientInstance.roomInstance!.roomRenderer.items.splice(clientInstance.roomInstance!.roomRenderer.items.indexOf(roomFurnitureItem), 1);
                }
                
                clientInstance.roomInstance!.roomRenderer.cursor!.cursorDisabled = false;                
            }
        };

        //event.resolve(properties);
    });
}
