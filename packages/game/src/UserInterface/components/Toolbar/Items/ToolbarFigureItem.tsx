import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import Figure from "@Client/Figure/Figure";

export default function ToolbarFigureItem() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { user } = useContext(AppContext);

    const [figureImage, setFigureImage] = useState<ImageBitmap>();

    useEffect(() => {
        if(!user) {
            return;
        }

        const figureRenderer = new Figure(user.figureConfiguration, 2);

        figureRenderer.renderToCanvas(Figure.figureWorker, 0).then(({ figure }) => {
            setFigureImage(figure.image);
        });
    }, [user]);

    useEffect(() => {
        if(canvasRef.current && figureImage) {
            const context = canvasRef.current.getContext("2d");

            context?.reset();

            context?.translate(20, 22);
            context?.drawImage(figureImage, -128, -96 - 12);
        }
    }, [canvasRef, figureImage]);

    return (
        <div style={{
            height: 40,
            width: 44,

            overflow: "hidden"
        }}>
            <canvas ref={canvasRef} width={40} height={44}/>
        </div>
    );
}
