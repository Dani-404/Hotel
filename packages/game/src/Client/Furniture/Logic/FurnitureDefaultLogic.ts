import Furniture from "@Client/Furniture/Furniture";
import FurnitureLogic from "@Client/Furniture/Logic/Interfaces/FurnitureLogic";

export default class FurnitureDefaultLogic implements FurnitureLogic {
    constructor(private readonly furniture: Furniture) {

    }

    isAvailable() {
        return false;
    }

    use(): void {
        
    }
}
