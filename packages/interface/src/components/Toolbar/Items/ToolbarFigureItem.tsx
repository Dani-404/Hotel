import { useContext, useEffect, useRef, useState } from "react";
import ClientFigureRequest from "@shared/events/requests/ClientFigureRequest";
import ClientFigureResponse from "@shared/events/responses/ClientFigureResponse";
import { AppContext } from "../../../contexts/AppContext";

export default function ToolbarFigureItem() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {internalEventTarget} = useContext(AppContext);

    const [figureImage, setFigureImage] = useState<ImageBitmap>();

    useEffect(() => {
        const requestEvent = new ClientFigureRequest("hd-180-2.hr-828-31.ea-3196-62.ch-255-1415.lg-3216-110.sh-305-62", 2);

        const listener = (event: ClientFigureResponse) => {
            if(event.id !== requestEvent.id) {
                return;
            }

            setFigureImage(event.image);
        };

        internalEventTarget.addEventListener("ClientFigureResponse", listener);

        internalEventTarget.dispatchEvent(requestEvent);

        return () => {
            internalEventTarget.removeEventListener("ClientFigureResponse", listener);
        };
    }, []);

    useEffect(() => {
        if(canvasRef.current && figureImage) {
            const context = canvasRef.current.getContext("2d");

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
