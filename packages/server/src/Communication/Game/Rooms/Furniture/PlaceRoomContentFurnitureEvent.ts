import { PlaceRoomContentFurnitureEventData } from "@shared/Communications/Requests/Rooms/Furniture/PlaceRoomContentFurnitureEventData";
import IncomingEvent from "../../../Interfaces/IncomingEvent.js";
import User from "../../../../Users/User.js";
import { UserFurnitureModel } from "../../../../Database/Models/Users/Furniture/UserFurnitureModel.js";

export default class PlaceRoomContentFurnitureEvent implements IncomingEvent<PlaceRoomContentFurnitureEventData> {
    public readonly name = "PlaceRoomContentFurnitureEvent";

    async handle(user: User, event: PlaceRoomContentFurnitureEventData) {
        if(!user.room) {
            return;
        }

        const roomUser = user.room.getRoomUser(user);

        if(!roomUser.hasRights()) {
            throw new Error("User does not have rights.");
        }

        const inventory = user.getInventory();

        let userFurniture: UserFurnitureModel | null = null;
        
        if(event.stackable) {
            userFurniture = await inventory.getFurnitureByType(event.furnitureId);
        }
        else {
            userFurniture = await inventory.getFurnitureById(event.userFurnitureId);
        }

        if(!userFurniture) {
            throw new Error("User does not have a user furniture by this id.");
        }

        if(userFurniture.furniture.type === "wallpaper") {
            if(userFurniture.furniture.color === undefined) {
                throw new Error("User room content furniture does not have a color.");
            }

            user.room.setWallId(userFurniture.furniture.color);

            await userFurniture.destroy();

            inventory.deleteFurniture(userFurniture);
        }
        else if(userFurniture.furniture.type === "floor") {
            if(userFurniture.furniture.color === undefined) {
                throw new Error("User room content furniture does not have a color.");
            }

            user.room.setFloorId(userFurniture.furniture.color);

            await userFurniture.destroy();

            inventory.deleteFurniture(userFurniture);
        }
        else {
            throw new Error("User furniture is not of room content type.");
        }
    }
}
