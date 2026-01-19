import { GetNavigatorRoomsEventData } from "@shared/Communications/Requests/Navigator/GetNavigatorRoomsEventData.js";
import User from "../../../Users/User.js";
import IncomingEvent from "../../Interfaces/IncomingEvent.js";
import OutgoingEvent from "../../../Events/Interfaces/OutgoingEvent.js";
import { NavigatorRoomsEventData } from "@shared/Communications/Responses/Navigator/NavigatorRoomsEventData.js";
import { RoomModel } from "../../../Database/Models/Rooms/RoomModel.js";
import { game } from "../../../index.js";

export default class GetNavigatorRoomsEvent implements IncomingEvent<GetNavigatorRoomsEventData> {
    async handle(user: User, event: GetNavigatorRoomsEventData): Promise<void> {
        if(event.category !== "all") {
            return;
        }

        const roomModels = await RoomModel.findAll();

        user.send(new OutgoingEvent<NavigatorRoomsEventData>("NavigatorRoomsEvent",
            roomModels.map((roomModel) => {
                const room = game.roomManager.getRoomInstance(roomModel.id);

                return {
                    id: roomModel.id,
                    name: roomModel.name,

                    users: room?.users.length ?? 0,
                    maxUsers: roomModel.maxUsers
                };
            }).sort((a, b) => b.users - a.users)
        ));
    }
}