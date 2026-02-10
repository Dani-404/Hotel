import { DataTypes, Model, Sequelize } from "sequelize";
import { RoomPosition } from "@shared/Interfaces/Room/RoomPosition.js";
import { NonAttribute } from "@sequelize/core";
import { FurnitureModel } from "../../Furniture/FurnitureModel.js";
import { RoomModel } from "../../Rooms/RoomModel.js";
import { UserModel } from "../UserModel.js";

export class UserTokenModel extends Model {
    declare id: string;
    declare secretKey: string;
}

export function initializeUserTokenModel(sequelize: Sequelize) {
    UserTokenModel.init(
        {
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
          },
          secretKey: {
              type: DataTypes.TEXT,
              allowNull: false,
              defaultValue: null
          },
        },
        {
          tableName: 'user_tokens',
          sequelize
        },
      );
}
