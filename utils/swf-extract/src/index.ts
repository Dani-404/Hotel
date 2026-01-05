import { copyFileSync, existsSync, mkdirSync, rmdirSync, rmSync, writeFileSync } from "fs";
import { createSpritesheet } from "./spritesheet/SpritesheetCreation.ts";
import { extractSwf } from "./swf/SwfExtraction.ts";
import path from "path";
import { createAssetsData, createIndexData, createLogicData, createRoomVisualizationData, createVisualizationData } from "./data/DataCreation.ts";
import type { FurnitureData } from "../../../src/client/Interfaces/Furniture/FurnitureData.ts"
import type { RoomData } from "../../../src/client/Interfaces/Room/RoomData.ts"

const assetName = process.argv[2];
const extractOnly = process.argv[3] === "extract-only";

if(!assetName) {
    throw new Error("Argument is missing for asset name.");
}

if(existsSync(path.join("temp", assetName))) {
    rmSync(path.join("temp", assetName), {
        force: true,
        recursive: true
    });
}

(async () => {
    const swfCollection = await extractSwf(assetName, `assets/${assetName}/${assetName}.swf`);

    if(extractOnly) {
        return;
    }

    const spritesheet = await createSpritesheet(assetName, swfCollection.images);

    const outputPath = path.join("..", "..", "assets", (assetName === "HabboRoomContent")?("room"):("furniture"), assetName);

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
    
    if(assetName === "HabboRoomContent") {
        const assets = createAssetsData(swfCollection);
        const index = createIndexData(swfCollection);
        const visualization = createRoomVisualizationData(swfCollection);

        const data: RoomData = {
            index,
            visualization,
            assets,
            sprites: spritesheet
        };

        writeFileSync(path.join(outputPath, `${assetName}.json`), JSON.stringify(data, undefined, 2), {
            encoding: "utf-8"
        });
    }
    else {
        const assets = createAssetsData(swfCollection);
        const logic = createLogicData(swfCollection);
        const visualization = createVisualizationData(swfCollection);
        const index = createIndexData(swfCollection);

        const data: FurnitureData = {
            index,
            visualization,
            logic,
            assets,
            sprites: spritesheet
        };

        writeFileSync(path.join(outputPath, `${assetName}.json`), JSON.stringify(data, undefined, 2), {
            encoding: "utf-8"
        });
    }
})();
