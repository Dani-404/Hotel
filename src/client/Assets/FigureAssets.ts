import { FiguremapData } from "@/Interfaces/Figure/FiguremapData.js";
import AssetFetcher, { AssetSpriteProperties } from "./AssetFetcher.js";
import { FigureData } from "@/Interfaces/Figure/FigureData.js";
import { FiguredataData } from "@/Interfaces/Figure/FiguredataData.js";

export default class FigureAssets {
    public static async getFiguremapData() {
        return await AssetFetcher.fetchJson<FiguremapData>(`../assets/figure/figuremap.json`);
    }
    
    public static async getFiguredataData() {
        return await AssetFetcher.fetchJson<FiguredataData>(`../assets/figure/figuredata.json`);
    }

    public static async getFigureData(name: string) {
        return await AssetFetcher.fetchJson<FigureData>(`../assets/figure/${name}/${name}.json`);
    }

    public static async getFigureSpritesheet(name: string) {
        return await AssetFetcher.fetchImage(`../assets/figure/${name}/${name}.png`);
    }

    public static async getFigureSprite(name: string, properties: AssetSpriteProperties): Promise<{ image: OffscreenCanvas, imageData: ImageData }> {
        return await AssetFetcher.fetchImageSprite(`../assets/figure/${name}/${name}.png`, properties);
    }

    //public static readonly assetSprites: Map<string, FurnitureRendererSprite | null> = new Map();
}
