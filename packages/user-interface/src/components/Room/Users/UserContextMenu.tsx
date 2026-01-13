import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import HoveringFigure from "@shared/Events/Room/HoveringFigure";
import StoppedHoveringFigure from "@shared/Events/Room/StoppedHoveringFigure";

import "./UserContextMenu.css";

export default function UserContextMenu() {
    const { internalEventTarget } = useContext(AppContext);

    const elementRef = useRef<HTMLDivElement>(null);

    const [name, setName] = useState<string>();

    useEffect(() => {
        if(!elementRef.current) {
            return;
        }

        const listener = (event: HoveringFigure) => {
            setName(event.name);

            elementRef.current!.style.left = `${event.position.left}px`;
            elementRef.current!.style.top = `${event.position.top}px`;
        };

        internalEventTarget.addEventListener<HoveringFigure>("HoveringFigure", listener);
  
        return () => {
            internalEventTarget.removeEventListener<HoveringFigure>("HoveringFigure", listener);
        };
    }, [elementRef.current]);

    useEffect(() => {
        const listener = (event: StoppedHoveringFigure) => {
            setName(undefined);
        };

        internalEventTarget.addEventListener<StoppedHoveringFigure>("StoppedHoveringFigure", listener);
  
        return () => {
            internalEventTarget.removeEventListener<StoppedHoveringFigure>("StoppedHoveringFigure", listener);
        };
    }, []);

    return (
        <div ref={elementRef} className="arrow" style={{
            display: (!name)?("none"):("flex"),

            transform: "translate(64px, -70px) translate(-50%, -100%)",

            position: "absolute",

            background: "#2C2B2A",
            border: "1px solid #000000",
            borderBottomWidth: 2,
            borderRadius: 5,
        }}>
            <div style={{
                flex: 1,
                border: "1px solid #3C3C3C",
                borderRadius: 5,
                boxSizing: "border-box",

                fontSize: 12,

                padding: "5px 12px",

                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {name}
            </div>

            <div className="arrow-outline"/>
        </div>
    );
}
