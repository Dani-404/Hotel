import IncomingEvent from "../../../Interfaces/IncomingEvent.js";
import User from "../../../../Users/User.js";
import RoomFurniture from "../../../../Rooms/Furniture/RoomFurniture.js";
import OutgoingEvent from "../../../../Events/Interfaces/OutgoingEvent.js";
import { RoomMoodlightData } from "@shared/Interfaces/Room/RoomMoodlightData.js";
import { SetFurnitureDataEventData } from "@shared/Communications/Requests/Rooms/Furniture/SetFurnitureDataEventData.js";
import { RoomFurnitureEventData } from "@shared/Communications/Responses/Rooms/Furniture/RoomFurnitureEventData.js";
import { RoomFurnitureBackgroundData } from "@shared/Interfaces/Room/Furniture/RoomFurnitureBackgroundData.js";

export default class SetFurnitureDataEvent implements IncomingEvent<SetFurnitureDataEventData<unknown>> {
    public readonly name = "SetFurnitureDataEvent";

    async handle(user: User, event: SetFurnitureDataEventData<unknown>) {
        if(!user.room) {
            return;
        }

        const roomUser = user.room.getRoomUser(user);

        if(!roomUser.hasRights()) {
            throw new Error("User does not have rights.");
        }

        const furniture = user.room.furnitures.find((furniture) => furniture.model.id === event.furnitureId);

        if(!furniture) {
            throw new Error("Furniture does not exist in room.");
        }

        if(this.furnitureIsDimmer(furniture, event.data)) {
            const activeFurniture = user.room.getActiveMoodlightFurniture();

            if(activeFurniture && activeFurniture.model.id !== furniture.model.id) {
                activeFurniture.model.animation = 0;

                if(activeFurniture.model.changed()) {
                    activeFurniture.model.data = {
                        ...activeFurniture.getData<RoomMoodlightData>(),
                        enabled: false
                    };
                    
                    await activeFurniture.model.save();
        
                    user.room.sendRoomEvent(new OutgoingEvent<RoomFurnitureEventData>("RoomFurnitureEvent", {
                        furnitureUpdated: [
                            activeFurniture.getFurnitureData()
                        ]
                    }));
                }
            }

            furniture.model.data = {
                enabled: event.data.enabled,
                backgroundOnly: event.data.backgroundOnly,
                color: event.data.color,
                alpha: event.data.alpha
            } satisfies RoomMoodlightData;

            furniture.model.animation = (event.data.enabled)?(1):(0);

            await furniture.model.save();

            user.room.sendRoomEvent(new OutgoingEvent<RoomFurnitureEventData>("RoomFurnitureEvent", {
                furnitureUpdated: [
                    furniture.getFurnitureData()
                ]
            }));
        }
        else if(this.isFurnitureBackgroundType(furniture, event.data)) {
            furniture.model.data = {
                imageUrl: event.data.imageUrl,
                position: {
                    x: event.data.position.x,
                    y: event.data.position.y,
                    z: event.data.position.z,
                }
            } satisfies RoomFurnitureBackgroundData;

            await furniture.model.save();

            user.room.sendRoomEvent(new OutgoingEvent<RoomFurnitureEventData>("RoomFurnitureEvent", {
                furnitureUpdated: [
                    furniture.getFurnitureData()
                ]
            }));
        }
    }

    private furnitureIsDimmer(furniture: RoomFurniture, data: unknown): data is RoomMoodlightData {
        return furniture.model.furniture.interactionType === "dimmer";
    }

    private isFurnitureBackgroundType(furniture: RoomFurniture, data: unknown): data is RoomFurnitureBackgroundData {
        return furniture.model.furniture.interactionType === "ads_bg";
    }
}
