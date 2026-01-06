import { FiguremapData } from "@/Interfaces/Figure/FiguremapData.js";
import AssetFetcher, { AssetSpriteProperties } from "./AssetFetcher.js";
import { FigureData } from "@/Interfaces/Figure/FigureData.js";
import { FiguredataData } from "@/Interfaces/Figure/FiguredataData.js";
import { FigureRendererSprite } from "@/Figure/FigureRenderer.js";
import { AvatarActionsData } from "@/Interfaces/Figure/Avataractions.js";

export default class FigureAssets {
    public static figuremap?: FiguremapData;
    public static figuredata?: FiguredataData;
    public static avataractions?: AvatarActionsData;

    public static async getFiguremapData() {
        return await AssetFetcher.fetchJson<FiguremapData>(`../assets/figure/figuremap.json`);
    }
    
    public static async getFiguredataData() {
        return await AssetFetcher.fetchJson<FiguredataData>(`../assets/figure/figuredata.json`);
    }
    
    public static async getAvataractionsData() {
        return await AssetFetcher.fetchJson<AvatarActionsData>(`../assets/figure/avataractions.json`);
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

    public static readonly assetSprites: Map<string, FigureRendererSprite | null> = new Map();
    public static readonly figureCollection: Map<string, FigureRendererSprite[]> = new Map();
    public static readonly figureImage: Map<string, FigureRendererSprite> = new Map();
}
