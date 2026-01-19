import { RoomCreatedRequest } from "@shared/WebSocket/Events/Rooms/Maps/RoomCreatedRequest.js";
import { RoomMapModel } from "../../Database/Models/Rooms/Maps/RoomMapModel.js";
import { eventHandler } from "../../Events/EventHandler.js";
import OutgoingEvent from "../../Events/Interfaces/OutgoingEvent.js";
import User from "../../Users/User.js";
import { RoomMapsResponse } from "@shared/WebSocket/Events/Rooms/Maps/RoomMapsResponse.js";
import { RoomModel } from "../../Database/Models/Rooms/RoomModel.js";
import { randomUUID } from "crypto";
import { RoomCreatedResponse } from "@shared/WebSocket/Events/Rooms/Maps/RoomCreatedResponse.js";

export default class RoomNavigatorManager {
    private maps: RoomMapModel[] = [];

    constructor() {
        eventHandler.addListener("RoomMapsRequest", this.onRoomMapsRequest.bind(this));
        eventHandler.addListener("RoomCreatedRequest", this.onRoomCreatedRequest.bind(this));
    }

    public async loadModels() {
        this.maps = await RoomMapModel.findAll();
    }

    private async onRoomMapsRequest(user: User) {
        user.send(
            new OutgoingEvent<RoomMapsResponse>("RoomMapsResponse", this.maps.map((map) => map.toJSON()))
        );
    }

    private async onRoomCreatedRequest(user: User, event: RoomCreatedRequest) {
        const map = this.maps.find((map) => map.id === event.mapId);

        if(!map) {
            throw new Error("Room map model by id does not exist.");
        }

        const room = await RoomModel.create({
            id: randomUUID(),
            name: event.name,

            structure: {
                door: map.door,
                grid: map.grid,
                floor: {
                    id: "default",
                    thickness: 8
                },
                wall: {
                    id: "default",
                    thickness: 8
                }
            }
        });

        user.send(
            new OutgoingEvent<RoomCreatedResponse>("RoomCreatedResponse", {
                success: true,
                roomId: room.id
            })
        );
    }
}
