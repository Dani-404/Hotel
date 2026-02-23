import { CSSProperties } from "react";

export type InputProps = {
    type?: "text" | "number";
    placeholder?: string;
    style?: CSSProperties;
    value: string;
    onChange: (value: string) => void;
    min?: number;
    max?: number;
    step?: number;
    readonly?: boolean;
    maxLength?: number;
}

export default function Input({ style, readonly, step, type = "text", placeholder, value, onChange, min, max, maxLength }: InputProps) {
    return (
        <div style={{
            borderBottom: "1px solid #FFFFFF",
            borderRadius: 6
        }}>
            <div style={{
                background: "#FFFFFF",
                border: "1px solid #808080",
                borderRadius: 6,

                height: 24,

                display: "flex",
                flexDirection: "row"
            }}>
                <input
                    type={type}
                    readOnly={readonly}
                    step={step}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => onChange((event.currentTarget as HTMLInputElement).value)}
                    min={min}
                    max={max}
                    maxLength={maxLength}
                    style={{
                        flex: 1,
                        background: "none",
                        border: "none",
                        ...style
                    }}/>
            </div>
        </div>
    );
}
