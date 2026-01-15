import { DataTypes, Model, Sequelize } from "sequelize";
import { RoomPosition } from "@shared/Interfaces/Room/RoomPosition.js";
import { NonAttribute } from "@sequelize/core";
import { Furniture } from "../Furniture/Furniture.js";
import { Room } from "./Room.js";

export class RoomFurniture extends Model {
    declare id: string;
    declare position: RoomPosition;
    declare direction: number;
    declare animation: number;

    declare furniture: NonAttribute<Furniture>;
}

export function initializeRoomFurnitureModel(sequelize: Sequelize) {
    RoomFurniture.init(
        {
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
          },
          position: {
              type: DataTypes.TEXT,
              get: function () {
                  return JSON.parse(this.getDataValue("position"));
              },
              set: function (value) {
                  this.setDataValue("position", JSON.stringify(value));
              },
              allowNull: false
          },
          direction: {
            type: DataTypes.NUMBER,
            allowNull: false,
          },
          animation: {
            type: DataTypes.NUMBER,
            defaultValue: 0,
          },
          color: {
            type: DataTypes.NUMBER,
            defaultValue: 0,
          },
        },
        {
          tableName: 'room_furnitures',
          sequelize
        },
      );
    
    RoomFurniture.belongsTo(Furniture, {
        as: "furniture",
        foreignKey: "furnitureId"
    });
    
    Room.hasMany(RoomFurniture, {
        as: "roomFurnitures",
        foreignKey: "roomId"
    });
}
