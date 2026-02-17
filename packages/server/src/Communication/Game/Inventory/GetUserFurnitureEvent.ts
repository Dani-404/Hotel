import User from "../../../Users/User.js";
import IncomingEvent from "../../Interfaces/IncomingEvent.js";

export default class GetUserFurnitureEvent implements IncomingEvent {
    public readonly name = "GetUserFurnitureEvent";

    async handle(user: User, event: null): Promise<void> {
        await user.getInventory().sendFurniture();
    }
}
