import { FurnitureAssets } from "../Furniture/FurnitureAssets";
import { FurnitureIndex } from "../Furniture/FurnitureIndex";
import { FurnitureSprites } from "../Furniture/FurnitureSprites";
import { RoomVisualization } from "./RoomVisualization";

export type RoomData = {
    index: FurnitureIndex;
    visualization: RoomVisualization;
    assets: FurnitureAssets;
    sprites: FurnitureSprites;
};
