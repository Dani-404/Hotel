import { PropsWithChildren, ReactNode } from "react";

export default function DialogList({ children }: PropsWithChildren) {
    const allChildren = (Array.isArray(children))?(children):([children]);

    return (
        <div style={{
            flex: 1,

            display: "flex",
            flexDirection: "column"
        }}>
            {allChildren.map((child, index) => (
                <div key={index} style={{
                    background: (!(index % 2))?("#D5EDFF"):("#FFFFFF"),
                    height: 20,

                    padding: 1,
                    boxSizing: "border-box",

                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    textWrap: "nowrap",

                    borderRadius: 3,

                    alignItems: "center",

                    gap: 8,

                    fontSize: 13,

                    cursor: "pointer"
                }}>
                    {child}
                </div>
            ))}
        </div>
    );
}
