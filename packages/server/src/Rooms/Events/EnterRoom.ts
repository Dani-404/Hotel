import UserClient from "../../Clients/UserClient.js";
import { eventHandler } from "../../Events/EventHandler.js";
import { EnterRoom } from "@shared/WebSocket/Events/Rooms/EnterRoom.js";
import RoomManager from "../RoomManager.js";

eventHandler.addListener<EnterRoom>("EnterRoom", async (client: UserClient, event) => {
    console.log("Enter room: " + event.roomId);

    const roomInstance = await RoomManager.getOrLoadRoomInstance(event.roomId);

    if(!roomInstance) {
        console.error("Room does not exist.");

        return;
    }

    roomInstance.addUserClient(client);
});
