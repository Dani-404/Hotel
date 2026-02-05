import { PlaceFurnitureEventData } from "@shared/Communications/Requests/Rooms/Furniture/PlaceFurnitureEventData";
import IncomingEvent from "../../../Interfaces/IncomingEvent.js";
import User from "../../../../Users/User.js";
import RoomFurniture from "../../../../Rooms/Furniture/RoomFurniture.js";
import { UserFurnitureModel } from "../../../../Database/Models/Users/Furniture/UserFurnitureModel.js";

export default class PlaceFurnitureEvent implements IncomingEvent<PlaceFurnitureEventData> {
    async handle(user: User, event: PlaceFurnitureEventData) {
        if(!user.room) {
            return;
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

        inventory.deleteFurniture(userFurniture);

        await RoomFurniture.place(user.room, userFurniture, event.position, event.direction);
    }
}
