import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";

export type RoomBotWalkToEventData = {
    botId: string;
    from: RoomPosition;
    to: RoomPosition;
};
