import { useEffect, useState } from "react";
import OffscreenCanvasRender from "../OffscreenCanvasRender";
import Figure from "@Client/Figure/Figure";
import { FigureConfiguration } from "@Shared/Interfaces/Figure/FigureConfiguration";

export type FigureImageProps = {
    figureConfiguration: FigureConfiguration;
    direction: number;
}

export default function FigureImage({ figureConfiguration, direction }: FigureImageProps) {
    const [image, setImage] = useState<ImageBitmap>();

    useEffect(() => {
        const furnitureRenderer = new Figure(figureConfiguration, direction);

        furnitureRenderer.renderToCanvas(Figure.figureWorker, 0, true).then(({ figure }) => {
            setImage(figure.image);
        });
    }, [ figureConfiguration ]);

    if(!image) {
        return;
    }

    return (
        <OffscreenCanvasRender offscreenCanvas={image}/>
    );
}
