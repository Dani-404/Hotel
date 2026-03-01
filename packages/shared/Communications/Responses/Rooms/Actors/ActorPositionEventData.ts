import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";
import { ActorIdentifierEventData } from "./ActorIdentifierEventData.js";

export type ActorPositionEventData = ActorIdentifierEventData & {
    position: RoomPosition;
    direction?: number | undefined;
    usePath?: boolean;
};
