import { useEffect, useState } from "react";
import OffscreenCanvasRender from "../OffscreenCanvasRender";
import { FurnitureData } from "@Shared/Interfaces/Room/RoomFurnitureData";
import FurnitureRenderer from "@Client/Furniture/FurnitureRenderer";
import { FigureConfiguration } from "@Shared/Interfaces/Figure/FigureConfiguration";
import FigureRenderer from "@Client/Figure/FigureRenderer";

export type FigureImageProps = {
    figureConfiguration: FigureConfiguration;
    direction: number;
}

export default function FigureImage({ figureConfiguration, direction }: FigureImageProps) {
    const [image, setImage] = useState<ImageBitmap>();

    useEffect(() => {
        const furnitureRenderer = new FigureRenderer(figureConfiguration, direction);

        furnitureRenderer.renderToCanvas(FigureRenderer.figureWorker, 0, true).then(({ image }) => {
            setImage(image);
        });
    }, [ figureConfiguration ]);

    if(!image) {
        return;
    }

    return (
        <OffscreenCanvasRender offscreenCanvas={image}/>
    );
}
