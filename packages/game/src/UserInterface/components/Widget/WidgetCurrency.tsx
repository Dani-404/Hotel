import { PropsWithChildren } from "react";

function getCurrencyAsString(value?: number) {
    if(!value) {
        return "0";
    }

    const numberFormat = new Intl.NumberFormat('en-US');

    return numberFormat.format(value);
}

export type WidgetCurrencyProps = PropsWithChildren & {
    color: string;
    value: number;
}

export default function WidgetCurrency({ color, value, children }: WidgetCurrencyProps) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            fontSize: 12,
            color,
            alignItems: "center"
        }}>
            <b>{getCurrencyAsString(value)}</b>

            {children}
        </div>
    );
}
