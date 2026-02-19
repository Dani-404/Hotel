export default interface RoomFurnitureLogic {
    isAvailable(): boolean;
    
    use(tag?: string): void;
}
