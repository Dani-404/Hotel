import { MouseEventHandler, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import DialogHeader, { MousePosition } from "./DialogHeader";
import useDialogMovement from "./Hooks/useDialogMovement";

export type DialogProps = PropsWithChildren & {
    title: string;
    width: number;
    height: number;
    hidden?: boolean;
    onClose?: () => void;
};

export default function Dialog({ title, children, hidden, onClose, width, height }: DialogProps) {
    const { elementRef, onDialogFocus, onMouseDown } = useDialogMovement();

    return (
        <div ref={elementRef} style={{
            border: "1px solid black",
            borderRadius: 7,

            backgroundColor: "#ECEAE0",

            width,
            height: height,

            left: 0,
            top: 0,

            overflow: "hidden",

            position: "fixed",

            display: "flex",
            flexDirection: "column",

            pointerEvents: (!hidden)?("auto"):("none"),
            opacity: (!hidden)?(undefined):(0)
        }} onMouseDown={onDialogFocus}>
            <DialogHeader title={title} onDialogMove={onMouseDown} onClose={onClose}/>

            <div style={{
                height: 1,
                width: "100%",
                backgroundColor: "black",

                overflow: "hidden"
            }}/>

            {children}
        </div>
    );
}
