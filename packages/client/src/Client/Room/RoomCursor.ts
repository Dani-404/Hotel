import FurnitureRenderer from "@/Furniture/FurnitureRenderer.js";
import RoomRenderer from "./Renderer.js";
import RoomFurnitureItem from "./Items/Furniture/RoomFurnitureItem.js";
import RoomClickEvent from "@/Events/RoomClickEvent.js";
import RoomFigureItem from "./Items/Figure/RoomFigureItem.js";
import HoveringFigure from "@shared/Events/Room/HoveringFigure.js";
import StoppedHoveringFigure from "@shared/Events/Room/StoppedHoveringFigure.js";

export default class RoomCursor extends EventTarget {
    private readonly furnitureItem: RoomFurnitureItem;
    private hoveringFigure?: RoomFigureItem;

    constructor(private readonly roomRenderer: RoomRenderer) {
        super();

        const furnitureRenderer = new FurnitureRenderer("tile_cursor", 64, 0);
        
        this.furnitureItem = new RoomFurnitureItem(furnitureRenderer, {
            row: 1,
            column: 2,
            depth: 0
        });

        this.furnitureItem.disabled = true;

        this.roomRenderer.items.push(this.furnitureItem);

        this.roomRenderer.addEventListener("render", this.render.bind(this));
        this.roomRenderer.addEventListener("frame", this.frame.bind(this));
        this.roomRenderer.element.addEventListener("click", this.click.bind(this));
    }

    private render() {
        const entity = this.roomRenderer.getItemAtPosition((item) => item.type === "map");

        if(this.hoveringFigure && this.roomRenderer.roomInstance) {
            const user = this.roomRenderer.roomInstance.getUserByItem(this.hoveringFigure);

            const screenPosition = this.roomRenderer.getItemScreenPosition(this.hoveringFigure);

            this.roomRenderer.clientInstance.internalEventTarget.dispatchEvent(new HoveringFigure(user.data.name, screenPosition));
        }
        
        if(!entity) {
            this.furnitureItem.disabled = true;

            return;
        }

        this.furnitureItem.setPosition({
            row: Math.floor(entity.position.row),
            column: Math.floor(entity.position.column),
            depth: entity.position.depth
        });

        this.furnitureItem.disabled = false;
    }

    private frame() {
        const entity = this.roomRenderer.getItemAtPosition((item) => ["furniture", "figure"].includes(item.type));

        if(!entity) {
            this.roomRenderer.element.style.cursor = "default";

            if(this.hoveringFigure) {
                console.log("Stopped hovering figure")
                this.roomRenderer.clientInstance.internalEventTarget.dispatchEvent(new StoppedHoveringFigure());
    
                delete this.hoveringFigure;
            }

            return;
        }

        this.roomRenderer.element.style.cursor = "pointer";

        if(!this.hoveringFigure && this.roomRenderer.roomInstance) {
            if(entity.item instanceof RoomFigureItem) {
                console.log("Started hovering figure on frame");

                this.hoveringFigure = entity.item;

                const user = this.roomRenderer.roomInstance.getUserByItem(entity.item);

                const screenPosition = this.roomRenderer.getItemScreenPosition(entity.item);

                this.roomRenderer.clientInstance.internalEventTarget.dispatchEvent(new HoveringFigure(user.data.name, screenPosition));
            }
        }
    }

    private click() {
        const floorEntity = this.roomRenderer.getItemAtPosition((item) => item.type === "map");
        const otherEntity = this.roomRenderer.getItemAtPosition((item) => item.type !== "map");

        if(floorEntity || otherEntity) {
            this.dispatchEvent(new RoomClickEvent(floorEntity, otherEntity));
        }
    }
}
