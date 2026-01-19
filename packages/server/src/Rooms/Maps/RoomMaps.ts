import { RoomCreatedRequest } from "@shared/WebSocket/Events/Rooms/Maps/RoomCreatedRequest.js";
import { RoomMapModel } from "../../Database/Models/Rooms/Maps/RoomMapModel.js";
import { eventHandler } from "../../Events/EventHandler.js";
import OutgoingEvent from "../../Events/Interfaces/OutgoingEvent.js";
import User from "../../Users/User.js";
import { RoomMapsResponse } from "@shared/WebSocket/Events/Rooms/Maps/RoomMapsResponse.js";
import { RoomModel } from "../../Database/Models/Rooms/RoomModel.js";
import { randomUUID } from "crypto";
import { RoomCreatedResponse } from "@shared/WebSocket/Events/Rooms/Maps/RoomCreatedResponse.js";

export default class RoomMaps {
    private models?: RoomMapModel[];

    private async getModels() {
        if(!this.models) {
            this.models = await RoomMapModel.findAll(); 
        }

        return this.models;
    }

    constructor() {
        eventHandler.addListener("RoomMapsRequest", this.onRoomMapsRequest.bind(this));
        eventHandler.addListener("RoomCreatedRequest", this.onRoomCreatedRequest.bind(this));
    }

    private async onRoomMapsRequest(user: User) {
        const models = await this.getModels();

        user.send(
            new OutgoingEvent<RoomMapsResponse>("RoomMapsResponse", models.map((model) => model.toJSON()))
        );
    }

    private async onRoomCreatedRequest(user: User, event: RoomCreatedRequest) {
        const models = await this.getModels();

        const model = models.find((model) => model.id === event.mapId);

        if(!model) {
            throw new Error("Room map model by id does not exist.");
        }

        const room = await RoomModel.create({
            id: randomUUID(),
            name: event.name,

            structure: {
                door: model.door,
                grid: model.grid,
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
