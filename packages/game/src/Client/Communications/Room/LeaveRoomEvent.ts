import ProtobuffListener from "@Client/Communications/ProtobuffListener";
import { LeaveRoomData } from "@pixel63/events";
import { clientInstance } from "../../..";

export default class LeaveRoomEvent implements ProtobuffListener<LeaveRoomData> {
    async handle(): Promise<void> {
        if(!clientInstance.roomInstance.value) {
            return;
        }

        clientInstance.roomInstance.value.terminate();
    }
}
