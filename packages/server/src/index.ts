import { initializeModels, recreateShop, resetDatabase } from "./Database/Database.js";
import { initializeDevelopmentData } from "./Database/Development/DatabaseDevelopmentData.js";
import Game from "./Game.js";
import { createMissingFurniture } from "./Database/Development/FurnitureDevelopmentData.js";
import { recreateShopPages } from "./Database/Development/ShopDevelopmentData.js";

await initializeModels();

if(resetDatabase) {
    await initializeDevelopmentData();
}

if(recreateShop) {
    await recreateShopPages();
}

if(process.argv.some((value) => value === "create-furniture")) {
    await createMissingFurniture();
}

export const game = new Game();

await game.loadModels();

console.log("Server started");
