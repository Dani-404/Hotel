import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import OffscreenCanvasRender from "../OffscreenCanvasRender";
import FigureRenderer from "@Client/Figure/FigureRenderer";
import { FigureConfiguration } from "@Shared/Interfaces/Figure/FigureConfiguration";

export type WardrobeAvatarProps = {
    configuration: FigureConfiguration;
};

export default function WardrobeAvatar({ configuration }: WardrobeAvatarProps) {
    const [figureImage, setFigureImage] = useState<ImageBitmap>();

    useEffect(() => {
        const figureRenderer = new FigureRenderer(configuration, 2);
        
        figureRenderer.renderToCanvas(FigureRenderer.figureWorker, 0, true).then(({ image }) => {
            setFigureImage(image);
        });
    }, [ configuration ]);

    return (
        <div style={{
            width: "100%",
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden"
        }}>
            {(figureImage) && (<OffscreenCanvasRender offscreenCanvas={figureImage} scale={2}/>)}
        </div>
    );
}
