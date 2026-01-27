import { XMLParser } from "fast-xml-parser";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { extractSwf } from "../swf/SwfExtraction.ts";
import path from "node:path";
import type { FigureAnimationData } from "../../../../packages/game/src/Client/Interfaces/Figure/FigureAnimationData.ts";
import { createSpritesheet } from "../spritesheet/SpritesheetCreation.ts";
import type { FigureData } from "../../../../packages/game/src/Client/Interfaces/Figure/FigureData.ts";
import { createAssetsDataFromManifest, getValueAsArray } from "../data/DataCreation.ts";

export default async function extractFigureEffects() {
    const effectMaps = [1, 2, 3, 4, 5, 102, 175].map((id) => getEffectMap(id.toString()));

    for(let effectMap of effectMaps) {
        const assetName = effectMap["@_lib"];

        const collection = await extractSwf(assetName, path.join("assets", "effects", assetName + ".swf"));

        const animationFile = collection.extra.find((path) => path.endsWith("animation.xml"));

        let animationData: FigureAnimationData | undefined;

        if(animationFile) {
            animationData = getAnimationData(animationFile);
        }
        
        const spritesheet = await createSpritesheet(assetName, collection.images);

        const assets = createAssetsDataFromManifest(collection);

        const data: FigureData = {
            assets,
            sprites: spritesheet,
            animation: animationData
        };

        const outputPath = path.join("..", "..", "assets", "figure", "effects", assetName);

        if(existsSync(outputPath)) {
            rmSync(outputPath, {
                force: true,
                recursive: true
            });
        }

        mkdirSync(outputPath, {
            recursive: true
        });
        
        copyFileSync(path.join("temp", assetName, "spritesheets", `${assetName}.png`), path.join(outputPath, `${assetName}.png`));
        
        writeFileSync(path.join(outputPath, `${assetName}.json`), JSON.stringify(data, undefined, 2), {
            encoding: "utf-8"
        });
    }

    const data = effectMaps.map((effectMap) => {
        return {
            id: parseInt(effectMap["@_id"]),
            library: effectMap["@_lib"]
        };
    });

    writeFileSync(path.join("..", "..", "assets", "figure", "effectmap.json"), JSON.stringify(data, undefined, 2), {
        encoding: "utf-8"
    });
}

function getEffectMap(id: string) {
    const parser = new XMLParser({
        ignoreAttributes: false
    });

    const document = parser.parse(readFileSync("effectmap.xml", { encoding: "utf-8" }), true);

    return document.map.effect.find((effect: any) => effect["@_id"] === id);
}

function getAnimationData(filePath: string) {
    const parser = new XMLParser({
        ignoreAttributes: false
    });

    const document = parser.parse(readFileSync(filePath, { encoding: "utf-8" }), true);

    return {
        sprites: getValueAsArray(document.animation.sprite).map((sprite: any) => {
            return {
                id: sprite["@_id"],
                member: sprite["@_member"],
                directions: sprite["direction"]?.map((direction: any) => {
                    return {
                        id: parseInt(direction["@_id"]),
                        destinationZ: parseInt(direction["@_dz"])
                    }
                })
            }
        }),

        frames: getValueAsArray(document.animation.frame).map((frame: any) => {
            return {
                bodyParts: getValueAsArray(frame.bodypart).map((bodypart: any) => {
                    return {
                        id: bodypart["@_id"],
                        action: bodypart["@_action"],
                        frame: parseInt(bodypart["@_frame"]),
                        destinationY: (bodypart["@_dy"])?(parseInt(bodypart["@_dy"])):(undefined)
                    };
                }),

                effects: getValueAsArray(frame.fx).map((fx: any) => {
                    return {
                        id: fx["@_id"],
                        action: fx["@_action"],
                        frame: parseInt(fx["@_frame"]),
                        destinationY: (fx["@_dy"])?(parseInt(fx["@_dy"])):(undefined)
                    };
                })
            };
        })
    } satisfies FigureAnimationData;
}
