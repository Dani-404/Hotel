import { MouseEventHandler, PropsWithChildren } from "react";

import "./WardrobeSelectionItem.css";

export type WardrobeSelectionItemProps = PropsWithChildren & {
    active: boolean;
    onClick: MouseEventHandler;
}

export default function WardrobeSelectionItem({ active, children, onClick }: WardrobeSelectionItemProps) {
    return (
        <div className={(active)?("item active"):("item")} onClick={onClick} style={{
            width: 50,
            height: 50,

            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {children}
        </div>
    );
}
