import { RoomPosition } from "@shared/Interfaces/Room/RoomPosition";
import Room from "../Room";
import RoomFurniture from "../Furniture/RoomFurniture";

export default interface RoomActor {
    room: Room;

    position: RoomPosition;
    direction: number;

    lastActivity: number;

    sendPositionEvent(usePath: boolean): void;
    sendWalkEvent(previousPosition: RoomPosition): void;
    
    hasAction(actionId: string): boolean;
    addAction(actionId: string): void;
    removeAction(actionId: string): void;

    walkOn?(roomFurniture: RoomFurniture): Promise<void>;
}

