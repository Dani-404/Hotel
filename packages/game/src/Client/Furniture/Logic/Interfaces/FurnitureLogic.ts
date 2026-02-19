export default interface FurnitureLogic {
    isAvailable(): boolean;
    
    use(tag?: string): void;
}
