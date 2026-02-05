'use strict';

import { Op } from "sequelize";
import { getExistingFurnitureAssets } from "../build/Database/Development/FurnitureDevelopmentData.js";
import { randomUUID } from "node:crypto";

const assetNames = ["stone_flowerbed", "garden_c15_toolshed", "garden_c15_shroomchr", "gh_div_wall", "gh_div_cor", "watering_can", "gardening_box", "gardenshed_wall", "stone_wall", "stone_platform", "stone_stairs"];

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {    
    const furnitureDatas = await getExistingFurnitureAssets((assetName) => assetNames.includes(assetName));

    await queryInterface.bulkInsert("furnitures", furnitureDatas.flatMap((furnitures) => furnitures).map((furniture) => {
        return {
            id: randomUUID(),
            type: furniture.type,

            name: furniture.name,
            description: furniture.description,

            flags: JSON.stringify(furniture.flags),

            color: furniture.color ?? null,
            placement: furniture.placement,
            dimensions: JSON.stringify(furniture.dimensions),

            category: furniture.category,
            interactionType: furniture.interactionType,

            createdAt: new Date(),
            updatedAt: new Date()
        };
    }));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("furnitures", {
      type: {
        [Op.in]: assetNames
      }
    }, {});
  }
};
