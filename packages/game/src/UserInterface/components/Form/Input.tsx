export type InputProps = {
    placeholder?: string;
    
    value: string;
    onChange: (value: string) => void;
}

export default function Input({ placeholder, value, onChange }: InputProps) {
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
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => onChange((event.currentTarget as HTMLInputElement).value)}
                    style={{
                        flex: 1,
                        background: "none",
                        border: "none"
                    }}/>
            </div>
        </div>
    );
}
