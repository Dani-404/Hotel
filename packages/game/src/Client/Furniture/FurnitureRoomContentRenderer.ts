import FurnitureAssets from "@Client/Assets/FurnitureAssets";
import FurnitureRenderer, { FurnitureRendererSprite } from "@Client/Furniture/FurnitureRenderer";
import { FurnitureData } from "@Client/Interfaces/Furniture/FurnitureData";

export default class FurnitureRoomContentRenderer implements FurnitureRenderer {
    public placement?: "wall" | "floor" | undefined;

    public frame: number = 0;

    private furnitureRenderer;
    
    constructor(public readonly type: string, public readonly size: number, public direction: number | undefined = undefined, public animation: number = 0, public color: number = 0) {
        this.furnitureRenderer = new FurnitureRenderer(type, size, direction, animation, 0);
    }

    public getData(): Promise<FurnitureData> {
        return this.furnitureRenderer.getData();
    }

    public async render(frame?: number): Promise<FurnitureRendererSprite[]> {
        return this.furnitureRenderer.render(frame);
    }

    public async renderToCanvas(): Promise<ImageBitmap> {
        if(FurnitureAssets.assetSprites.has(`${this.type}_${this.color}`)) {
            const assetSprite = FurnitureAssets.assetSprites.get(`${this.type}_${this.color}`);

            if(assetSprite) {
                return assetSprite.image;
            }
        }

        return new Promise((resolve) => {
            const image = new Image();

            image.onload = async () => {
                const sprite: FurnitureRendererSprite = {
                    x: 0,
                    y: 0,
                    image: await createImageBitmap(image),
                    imageData: new ImageData(1, 1),
                    zIndex: 0
                };

                FurnitureAssets.assetSprites.set(`${this.type}_${this.color}`, sprite);

                resolve(sprite.image);
            }

            switch(this.type) {
                case "wallpaper":
                    image.src = `/assets/shop/walls/th_wall_${this.color}.png`; 
                    break;
                    
                case "floor":
                    image.src = `/assets/shop/floors/th_floor_${this.color}.png`; 
                    break;
            }
        });
    }

    getDimensions(raw?: boolean): { row: number; column: number; depth: number; } {
        return this.furnitureRenderer.getDimensions(raw);
    }

    public getNextAnimation(): number {
        return this.furnitureRenderer.getNextAnimation();
    }

    public getNextDirection(): number | undefined {
        return this.furnitureRenderer.getNextDirection();
    }

}