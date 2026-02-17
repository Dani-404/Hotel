import User from "../../../Users/User.js";
import IncomingEvent from "../../Interfaces/IncomingEvent.js";
import OutgoingEvent from "../../../Events/Interfaces/OutgoingEvent.js";
import { RoomCategoriesEventData } from "@shared/Communications/Responses/Navigator/RoomCategoriesEventData.js";
import { game } from "../../../index.js";

export default class GetRoomCategoriesEvent implements IncomingEvent {
    public readonly name = "GetRoomCategoriesEvent";

    async handle(user: User): Promise<void> {
        const permissions = await user.getPermissions();

        user.send(new OutgoingEvent<RoomCategoriesEventData>("RoomCategoriesEvent", 
            game.roomNavigatorManager.categories.filter((category) => !category.developer || (category.developer && permissions.hasPermission("room:type"))).map((category) => {
                return {
                    id: category.id,
                    title: category.title
                };
            })
        ));
    }
}
