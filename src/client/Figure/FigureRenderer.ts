import { FiguremapData } from "@/Interfaces/Figure/FiguremapData.js";
import FigureAssets from "../Assets/FigureAssets.js";
import ContextNotAvailableError from "../Exceptions/ContextNotAvailableError.js";
import { FiguredataData } from "@/Interfaces/Figure/FiguredataData.js";
import { figureRenderPriority } from "./FigureRenderPriority.js";
import { AvatarActionsData } from "@/Interfaces/Figure/Avataractions.js";
import { FigureData } from "@/Interfaces/Figure/FigureData.js";

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

    private renderCache?: {
        configurationPart: FigureConfiguration[0],
        setPartData: FiguredataData["settypes"][0]["sets"][0]["parts"][0],
        settypeData: FiguredataData["settypes"][0],
        figureData: FigureData,
        setPartAssetData: FiguremapData[0]
    }[];

    public currentSpriteFrame: number = -1;
    private isRendering: boolean = false;

    public readonly actions: string[] =  ["Default", "Move"];

    constructor(private readonly configuration: FigureConfiguration, public readonly direction: number) {

    }

    private getSettypeForPartAndSet(part: FigurePartKeyAbbreviation) {
        return FigureAssets.figuredata!.settypes.find((settype) => settype.type === part);
    }

    private getSetFromSettype(settype: FiguredataData["settypes"][0], setId: string) {
        return settype.sets.find((set) => set.id === setId);
    }

    private getAssetForSetPart(assetId: string, assetType: FigurePartKeyAbbreviation) {
        for(let index = FigureAssets.figuremap!.length - 1; index >= 0; index--) {
            if(FigureAssets.figuremap![index].id.startsWith("hh_human_50")) {
                continue;
            }

            if(FigureAssets.figuremap![index].parts.some((part) => part.id === assetId && part.type === assetType.substring(0, 2))) {
                return FigureAssets.figuremap![index];
            }
        }

        return null;
    }

    public getSpriteFrameFromSequence(frame: number) {
        const frameSequence = 4;
        const frameRepeat = 3;
        const spriteFrame = Math.floor((frame % (frameSequence * frameRepeat)) / frameRepeat);

        return spriteFrame;
    }

    public async render(frame: number) {
        if(this.isRendering) {
            return [];
        }

        this.currentSpriteFrame = this.getSpriteFrameFromSequence(frame);

        const renderName = `${this.getConfigurationAsString()}_${this.direction}_${this.currentSpriteFrame}_${this.actions.join('_')}`;

        if(FigureAssets.figureCollection.has(renderName)) {
            return FigureAssets.figureCollection.get(renderName)!;
        }

        console.log("Rendering new figure");

        this.isRendering = true;

        if(!FigureAssets.figuremap || !FigureAssets.figuredata || !FigureAssets.avataractions) {
            FigureAssets.figuremap = await FigureAssets.getFiguremapData();
            FigureAssets.figuredata = await FigureAssets.getFiguredataData();
            FigureAssets.avataractions = await FigureAssets.getAvataractionsData();
        }

        const avatarActionsData = this.getAvatarActionsData(FigureAssets.avataractions, this.actions);

        const sprites: FigureRendererSprite[] = [];

        if(!this.renderCache) {
            this.renderCache = [];
            
            for(let configurationPart of this.configuration) {
                const settypeData = this.getSettypeForPartAndSet(configurationPart.type);

                if(!settypeData) {
                    continue;
                }

                const setData = this.getSetFromSettype(settypeData, configurationPart.setId);

                if(!setData) {
                    continue;
                }

                for(let setPartData of setData.parts) {
                    if(!setPartData) {
                        continue;
                    }
                    
                    const setPartAssetData = this.getAssetForSetPart(setPartData.id, setPartData.type);

                    if(!setPartAssetData) {
                        continue;
                    }

                    const figureData = await FigureAssets.getFigureData(setPartAssetData.id);

                    this.renderCache.push({ figureData, configurationPart, setPartData, settypeData, setPartAssetData })
                }
            }
        }

        for(let { figureData, configurationPart, setPartData, settypeData, setPartAssetData } of this.renderCache) {
            const asset = this.getAsset(figureData, avatarActionsData, setPartData, this.direction, this.currentSpriteFrame);

            if(!asset) {
                continue;
            }

            const { actualAssetName, assetData, avatarAction } = asset;

            if(FigureAssets.assetSprites.has(actualAssetName)) {
                const result = FigureAssets.assetSprites.get(actualAssetName);

                if(result) {
                    sprites.push(result);
                }

                continue;
            }

            const spriteData = figureData.sprites.find((sprite) => sprite.name === (assetData.source ?? assetData.name));

            if(!spriteData) {
                FigureAssets.assetSprites.set(actualAssetName, null);

                continue;
            }

            const palette = FigureAssets.figuredata.palettes.find((palette) => palette.id === settypeData.paletteId);
            const paletteColor = palette?.colors.find((color) => color.id === configurationPart.colorIndex);

            const sprite = await FigureAssets.getFigureSprite(setPartAssetData.id, {
                x: spriteData.x,
                y: spriteData.y,

                width: spriteData.width,
                height: spriteData.height,

                flipHorizontal: (this.direction > 3 && this.direction < 7)?(!Boolean(assetData.flipHorizontal)):(assetData.flipHorizontal),

                color: (setPartData.colorable && configurationPart.colorIndex)?(paletteColor?.color):(undefined)
            });

            const priorityDirection = (this.direction > 3 && this.direction < 7)?(6 - this.direction):(this.direction);

            const partPriority = figureRenderPriority[this.getFigureRenderPriority(avatarAction.assetPartDefinition)][priorityDirection.toString()].indexOf(setPartData.type);

            if(partPriority === -1) {
                continue;
            }

            let x = assetData.x;

            if((this.direction > 3 && this.direction < 7)) {
                x = 64 + (assetData.x * -1) - spriteData.width;
            }

            const result: FigureRendererSprite = {
                image: sprite.image,
                imageData: sprite.imageData,
                
                x: x - 32,
                y: assetData.y + 32,

                index: partPriority + setPartData.index,
            };

            FigureAssets.assetSprites.set(actualAssetName, result);

            sprites.push(result);
        }

        FigureAssets.figureCollection.set(renderName, sprites);

        this.isRendering = false;

        return sprites;
    }

    private getAsset(figureData: FigureData, avatarActions: AvatarActionsData, setPartData: FiguredataData["settypes"][0]["sets"][0]["parts"][0], direction: number, spriteFrame: number) {
        for(const avatarAction of avatarActions) {
            let actualAssetName: string | undefined = undefined;
            let assetName: string;
            let assetData: FigureData["assets"][0] | undefined;

            let spriteData;

            if(direction > 3 && direction < 7) {
                actualAssetName = `h_${avatarAction.assetPartDefinition}_${setPartData.type}_${setPartData.id}_${direction}_${spriteFrame}`;
                assetName = `h_${avatarAction.assetPartDefinition}_${setPartData.type}_${setPartData.id}_${6 - direction}_${spriteFrame}`;
                assetData = figureData.assets.find((asset) => asset.name === assetName);
            
                console.log(assetName);

                spriteData = figureData.sprites.find((sprite) => sprite.name === (assetData?.source ?? assetData?.name ?? assetName));

                if(!spriteData) {
                    actualAssetName = `h_${avatarAction.assetPartDefinition}_${setPartData.type}_${setPartData.id}_${direction}_0`;
                    assetName = `h_${avatarAction.assetPartDefinition}_${setPartData.type}_${setPartData.id}_${6 - direction}_0`;
                    assetData = figureData.assets.find((asset) => asset.name === assetName);
                    
                    spriteData = figureData.sprites.find((sprite) => sprite.name === (assetData?.source ?? assetData?.name ?? assetName));
                }
            }
            else {
                assetName = `h_${avatarAction.assetPartDefinition}_${setPartData.type}_${setPartData.id}_${direction}_${spriteFrame}`;
                assetData = figureData.assets.find((asset) => asset.name === assetName);

                console.log("Original: " + assetName);

                spriteData = figureData.sprites.find((sprite) => sprite.name === (assetData?.source ?? assetData?.name ?? assetName));

                if(!spriteData) {
                    assetName = `h_${avatarAction.assetPartDefinition}_${setPartData.type}_${setPartData.id}_${direction}_0`;
                    assetData = figureData.assets.find((asset) => asset.name === assetName);
                
                    spriteData = figureData.sprites.find((sprite) => sprite.name === (assetData?.source ?? assetData?.name ?? assetName));
                }
            }

            if(!assetData) {
                continue;
            }

            console.log("Checking: " + (actualAssetName ?? assetData.name));

            if(!spriteData) {
                continue;
            }

            console.log("Found: " + assetData.name);

            return {
                actualAssetName: actualAssetName ?? assetData.name,
                assetData,
                figureData,
                avatarAction
            };
        }
        
        console.log("Can't find asset and sprite for " + setPartData.type + " " + setPartData.id + " for direction " + direction + ", frame " + spriteFrame);

        return null;
    }

    private getAvatarActionsData(avataractions: AvatarActionsData, avatarActions: string[]) {
        let avatarActionsData = avataractions.filter((action) => avatarActions.includes(action.id)).sort((a, b) => a.precedence - b.precedence);
        
        avatarActionsData = avatarActionsData.filter((action) => {
            return !avatarActionsData.some((secondAction) => secondAction.precedence > action.precedence && secondAction.prevents?.includes(action.id))
        });

        return avatarActionsData;
    }

    public async renderToCanvas(frame: number) {
        const renderName = `${this.getConfigurationAsString()}_${this.direction}_${this.getSpriteFrameFromSequence(frame)}_${this.actions.join('_')}`;

        if(FigureAssets.figureImage.has(renderName)) {
            return FigureAssets.figureImage.get(renderName)!;
        }
        
        const sprites = await this.render(frame);

        const canvas = new OffscreenCanvas(256, 256);

        if(!sprites.length) {
            return {
                image: canvas,
                imageData: new ImageData(256, 256),
                x: -128,
                y: -128,
                index: 0
            } satisfies FigureRendererSprite;
        }

        const context = canvas.getContext("2d");

        if(!context) {
            throw new ContextNotAvailableError();
        }

        sprites.sort((a, b) => a.index - b.index);

        context.translate(128, 128);

        for(let sprite of sprites) {
            context.drawImage(sprite.image, sprite.x, sprite.y);
        }

        const result: FigureRendererSprite = {
            image: canvas,
            imageData: context.getImageData(0, 0, canvas.width, canvas.height),

            x: -128,
            y: -128,

            index: 0
        };
        
        FigureAssets.figureImage.set(renderName, result);

        return result;
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

    public getConfigurationAsString(): string {
        return this.configuration.map((section) => [section.type, section.setId, section.colorIndex].filter(Boolean).join('-')).join('.');
    }

    private getFigureRenderPriority(action: string) {
        switch(action) {
            default:
                return "std";
        }
    }
}
