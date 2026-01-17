import { FurnitureData } from "../../../Interfaces/Room/RoomFurnitureData.js";
import { RoomPosition } from "../../../Interfaces/Room/RoomPosition.js";

export type PlaceFurnitureInRoomOptions = {
    onPlace: (properties: PlaceFurnitureInRoomProperties, position: RoomPosition) => void;
    onCancel: (properties: PlaceFurnitureInRoomProperties) => void;
}

export type PlaceFurnitureInRoomProperties = {
    terminate: () => void;
};

export default class StartPlacingFurnitureInRoom extends Event {
    constructor(
        public readonly furnitureData: FurnitureData,
        public readonly options: PlaceFurnitureInRoomOptions,
        public readonly resolve: (properties: PlaceFurnitureInRoomProperties) => void
    ) {
        super("StartPlacingFurnitureInRoom");
    }
}
