import User from "../../../../Users/User.js";
import IncomingEvent from "../../../Interfaces/IncomingEvent.js";
import { UpdateRoomFloorplanEventData } from "@shared/Communications/Requests/Rooms/Floorplan/UpdateRoomFloorplanEventData.js";

export default class UpdateRoomFloorplanEvent implements IncomingEvent<UpdateRoomFloorplanEventData> {
    public readonly name = "UpdateRoomFloorplanEvent";

    async handle(user: User, event: UpdateRoomFloorplanEventData) {
        if(!user.room) {
            throw new Error("User is not in a room.");
        }

        const roomUser = user.room.getRoomUser(user);

        if(!roomUser.hasRights()) {
            throw new Error("User does not have room rights.");
        }

        const structure = user.room.getStructure();

        structure.grid = event.grid;
        structure.door = event.door;

        structure.floor.thickness = event.floorThickness;
        
        structure.wall.thickness = event.wallThickness;
        structure.wall.height = event.wallHeight;
        structure.wall.hidden = event.wallHidden;

        if(event.offsets.row > 0 || event.offsets.column > 0) {
            for(const furniture of user.room.furnitures) {
                furniture.setPosition({
                    row: furniture.model.position.row + event.offsets.row,
                    column: furniture.model.position.column + event.offsets.column,
                    depth: furniture.model.position.depth
                });
            }
            
            for(const roomUser of user.room.users) {
                roomUser.setPosition({
                    row: roomUser.position.row + event.offsets.row,
                    column: roomUser.position.column + event.offsets.column,
                    depth: roomUser.position.depth
                });
            }
        }
        
        await user.room.setStructure(structure);
    }
}
