import { useEffect, useState } from "react";
import OffscreenCanvasRender from "../OffscreenCanvasRender";
import { FurnitureData } from "@Shared/Interfaces/Room/RoomFurnitureData";
import FurnitureRenderer from "@Client/Furniture/FurnitureRenderer";

export type FurnitureIconProps = {
    furnitureData: FurnitureData;
}

export default function FurnitureIcon({ furnitureData }: FurnitureIconProps) {
    const [image, setImage] = useState<ImageBitmap>();

    useEffect(() => {
        const furnitureRenderer = new FurnitureRenderer(furnitureData.type, 1, 0, 0, furnitureData.color);

        furnitureRenderer.renderToCanvas().then((image) => {
            setImage(image);
        });
    }, [ furnitureData ]);

    if(!image) {
        return;
    }

    return (
        <OffscreenCanvasRender offscreenCanvas={image}/>
    );
}
