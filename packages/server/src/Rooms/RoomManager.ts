import { FurnitureModel } from "../Database/Models/Furniture/FurnitureModel.js";
import { RoomModel } from "../Database/Models/Rooms/RoomModel.js";
import { RoomFurnitureModel } from "../Database/Models/Rooms/RoomFurnitureModel.js";
import Room from "./Room.js";
import { UserModel } from "../Database/Models/Users/UserModel.js";

// TODO: do we really need the Room model in the functions or is it sufficient with a roomId?
export default class RoomManager {
    public instances: Room[] = [];

    constructor() {
    }

    public getOrLoadRoomInstance(roomId: string) {
        return this.getRoomInstance(roomId) ?? this.loadRoomInstance(roomId);
    }

    public getRoomInstance(roomId: string) {
        const instance = this.instances.find((instance) => instance.model.id === roomId);

        if(!instance) {
            return null;
        }

        return instance;
    }

    public async loadRoomInstance(roomId: string) {
        const room = await RoomModel.findByPk(roomId, {
            include: {
                model: RoomFurnitureModel,
                as: "roomFurnitures",
                include: [
                    {
                        model: FurnitureModel,
                        as: "furniture"
                    },
                    {
                        model: UserModel,
                        as: "user"
                    }
                ]
            }
        });

        if(!room) {
            return null;
        }

        const instance = new Room(room);

        this.instances.push(instance);

        return instance;
    }
}
