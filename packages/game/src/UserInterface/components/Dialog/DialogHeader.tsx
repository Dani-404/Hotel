import { MouseEventHandler } from "react";

export type MousePosition = {
    left: number;
    top: number;
};

export type DialogHeaderProps = {
    title: string;
    onDialogMove: MouseEventHandler<HTMLDivElement>;
    onClose?: () => void;
};

export default function DialogHeader({ title, onDialogMove, onClose }: DialogHeaderProps) {
    return (
        <div style={{
            backgroundColor: "#367897",
            
            width: "100%",
            height: 31,

            border: "2px solid rgba(255, 255, 255, .14)",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,

            boxSizing: "border-box",
            borderBottom: "none",

            display: "flex",

            justifyContent: "center",
            alignItems: "center",

            position: "relative"
        }} onMouseDown={onDialogMove}>
            <div style={{
                fontSize: 13,
                pointerEvents: "none"
            }}>
                <b>{title}</b>
            </div>

            <div style={{
                position: "absolute",
                right: 6,
                top: 4
            }}>
                <div className="sprite_dialog_close" onClick={onClose} style={{
                    cursor: "pointer"
                }}/>
            </div>
        </div>
    );
}
