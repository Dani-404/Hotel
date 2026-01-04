import DebugRoomFurniture from "./Debug/DebugRoomFurniture.js";
import FurnitureRenderer from "./Furniture/FurnitureRenderer.js";
import RoomFloorSprite from "./Room/Items/Floor/RoomFloorSprite.js";
import RoomFurnitureItem from "./Room/Items/Furniture/RoomFurnitureItem.js";
import RoomItem from "./Room/Items/RoomItem.js";
import RoomRenderer from "./Room/Renderer.js";
import FloorRenderer from "./Room/Structure/FloorRenderer.js";

console.log("Hello world");

const root = document.getElementById("game");

if(root) {
    const roomRenderer = new RoomRenderer(root);

    const floorItem = new RoomItem([]);

    const floorSprite = new RoomFloorSprite(
        floorItem,
        new FloorRenderer({
            grid: [
                "XXXXXXXXXXXXXXXXXXXXXXXXX",
                "X22222222222222222222222X",
                "X22222222222222222222222X",
                "X22222222222222222222222X",
                "X22222222222222222222222X",
                "X22222222222222222222222X",
                "X22222222222222222222222X",
                "X22222222222222222222222X",
                "X22222222222222222222222X",
                "X22222222222222222222222X",
                "X11111111111111111111111X",
                "X11111111111111111111111X",
                "X11111111111111111111111X",
                "X11111111111111111111111X",
                "X11111111111111111111111X",
                "X11111111111111111111111X",
                "X11111111111111111111111X",
                "X11111111111111111111111X",
                "X11111111111111111111111X",
                "X11111111111111111111111X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "XXXXXXXXXXX000XXXXXXXXXXX",
                "XXXXXXXXXXX000XXXXXXXXXXX",
                "XXXXXXXXXXX000XXXXXXXXXXX",
                "XXXXXXXXXXX000XXXXXXXXXXX",
                "XXXXXXXXXXX000XXXXXXXXXXX",
                "XXXXXXXXXXX000XXXXXXXXXXX",
                "XXXXXXXXXXX000XXXXXXXXXXX",
                "XXXXXXXXXXX000XXXXXXXXXXX",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "X00000000000000000000000X",
                "XXXXXXXXXXXXXXXXXXXXXXXXX"
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

    floorItem.sprites.push(floorSprite);

    roomRenderer.items.push(floorItem);

    {
        const furnitureRenderer = new FurnitureRenderer("bed_armas_two", 64, 2);

        const furnitureItem = new RoomFurnitureItem(furnitureRenderer, {
            row: 1,
            column: 1,
            depth: 2
        });

        roomRenderer.items.push(furnitureItem);
    }

    {
        const furnitureRenderer = new FurnitureRenderer("divider_arm2", 64, 0);
        
        const furnitureItem = new RoomFurnitureItem(furnitureRenderer, {
            row: 3,
            column: 1,
            depth: 2
        });

        roomRenderer.items.push(furnitureItem);
    }

    for(let row = 12; row < 21; row++) {
        for(let column = 2; column < 25; column++) {
            const furnitureRenderer = new FurnitureRenderer("nft_rare_dragonlamp", 64, 2, 1, 1);
            
            const furnitureItem = new RoomFurnitureItem(furnitureRenderer, {
                row: row,
                column: column,
                depth: 2
            });

            roomRenderer.items.push(furnitureItem);
        }
    }

    for(let row = 22; row < 30; row++) {
        for(let column = 2; column < 25; column++) {
            const furnitureRenderer = new FurnitureRenderer("nft_rare_dragonlamp", 64, 4, 1);
            
            const furnitureItem = new RoomFurnitureItem(furnitureRenderer, {
                row: row,
                column: column,
                depth: 1
            });

            roomRenderer.items.push(furnitureItem);
        }
    }

    for(let row = 38; row < 46; row++) {
        for(let column = 2; column < 25; column++) {
            const furnitureRenderer = new FurnitureRenderer("nft_rare_dragonlamp", 64, 4, 1, 5);
            
            const furnitureItem = new RoomFurnitureItem(furnitureRenderer, {
                row: row,
                column: column,
                depth: 1
            });

            roomRenderer.items.push(furnitureItem);
        }
    }

    {
        const furnitureRenderer = new FurnitureRenderer("nft_rare_dragonlamp", 64, 2);
        
        const furnitureItem = new RoomFurnitureItem(furnitureRenderer, {
            row: 6,
            column: 6,
            depth: 3
        });

        roomRenderer.items.push(furnitureItem);

        new DebugRoomFurniture(roomRenderer, furnitureItem);
    }

    {
        const canvas = document.createElement("canvas");
        canvas.classList.add("debug");
        document.body.appendChild(canvas);
        
        canvas.width = 200;
        canvas.height = 200;

        const context = canvas.getContext("2d");

        const furnitureRenderer = new FurnitureRenderer("nft_rare_dragonlamp", 64, 4);

        furnitureRenderer.renderToCanvas().then((canvas) => {
            context?.drawImage(canvas, 0, 0);
        });
    }
}
