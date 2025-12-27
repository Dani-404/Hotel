import RoomItemInterface from "../Interfaces/RoomItemInterface";
import RoomItemSpriteInterface from "../Interfaces/RoomItemSpriteInterface";

export default class RoomItem implements RoomItemInterface {
    constructor(public sprites: RoomItemSpriteInterface[]) {

    }

    process(): void {
        
    }
}
