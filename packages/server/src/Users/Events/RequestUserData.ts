import User from "../User.js";
import { eventHandler } from "../../Events/EventHandler.js";
import OutgoingEvent from "../../Events/Interfaces/OutgoingEvent.js";
import { UserDataUpdated } from "@shared/WebSocket/Events/User/UserDataUpdated.js";

eventHandler.addListener("RequestUserData", async (client: User) => {
    client.send(new OutgoingEvent<UserDataUpdated>("UserDataUpdated", {
        id: client.model.id,
        name: client.model.name,
        figureConfiguration: client.model.figureConfiguration
    }));
});
