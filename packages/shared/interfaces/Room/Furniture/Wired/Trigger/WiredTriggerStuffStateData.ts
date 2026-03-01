import { WiredFurnitureSelectionData } from "../WiredFurnitureSelectionData.js";

export type WiredTriggerStuffStateData = WiredFurnitureSelectionData & {
    trigger: "state" | "all";
    
    furnitureTriggerStates: number[];
};
