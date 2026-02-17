import RoomUser from "../../Rooms/Users/RoomUser";
import IncomingCommandHandler from "../Interfaces/IncomingCommandHandler";

export default class EnableCommand implements IncomingCommandHandler {
    public readonly command = "enable";

    async handle(roomUser: RoomUser, inputs: string[]): Promise<void> {
        const id = inputs[0];

        if(!id) {
            throw new Error("Missing enable id parameter.");
        }

        roomUser.removeAction("AvatarEffect");
        
        roomUser.addAction("AvatarEffect." + parseInt(id));
    }
}
