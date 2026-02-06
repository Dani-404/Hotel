import IncomingEvent from "../../../Interfaces/IncomingEvent.js";
import User from "../../../../Users/User.js";
import OutgoingEvent from "../../../../Events/Interfaces/OutgoingEvent.js";
import { RoomFurnitureEventData } from "@shared/Communications/Responses/Rooms/Furniture/RoomFurnitureEventData.js";
import { UseRoomFurnitureEventData } from "@shared/Communications/Requests/Rooms/Furniture/UseRoomFurnitureEventData.js";

export default class UseRoomFurnitureEvent implements IncomingEvent<UseRoomFurnitureEventData> {
    async handle(user: User, event: UseRoomFurnitureEventData) {
        if(!user.room) {
            return;
        }

        const roomUser = user.room.getRoomUser(user);
        const roomFurniture = user.room.getRoomFurniture(event.roomFurnitureId);

        switch(roomFurniture.model.furniture.category) {
            case "teleport":
                if(roomFurniture.model.animation !== 0) {
                    return;
                }

                const offsetPosition = roomFurniture.getOffsetPosition(1);

                if(offsetPosition.row !== roomUser.position.row || offsetPosition.column !== roomUser.position.column) {
                    await new Promise<void>((resolve, reject) => {
                        roomUser.walkTo(offsetPosition, undefined, resolve, reject);
                    });

                    console.log("Finished");
                }

                await roomFurniture.setAnimation(1);

                await new Promise<void>((resolve, reject) => {
                    roomUser.walkTo(roomFurniture.model.position, true, resolve, reject);
                });

                await roomFurniture.setAnimation(2);

                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 500);
                });

                await roomFurniture.setAnimation(0);

                const targetFurniture = user.room.furnitures.find((furniture) => furniture.model.id === roomFurniture.model.data);

                if(targetFurniture) {
                    roomUser.setPosition({
                        ...targetFurniture.model.position,
                        depth: targetFurniture.model.position.depth + 0.01
                    });

                    await targetFurniture.setAnimation(1);

                    const targetOffsetPosition = targetFurniture.getOffsetPosition(1);

                    await new Promise<void>((resolve, reject) => {
                        roomUser.walkTo(targetOffsetPosition, undefined, resolve, reject);
                    });

                    await targetFurniture.setAnimation(0);
                }

                break;

            case "gate":
                if(user.room.users.some(({ position }) => roomFurniture.isPositionInside(position))) {
                    break;
                }

                roomFurniture.model.animation = event.animation;

                break;

            case "lighting":
                roomFurniture.model.animation = event.animation;

                break;

            default:
                console.log("Unhandled furniture category for UseRoomFurnitureEvent", roomFurniture.model.furniture.category);
                
                roomFurniture.model.animation = event.animation;
                break;
        }

        if(roomFurniture.model.changed()) {
            await roomFurniture.model.save();

            user.room.sendRoomEvent(new OutgoingEvent<RoomFurnitureEventData>("RoomFurnitureEvent", {
                furnitureUpdated: [
                    roomFurniture.getFurnitureData()
                ]
            }));
        }
    }
}
