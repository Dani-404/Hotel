import { ActorIdentifierEventData } from "./ActorIdentifierEventData.js";

export type ActorActionEventData = ActorIdentifierEventData & {
    actionsAdded?: string[];
    actionsRemoved?: string[];
};
