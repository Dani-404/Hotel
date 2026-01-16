import { UserFurnitureDataUpdated } from "@shared/WebSocket/Events/User/Inventory/UserFurnitureDataUpdated.js";
import UserClient from "../../../Clients/UserClient.js";
import { eventHandler } from "../../../Events/EventHandler.js";
import OutgoingEvent from "../../../Events/Interfaces/OutgoingEvent.js";
import { UserFurniture } from "../../../Database/Models/Users/Furniture/UserFurniture.js";
import { Furniture } from "../../../Database/Models/Furniture/Furniture.js";

eventHandler.addListener("RequestUserFurnitureData", async (client: UserClient) => {
    const userFurniture = await UserFurniture.findAll<UserFurniture>({
        where: {
            userId: client.user.id
        },
        include: {
            model: Furniture,
            as: "furniture"
        }
    });

    client.send(new OutgoingEvent<UserFurnitureDataUpdated>("UserFurnitureDataUpdated", {
        userFurniture: userFurniture.map((userFurniture) => {
            return {
                id: userFurniture.id,
                furnitureData: userFurniture.furniture
            };
        })
    }));
});
