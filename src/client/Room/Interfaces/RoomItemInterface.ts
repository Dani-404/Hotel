import RoomItemSpriteInterface from "./RoomItemSpriteInterface";

export default interface RoomItemInterface {
    sprites: RoomItemSpriteInterface[];

    process(): void;
};
