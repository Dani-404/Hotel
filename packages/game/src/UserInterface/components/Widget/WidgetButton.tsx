import { PropsWithChildren } from "react";

import "./WidgetButton.css";

export type WidgetButtonProps = PropsWithChildren & {
    disabled?: boolean;
    color: string;
    onClick: () => void;
}

export default function WidgetButton({ disabled, color, children, onClick }: WidgetButtonProps) {
    return (
        <div className={`widget-button ${(disabled)?("disabled"):("")}`} style={{
            background: color
        }} onClick={onClick}>
            {children}
        </div>
    );
}
