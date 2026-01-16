import { DataTypes, Model, Sequelize } from "sequelize";
import { RoomPosition } from "@shared/Interfaces/Room/RoomPosition.js";

export class Furniture extends Model {
    declare id: string;
    declare type: string;
    declare placement: "floor" | "wall";
    declare dimensions: RoomPosition;
    declare color?: number;
}

export function initializeFurnitureModel(sequelize: Sequelize) {
    Furniture.init(
        {
          id: {
            type: DataTypes.UUID,
            primaryKey: true
          },
          type: {
            type: new DataTypes.STRING(32),
            allowNull: false
          },
          name: {
            type: new DataTypes.STRING(32),
            allowNull: false
          },
          description: {
            type: new DataTypes.STRING(128),
            allowNull: true,
            defaultValue: null
          },
          placement: {
            type: new DataTypes.STRING(32),
            allowNull: false
          },
          dimensions: {
              type: DataTypes.TEXT,
              get: function () {
                  return JSON.parse(this.getDataValue("dimensions"));
              },
              set: function (value) {
                  this.setDataValue("dimensions", JSON.stringify(value));
              },
              allowNull: false
          },
          color: {
            type: DataTypes.NUMBER,
            defaultValue: null
          }
        },
        {
          tableName: "furnitures",
          sequelize
        }
    );
}
