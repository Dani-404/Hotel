import { CSSProperties } from "react";

export type InputProps = {
    type?: "text" | "number";
    placeholder?: string;
    style?: CSSProperties;
    value: string;
    onChange: (value: string) => void;
}

export default function Input({ style, type = "text", placeholder, value, onChange }: InputProps) {
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
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => onChange((event.currentTarget as HTMLInputElement).value)}
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
