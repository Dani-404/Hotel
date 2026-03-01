import { RoomPosition } from "../../../../Interfaces/Room/RoomPosition.js";

export type RoomBotPositionEventData = {
    botId: string;
    position: RoomPosition;
    direction?: number | undefined;
    usePath?: boolean;
};
