import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
});

import "./Models/Rooms/Room.js";
import { initializeRoomFurnitureModel } from "./Models/Rooms/RoomFurniture.js";
import { initializeRoomModel } from "./Models/Rooms/Room.js";
import { initializeShopPageModel } from "./Models/Shop/ShopPage.js";
import { initializeShopPageFurnitureModel } from "./Models/Shop/ShopPageFurniture.js";
import { initializeFurnitureModel } from "./Models/Furniture/Furniture.js";
import { initializeUserFurnitureModel } from "./Models/Users/Furniture/UserFurniture.js";

export async function initializeModels() {
  initializeFurnitureModel(sequelize);

  initializeShopPageModel(sequelize);
  initializeShopPageFurnitureModel(sequelize);

  initializeRoomModel(sequelize);
  initializeRoomFurnitureModel(sequelize);

  initializeUserFurnitureModel(sequelize);

  await sequelize.sync();
}
