import { RoomType } from "../../../Interfaces/Room/RoomType.js";

export type UpdateRoomInformationEventData = {
    type?: RoomType;
    name?: string;
    description?: string;
    category?: string;
    maxUsers?: number;
    thumbnail?: string;
}
