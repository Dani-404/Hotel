import { FigureAnimationData } from "@Client/Interfaces/Figure/FigureAnimationData";
import { FurnitureAssets } from "../Furniture/FurnitureAssets";
import { FurnitureSprites } from "../Furniture/FurnitureSprites";

export type FigureData = {
    assets: FurnitureAssets;
    sprites: FurnitureSprites;
    animation?: FigureAnimationData;
};
