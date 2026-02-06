import IncomingEvent from "../../../Interfaces/IncomingEvent.js";
import User from "../../../../Users/User.js";
import { StartWalkingEventData } from "@shared/Communications/Requests/Rooms/User/StartWalkingEventData.js";
import { AStarFinder } from "astar-typescript";

export default class StartWalkingEvent implements IncomingEvent<StartWalkingEventData> {
    async handle(user: User, event: StartWalkingEventData) {
        if(!user.room) {
            return;
        }

        const roomUser = user.room.getRoomUser(user);

        roomUser.walkTo(event.target);
    }
}
