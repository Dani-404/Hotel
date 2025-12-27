import RoomFloorSprite from "./Room/Items/Floor/RoomFloorSprite.js";
import RoomItem from "./Room/Items/RoomItem.js";
import RoomRenderer from "./Room/Renderer.js";
import FloorRenderer from "./Room/Structure/FloorRenderer.js";

console.log("Hello world");

const root = document.getElementById("game");

if(root) {
    const roomRenderer = new RoomRenderer(root);

    const item = new RoomItem([]);

    const sprite = new RoomFloorSprite(
        item,
        new FloorRenderer({
            grid: [
                "000",
                "000",
                "000"
            ],
            floor: {
                thickness: 8
            },
            wall: {
                thickness: 8
            }
        }, {
            left: "#CCC",
            right: "#DDD",
            tile: "#FFF"
        })
    );

    item.sprites.push(sprite);

    roomRenderer.items.push(item);
}
