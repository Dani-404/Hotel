import RoomUser from "../../Rooms/Users/RoomUser";
import IncomingCommandHandler from "../Interfaces/IncomingCommandHandler";

export default class WaveCommand implements IncomingCommandHandler {
    public readonly command = "wave";

    async handle(roomUser: RoomUser, inputs: string[]): Promise<void> {
        roomUser.addAction("Wave");        
    }
}
