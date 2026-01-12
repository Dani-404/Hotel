import { RoomPosition } from "@shared/Interfaces/Room/RoomPosition";
import UserClient from "../../Clients/UserClient";
import RoomInstance from "../RoomInstance";

export default class RoomUserClient {
    public position: RoomPosition;
    public direction: number;

    public path?: Omit<RoomPosition, "depth">[];

    constructor(private readonly roomInstance: RoomInstance, public readonly userClient: UserClient) {
        this.position = {
            row: roomInstance.room.structure.door.row,
            column: roomInstance.room.structure.door.column,
            depth: parseInt(roomInstance.room.structure.grid[roomInstance.room.structure.door.row]?.[roomInstance.room.structure.door.column]!)
        };

        this.direction = 2;
    }
}
