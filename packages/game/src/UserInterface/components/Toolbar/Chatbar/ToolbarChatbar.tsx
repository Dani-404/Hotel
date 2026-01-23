export default function ToolbarChatbar() {
    return (
        <div style={{
            border: "2px solid #000",
            borderRadius: 8,
            height: 38,
            width: 450,
            boxSizing: "border-box",
            background: "#E4E4E4",

            display: "flex",
            flexDirection: "row"
        }}>
            <div style={{
                width: 54,
                height: "100%",
                borderRight: "1px solid #666666"
            }}>
                <div style={{
                    height: "100%",
                    boxSizing: "border-box",
                    border: "2px solid #B2B2B2",
                    background: "#A1A1A1",
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                }}>
                </div>
            </div>

            <input type="text" style={{
                flex: 1,
                border: "none",
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                fontSize: 16,
                background: "transparent"
            }}/>
        </div>
    );
}
