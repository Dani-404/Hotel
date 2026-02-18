import RoomUser from "../../Rooms/Users/RoomUser";
import IncomingCommandHandler from "../Interfaces/IncomingCommandHandler";

export default class CarryCommand implements IncomingCommandHandler {
    public readonly command = "carry";

    async handle(roomUser: RoomUser, inputs: string[]): Promise<void> {
        const id = inputs[0];

        if(!id) {
            throw new Error("Missing carry id parameter.");
        }

        roomUser.removeAction("CarryItem");
        
        roomUser.addAction("CarryItem." + parseInt(id));
    }
}
