import { RoomPosition } from "@shared/Interfaces/Room/RoomPosition.js";
import User from "../../Users/User.js";
import Room from "../Room.js";
import OutgoingEvent from "../../Events/Interfaces/OutgoingEvent.js";
import { UserLeftRoom } from "@shared/WebSocket/Events/Rooms/Users/UserLeftRoom.js";
import { StartWalking } from "@shared/WebSocket/Events/Rooms/Users/StartWalking.js";
import { AStarFinder } from "astar-typescript";
import { PlaceFurnitureInRoom } from "@shared/WebSocket/Events/Rooms/Furniture/PlaceFurnitureInRoom.js";
import { UserEnteredRoom } from "@shared/WebSocket/Events/Rooms/Users/UserEnteredRoom.js";
import { RoomUserData } from "@shared/Interfaces/Room/RoomUserData.js";
import { UserWalkTo } from "@shared/WebSocket/Events/Rooms/Users/UserWalkTo.js";
import { LoadRoomEventData } from "@shared/Communications/Rooms/Responses/LoadRoomEventData.js";

export default class RoomUser {
    public position: RoomPosition;
    public direction: number;

    public path?: Omit<RoomPosition, "depth">[];

    constructor(private readonly room: Room, public readonly user: User) {
        this.position = {
            row: room.model.structure.door?.row ?? 0,
            column: room.model.structure.door?.column ?? 0,
            depth: parseInt(room.model.structure.grid[room.model.structure.door?.row ?? 0]?.[room.model.structure.door?.column ?? 0]!)
        };

        this.direction = 2;

        this.addEventListeners();

        const userEnteredRoomEvent = new OutgoingEvent<UserEnteredRoom>("UserEnteredRoom", this.getRoomUserData());
        
        this.room.sendRoomEvent(userEnteredRoomEvent);
        
        this.user.send([
            new OutgoingEvent<LoadRoomEventData>("LoadRoomEvent", {
                structure: this.room.model.structure,
                users: this.room.users.map((user) => user.getRoomUserData()),
                furnitures: this.room.furnitures.map((furniture) => furniture.getFurnitureData())
            }),
            userEnteredRoomEvent
        ]);
    }
    
    private getRoomUserData(): RoomUserData {
        return {
            id: this.user.model.id,
            name: this.user.model.name,
            figureConfiguration: this.user.model.figureConfiguration,

            position: this.position,
            direction: this.direction
        };
    }

    private addEventListeners() {
        this.user.addListener("close", this.disconnectListener);
        this.user.addListener<StartWalking>("StartWalking", this.startWalkingListener);
        this.user.addListener<PlaceFurnitureInRoom>("PlaceFurnitureInRoom", this.placeFurnitureListener);
    }

    private removeEventListeners() {
        this.user.removeListener("close", this.disconnectListener);
        this.user.removeListener("StartWalking", this.startWalkingListener);
        this.user.removeListener("PlaceFurnitureInRoom", this.placeFurnitureListener);
    }

    private readonly startWalkingListener = this.startWalking.bind(this);
    private startWalking(client: User, event: StartWalking) {
        console.log(client.model.name + ": start walking from " + JSON.stringify(this.position));
        console.log(client.model.name + ": start walking to " + JSON.stringify(event.target));

        const rows = this.room.model.structure.grid.map((row, rowIndex) => {
            return row.split('').map((column, columnIndex) => {
                if(column === 'X') {
                    return 1;
                }

                const furniture = this.room.getUpmostFurnitureAtPosition({ row: rowIndex, column: columnIndex });

                if(furniture) {
                    if(!furniture.model.furniture.flags.walkable) {
                        return 1;
                    }
                }

                return 0;
            });
        });

        const columns = rows[0]!.map((_, colIndex) => rows.map(row => row[colIndex]!));

        const astarFinder = new AStarFinder({
            grid: {
                matrix: columns
            }
        });

        const result = astarFinder.findPath({
            x: this.position.row,
            y: this.position.column,
        }, {
            x: event.target.row,
            y: event.target.column,
        });

        const path = result.map((position) => {
            return {
                row: position[0]!,
                column: position[1]!
            }
        });

        path.splice(0, 1);

        this.path = path;

        console.log("Result: " + JSON.stringify(path));

        this.room.requestActionsFrame();
    }

    public handleActionsInterval() {
        const nextPosition = this.path?.[0];

        if(!nextPosition) {
            return [];
        }

        const furniture = this.room.getUpmostFurnitureAtPosition(nextPosition);

        if(furniture) {
            if(!furniture.model.furniture.flags.walkable) {
                this.path = [];

                return [];
            }
        }

        const depth = this.room.getUpmostDepthAtPosition(nextPosition, furniture);

        const position = {
            row: nextPosition.row,
            column: nextPosition.column,
            depth
        };

        const outgoingEvents: OutgoingEvent[] = [];

        outgoingEvents.push(new OutgoingEvent<UserWalkTo>("UserWalkTo", {
            userId: this.user.model.id,
            from: this.position,
            to: position
        }));

        this.position = position;
        this.path!.splice(0, 1);

        return outgoingEvents;
    }

    private readonly placeFurnitureListener = this.placeFurniture.bind(this);
    private async placeFurniture(client: User, event: PlaceFurnitureInRoom) {
        const inventory = client.getInventory();

        const userFurniture = await inventory.getFurnitureById(event.userFurnitureId);

        if(!userFurniture) {
            throw new Error("User does not have a user furniture by this id.");
        }

        inventory.setFurnitureQuantity(userFurniture, userFurniture.quantity - 1);

        this.room.addFurniture(userFurniture.furniture, event.position, event.direction);
    }

    private readonly disconnectListener = this.disconnect.bind(this);
    private disconnect() {
        this.removeEventListeners();
        
        this.room.users.splice(this.room.users.indexOf(this), 1);

        this.room.sendRoomEvent(new OutgoingEvent<UserLeftRoom>("UserLeftRoom", {
            userId: this.user.model.id
        }));
    }
}
