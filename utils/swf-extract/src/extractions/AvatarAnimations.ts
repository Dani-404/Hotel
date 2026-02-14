import { XMLParser } from "fast-xml-parser";
import { extractSwf } from "../swf/SwfExtraction.ts";
import path from "node:path";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import type { FigureAvatarAnimationData } from "../../../../packages/game/src/Client/Interfaces/Figure/FigureAvatarAnimationData.ts";
import { getValueAsArray } from "../data/DataCreation.ts";

export default async function extractAvatarAnimations() {
    const collection = await extractSwf("Habbo", path.join("assets", "Habbo", "Habbo.swf"));

    const animationFile = collection.extra.find((path) => path.endsWith("avatar_animation_xml.xml"));

    if(!animationFile) {
        throw new Error("Avatar animation manifest was not found.");
    }

    const animationData = getAnimationData(animationFile);

    const outputPath = path.join("..", "..", "assets", "figure");

    mkdirSync(outputPath, {
        recursive: true
    });
            
    writeFileSync(path.join(outputPath, `AvatarAnimations.json`), JSON.stringify(animationData, undefined, 2), {
        encoding: "utf-8"
    });
}

function getAnimationData(filePath: string) {
    const parser = new XMLParser({
        ignoreAttributes: false
    });

    const document = parser.parse(readFileSync(filePath, { encoding: "utf-8" }), true);

    return {
        actions: getValueAsArray(document.animationSet.action).map((action: any) => {
            return {
                id: action["@_id"],
                parts: getValueAsArray(action["part"]).map((part: any) => {
                    return {
                        setType: part["@_set-type"],
                        frames: getValueAsArray(part["frame"]).map((frame: any) => {
                            return {
                                number: parseInt(frame["@_number"]),
                                assetPartDefinition: frame["@_assetpartdefinition"],
                                repeats: (frame["@_repeats"])?(parseInt(frame["@_repeats"])):(undefined)
                            } satisfies FigureAvatarAnimationData["actions"][0]["parts"][0]["frames"][0];
                        })
                    } satisfies FigureAvatarAnimationData["actions"][0]["parts"][0];
                }),
                offsets: getValueAsArray(action["offsets"]?.["frame"]).map((frame: any) => {
                    return {
                        frame: parseInt(frame["@_id"]),
                        directions: getValueAsArray(frame["directions"]["direction"]).map((direction: any) => {
                            return {
                                id: parseInt(direction["@_id"]),
                                bodypart: {
                                    id: direction["bodypart"]["@_id"],
                                    destinationX: (direction["bodypart"]["@_dx"])?(parseInt(direction["bodypart"]["@_dx"])):(undefined),
                                    destinationY: (direction["bodypart"]["@_dy"])?(parseInt(direction["bodypart"]["@_dy"])):(undefined),
                                }
                            } satisfies FigureAvatarAnimationData["actions"][0]["offsets"][0]["directions"][0];
                        })
                    } satisfies FigureAvatarAnimationData["actions"][0]["offsets"][0];
                })
            } satisfies FigureAvatarAnimationData["actions"][0]
        })
    } satisfies FigureAvatarAnimationData;
}
