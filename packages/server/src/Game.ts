import RoomNavigatorManager from "./Rooms/Navigator/RoomNavigatorManager.js";
import RoomManager from "./Rooms/RoomManager.js";

export default class Game {
    public readonly roomManager;
    public readonly roomNavigatorManager;

    constructor() {
        this.roomNavigatorManager = new RoomNavigatorManager();
        this.roomManager = new RoomManager();
    }

    public async loadModels() {
        await this.roomNavigatorManager.loadModels();
    }
}
