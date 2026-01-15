import { DataTypes, Model, NonAttribute, Sequelize } from "sequelize";
import { RoomStructure } from "@shared/Interfaces/Room/RoomStructure.js";
import { RoomFurniture } from "./RoomFurniture.js";

export class Room extends Model {
    declare id: string;
    declare name: string;
    declare structure: RoomStructure;
    
    declare roomFurnitures: NonAttribute<RoomFurniture[]>;
}

export function initializeRoomModel(sequelize: Sequelize) {
    Room.init(
        {
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
          },
          name: {
            type: new DataTypes.STRING(32),
            allowNull: false,
          },
          structure: {
              type: DataTypes.TEXT,
              get: function () {
                  return JSON.parse(this.getDataValue("structure"));
              },
              set: function (value) {
                  this.setDataValue("structure", JSON.stringify(value));
              },
              allowNull: false
          }
        },
        {
          tableName: 'rooms',
          sequelize,
        },
    );
}
