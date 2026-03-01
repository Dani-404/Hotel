import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";
import { ActorIdentifierEventData } from "./ActorIdentifierEventData.js";

export type ActorWalkToEventData = ActorIdentifierEventData & {
    from: RoomPosition;
    to: RoomPosition;
};
