import User from "../../User.js";
import { eventHandler } from "../../../Events/EventHandler.js";

eventHandler.addListener("RequestUserFurnitureData", async (client: User) => {
    await client.getInventory().sendFurniture();
});
