import RoomUser from "../../Rooms/Users/RoomUser";
import IncomingCommandHandler from "../Interfaces/IncomingCommandHandler";

export default class SpeedCommand implements IncomingCommandHandler {
    public readonly command = "speed";

    async handle(roomUser: RoomUser, inputs: string[]): Promise<void> {
        if(!roomUser.hasRights()) {
            roomUser.sendRoomMessage(inputs.join());
            
            return;
        }

        const scaleInput = inputs[0];

        if(!scaleInput) {
            roomUser.sendRoomMessage(inputs.join());

            return;
        }

        const scale = Math.max(0, Math.min(2, parseFloat(scaleInput)));

        roomUser.room.model.speed = scale;

        if(roomUser.room.model.changed()) {
            await roomUser.room.model.save();
        }
    }
}
