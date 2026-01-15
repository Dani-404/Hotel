import { NonAttribute } from "@sequelize/core";
import { DataTypes, Model, Sequelize } from "sequelize";
import { Furniture } from "../Furniture/Furniture.js";
import { ShopPage } from "./ShopPage.js";

export class ShopPageFurniture extends Model {
    declare id: string;
    
    declare furniture: NonAttribute<Furniture>;
}

export function initializeShopPageFurnitureModel(sequelize: Sequelize) {
    ShopPageFurniture.init(
        {
          id: {
            type: DataTypes.UUID,
            primaryKey: true
          }
        },
        {
          tableName: "shop_page_furnitures",
          sequelize
        }
    );
    
    ShopPageFurniture.belongsTo(Furniture, {
        as: "furniture",
        foreignKey: "furnitureId"
    });
    
    ShopPage.hasMany(ShopPageFurniture, {
        as: "furniture",
        foreignKey: "shopPageId"
    });
}
