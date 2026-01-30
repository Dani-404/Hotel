import { DataTypes, Model, NonAttribute, Sequelize } from "sequelize";
import { RoomStructure } from "@shared/Interfaces/Room/RoomStructure.js";
import { RoomFurnitureModel } from "./RoomFurnitureModel.js";
import { RoomMoodlightData } from "@shared/Interfaces/Room/RoomMoodlightData.js";

export class RoomModel extends Model {
    declare id: string;
    declare name: string;
    declare structure: RoomStructure;
    declare moodlight: RoomMoodlightData;
    declare maxUsers: number;
    
    declare roomFurnitures: NonAttribute<RoomFurnitureModel[]>;
}

export function initializeRoomModel(sequelize: Sequelize) {
    RoomModel.init(
        {
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
          },
          name: {
            type: new DataTypes.STRING(32),
            allowNull: false,
          },
          maxUsers: {
            type: new DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
          },
          structure: {
              type: DataTypes.TEXT,
              get: function () {
                  return JSON.parse(this.getDataValue("structure"));
              },
              set: function (value: RoomStructure) {
                  this.setDataValue("structure", JSON.stringify({
                    ...value,
                    grid: value.grid.map((row) => row.toUpperCase())
                  }));
              },
              allowNull: false
          },
          moodlight: {
            type: DataTypes.TEXT,
            get: function () {
                return JSON.parse(this.getDataValue("moodlight"));
            },
            set: function (value: RoomMoodlightData) {
                this.setDataValue("moodlight", JSON.stringify(value));
            },
            allowNull: false,
            defaultValue: JSON.stringify({
              enabled: false,

              color: "#FF66CC",
              alpha: 128,

              backgroundOnly: false
            } satisfies RoomMoodlightData)
          }
        },
        {
          tableName: 'rooms',
          sequelize,
        },
    );
}
