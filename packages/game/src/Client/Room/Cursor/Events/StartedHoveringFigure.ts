import { RoomUserData } from "@Shared/Interfaces/Room/RoomUserData";

export default class StartedHoveringFigure extends Event {
    constructor(public readonly userData: RoomUserData, public readonly position: { left: number, top: number }) {
        super("StartedHoveringFigure");
    }
}
