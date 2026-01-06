import { FiguremapData } from "@/Interfaces/Figure/FiguremapData.js";
import FigureAssets from "../Assets/FigureAssets.js";
import ContextNotAvailableError from "../Exceptions/ContextNotAvailableError.js";
import { FiguredataData } from "@/Interfaces/Figure/FiguredataData.js";
import { figureRenderPriority } from "./FigureRenderPriority.js";

export type FigurePartKeyAbbreviation = "hr" | "lg" | "ch" | "hd" | "sh" | "he" | "wa" | "ha" | "ca" | "ea";
export type FigurePartKey = "hair" | "leg" | "shirt" | "body" | "shoe" | "head" | "waist" | "hat" | "chest" | "eye";

export type FigureConfiguration = {
    type: FigurePartKeyAbbreviation;
    setId: string;
    colorIndex?: number;
}[];

export type FigureRendererSprite = {
    image: OffscreenCanvas;
    imageData: ImageData;

    x: number;
    y: number;

    index: number;
}

export default class FigureRenderer {
    public static figureItemAbbreviations: Record<FigurePartKey, FigurePartKeyAbbreviation> = {
        hair: "hr",
        leg: "lg",
        shirt: "ch",
        body: "hd",
        shoe: "sh",
        head: "he",
        waist: "wa",
        hat: "ha",
        chest: "ca",
        eye: "ea"
    };

    public readonly direction: number = 4;

    constructor(private readonly configuration: FigureConfiguration) {

    }

    private getSettypeForPartAndSet(figuredata: FiguredataData, part: FigurePartKeyAbbreviation) {
        return figuredata.settypes.find((settype) => settype.type === part);
    }

    private getSetFromSettype(settype: FiguredataData["settypes"][0], setId: string) {
        return settype.sets.find((set) => set.id === setId);
    }

    private getAssetForSetPart(figuremap: FiguremapData, assetId: string, assetType: FigurePartKeyAbbreviation) {
        for(let index = figuremap.length - 1; index >= 0; index--) {
            if(figuremap[index].id.startsWith("hh_human_50")) {
                continue;
            }

            if(figuremap[index].parts.some((part) => part.id === assetId && part.type === assetType.substring(0, 2))) {
                return figuremap[index];
            }
        }

        return null;
    }

    public async render() {
        const figuremap = await FigureAssets.getFiguremapData();
        const figuredata = await FigureAssets.getFiguredataData();

        const action = "std";
        const direction = (this.direction > 3 && this.direction < 7)?(6 - this.direction):(this.direction);
        const frame = 0;

        const result: FigureRendererSprite[] = [];

        for(let configurationPart of this.configuration) {
            const settypeData = this.getSettypeForPartAndSet(figuredata, configurationPart.type);

            if(!settypeData) {
                console.warn("No set type exists for part type " + configurationPart.type + ".");

                continue;
            }

            const setData = this.getSetFromSettype(settypeData, configurationPart.setId);

            if(!setData) {
                console.warn("No set exists in set type for id.");

                continue;
            }

            for(let setPartData of setData.parts) {
                if(!setPartData) {
                    console.warn("Set part does not exist.");

                    continue;
                }

                const asset = this.getAssetForSetPart(figuremap, setPartData.id, setPartData.type);

                if(!asset) {
                    console.warn("Asset for set part does not exist.", setPartData.id, setPartData.type);

                    continue;
                }

                const data = await FigureAssets.getFigureData(asset.id);

                const assetName = `h_${action}_${setPartData.type}_${setPartData.id}_${direction}_${frame}`;

                const assetData = data.assets.find((asset) => asset.name === assetName);

                if(!assetData) {
                    console.warn("Asset data is missing for sprite " + assetName + " in " + asset.id + ".");

                    continue;
                }

                const spriteData = data.sprites.find((sprite) => sprite.name === (assetData.source ?? assetData.name));

                if(!spriteData) {
                    console.warn("Sprite data is missing for asset.");

                    continue;
                }

                const palette = figuredata.palettes.find((palette) => palette.id === settypeData.paletteId);
                const paletteColor = palette?.colors.find((color) => color.id === configurationPart.colorIndex);

                const sprite = await FigureAssets.getFigureSprite(asset.id, {
                    x: spriteData.x,
                    y: spriteData.y,

                    width: spriteData.width,
                    height: spriteData.height,

                    flipHorizontal: (this.direction > 3 && this.direction < 7)?(!Boolean(assetData.flipHorizontal)):(assetData.flipHorizontal),

                    color: (setPartData.colorable && configurationPart.colorIndex)?(paletteColor?.color):(undefined)
                });

                const partPriority = figureRenderPriority[action][direction.toString() as "2"].indexOf(setPartData.type);

                if(partPriority === -1) {
                    continue;
                }

                let x = assetData.x;

                if((this.direction > 3 && this.direction < 7)) {
                    x = 64 + (assetData.x * -1) - spriteData.width;
                }

                result.push({
                    image: sprite.image,
                    imageData: sprite.imageData,
                    
                    x,
                    y: assetData.y,

                    index: partPriority + setPartData.index,
                });
            }
        }

        console.log(result);

        return result;
    }

    public async renderToCanvas() {
        const canvas = new OffscreenCanvas(256, 256);
        const context = canvas.getContext("2d");

        if(!context) {
            throw new ContextNotAvailableError();
        }

        const sprites = await this.render();

        sprites.sort((a, b) => a.index - b.index);

        context.fillStyle = "red";
        context.fillRect(0, 0, 50, 50);

        context.translate(64, 128);

        for(let sprite of sprites) {
            context.drawImage(sprite.image, sprite.x, sprite.y);
        }

        return canvas;
    }

    public static getConfigurationFromString(figureString: string): FigureConfiguration {
        const parts = figureString.split('.');

        const configuration: FigureConfiguration = [];

        for(let part of parts) {
            const sections = part.split('-');

            configuration.push({
                type: sections[0] as FigurePartKeyAbbreviation,
                setId: sections[1],
                colorIndex: (sections[2])?(parseInt(sections[2])):(undefined)
            });
        }

        return configuration;
    }
}
