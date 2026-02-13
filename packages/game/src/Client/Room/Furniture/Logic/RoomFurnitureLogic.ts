import { RoomInstanceFurniture } from "@Client/Room/RoomInstance";

export default interface RoomFurnitureLogic {
    isAvailable(): boolean;
    
    use(roomFurniture: RoomInstanceFurniture): void;
}
