import { FurnitureRendererSprite } from "@Client/Furniture/Furniture";
import FurnitureDefaultRenderer from "@Client/Furniture/Renderer/FurnitureDefaultRenderer";
import { FurnitureData } from "@Client/Interfaces/Furniture/FurnitureData";

export default class FurnitureXRayRenderer extends FurnitureDefaultRenderer {
    public placement?: "wall" | "floor" | undefined;

    public frame: number = 0;

    public render(data: FurnitureData, direction: number | undefined, size: number, animation: number, color: number, frame: number): Promise<FurnitureRendererSprite[]> {
        for(const visualization of data.visualization.visualizations) {
            if(!visualization.layers.length) {
                continue;
            }

            if(visualization.layerCount === 12) {
                continue;
            }

            visualization.layerCount = 12;

            console.log(visualization.layers);

            visualization.layers.find((layer) => layer.id === 1)!.ink = "difference";
            visualization.layers.find((layer) => layer.id === 2)!.ink = "subtract";
            visualization.layers.find((layer) => layer.id === 4)!.ink = "difference";
            visualization.layers.find((layer) => layer.id === 5)!.ink = "subtract";
            visualization.layers.find((layer) => layer.id === 6)!.ink = "lighter";
            visualization.layers.find((layer) => layer.id === 7)!.ink = "lighter";

            visualization.layers.push({
                id: 8,
                ink: "overlay",
                zIndex: 4
            });

            for(const { id: direction } of visualization.directions) {
                const sourceAsset = data.assets.find((asset) => asset.name === `${this.type}_${visualization.size}_b_${direction}_0`);

                if(sourceAsset) {
                    data.assets.push({
                        name: `${this.type}_${visualization.size}_i_${direction}_0`,
                        
                        x: sourceAsset.x,
                        y: sourceAsset.y,

                        source: sourceAsset.name,
                    })
                }
            }

            visualization.layers.push({
                id: 9,
                ink: "overlay",
                zIndex: 1004
            });

            for(const { id: direction } of visualization.directions) {
                const sourceAsset = data.assets.find((asset) => asset.name === `${this.type}_${visualization.size}_e_${direction}_0`);

                if(sourceAsset) {
                    data.assets.push({
                        name: `${this.type}_${visualization.size}_j_${direction}_0`,
                        
                        x: sourceAsset.x,
                        y: sourceAsset.y,

                        source: sourceAsset.name,
                    })
                }
            }
            
            visualization.layers.push({
                id: 10,
                ink: "saturation",
                zIndex: -1
            });

            for(const { id: direction } of visualization.directions) {
                const sourceAsset = data.assets.find((asset) => asset.name === `${this.type}_${visualization.size}_b_${direction}_0`);

                if(sourceAsset) {
                    data.assets.push({
                        name: `${this.type}_${visualization.size}_k_${direction}_0`,
                        
                        x: sourceAsset.x,
                        y: sourceAsset.y,

                        source: sourceAsset.name,
                    })
                }
            }
            
            visualization.layers.push({
                id: 11,
                ink: "saturation",
                zIndex: 999
            });

            for(const { id: direction } of visualization.directions) {
                const sourceAsset = data.assets.find((asset) => asset.name === `${this.type}_${visualization.size}_e_${direction}_0`);

                if(sourceAsset) {
                    data.assets.push({
                        name: `${this.type}_${visualization.size}_l_${direction}_0`,
                        
                        x: sourceAsset.x,
                        y: sourceAsset.y,

                        source: sourceAsset.name,
                    })
                }
            }
        }

        return super.render(data, direction, size, animation, color, frame);
    }
}