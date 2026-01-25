import { UserEventData } from "@shared/Communications/Responses/User/UserEventData.js";
import OutgoingEvent from "../../../Events/Interfaces/OutgoingEvent.js";
import User from "../../../Users/User.js";
import IncomingEvent from "../../Interfaces/IncomingEvent.js";
import { SetFigureConfigurationEventData } from "@shared/Communications/Requests/User/SetFigureConfigurationEventData.js";
import { UserFigureConfigurationEventData } from "@shared/Communications/Responses/Rooms/Users/UserFigureConfigurationEventData.js";

export default class SetFigureConfigurationEvent implements IncomingEvent<SetFigureConfigurationEventData> {
    async handle(user: User, event: SetFigureConfigurationEventData) {
        user.model.figureConfiguration = event.figureConfiguration;

        await user.model.save();

        if(user.room) {
            user.room.sendRoomEvent(
                new OutgoingEvent<UserFigureConfigurationEventData>("UserFigureConfigurationEvent", {
                    userId: user.model.id,
                    figureConfiguration: user.model.figureConfiguration
                })
            );
        }

        user.send(new OutgoingEvent<UserEventData>("UserEvent", {
            id: user.model.id,
            name: user.model.name,
            figureConfiguration: user.model.figureConfiguration,
            credits: user.model.credits,
            duckets: user.model.duckets,
            diamonds: user.model.diamonds,
        }));
    }
}
