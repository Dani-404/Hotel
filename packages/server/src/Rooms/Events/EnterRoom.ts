import User from "../../Users/User.js";
import { eventHandler } from "../../Events/EventHandler.js";
import { EnterRoom } from "@shared/WebSocket/Events/Rooms/EnterRoom.js";
import RoomManager from "../RoomManager.js";

eventHandler.addListener<EnterRoom>("EnterRoom", async (user: User, event) => {
    console.log("Enter room: " + event.roomId);

    const roomInstance = await RoomManager.getOrLoadRoomInstance(event.roomId);

    if(!roomInstance) {
        console.error("Room does not exist.");

        return;
    }

    roomInstance.addUserClient(user);
});
