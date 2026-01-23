import { PlaceRoomContentFurnitureEventData } from "@shared/Communications/Requests/Rooms/Furniture/PlaceRoomContentFurnitureEventData";
import IncomingEvent from "../../../Interfaces/IncomingEvent.js";
import User from "../../../../Users/User.js";
import RoomFurniture from "../../../../Rooms/Furniture/RoomFurniture.js";

export default class PlaceRoomContentFurnitureEvent implements IncomingEvent<PlaceRoomContentFurnitureEventData> {
    async handle(user: User, event: PlaceRoomContentFurnitureEventData) {
        if(!user.room) {
            return;
        }

        const inventory = user.getInventory();

        const userFurniture = await inventory.getFurnitureById(event.userFurnitureId);

        if(!userFurniture) {
            throw new Error("User does not have a user furniture by this id.");
        }

        if(userFurniture.furniture.type === "wallpaper") {
            if(userFurniture.furniture.color === undefined) {
                throw new Error("User room content furniture does not have a color.");
            }

            user.room.setWallId(userFurniture.furniture.color);

            inventory.setFurnitureQuantity(userFurniture, userFurniture.quantity - 1);
        }
        else if(userFurniture.furniture.type === "floor") {
            if(userFurniture.furniture.color === undefined) {
                throw new Error("User room content furniture does not have a color.");
            }

            user.room.setFloorId(userFurniture.furniture.color);

            inventory.setFurnitureQuantity(userFurniture, userFurniture.quantity - 1);
        }
        else {
            throw new Error("User furniture is not of room content type.");
        }
    }
}
