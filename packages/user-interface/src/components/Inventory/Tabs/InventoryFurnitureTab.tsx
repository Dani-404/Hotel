import { useContext, useEffect, useRef, useState } from "react";
import FurnitureIcon from "../../Furniture/FurnitureIcon";
import CreateRoomRendererEvent, { RoomRendererOptions } from "@shared/Events/Room/Renderer/CreateRoomRendererEvent";
import { AppContext } from "../../../contexts/AppContext";
import DialogButton from "../../Dialog/Button/DialogButton";

export default function InventoryFurnitureTab() {
    const { internalEventTarget } = useContext(AppContext);

    const roomRef = useRef<HTMLDivElement>(null);
    const roomRendererRequested = useRef<boolean>(false);
    const [roomRendererOptions, setRoomRendererOptions] = useState<RoomRendererOptions>();
    
    useEffect(() => {
        if(!roomRef.current) {
            return;
        }

        if(roomRendererRequested.current) {
            return;
        }

        roomRendererRequested.current = true;

        const requestEvent = new CreateRoomRendererEvent(roomRef.current, { withoutWalls: true }, (roomRendererOptions) => {
            setRoomRendererOptions(roomRendererOptions);
        });

        internalEventTarget.dispatchEvent(requestEvent);
    }, [roomRef]);

    useEffect(() => {
        if(!roomRendererOptions) {
            return;
        }

        roomRendererOptions.setFurniture("rare_dragonlamp", 64, undefined, 0, 1);
    }, [roomRendererOptions]);

    useEffect(() => {
        if(!roomRendererOptions) {
            return;
        }

        return () => {
            roomRendererOptions.terminate();
        };
    }, [roomRendererOptions]);

    return (
        <div style={{
            flex: 1,

            display: "flex",
            flexDirection: "row"
        }}>
            <div style={{
                flex: 1,

                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 4,

                overflowY: "scroll"
            }}>
                <div style={{
                    display: "flex",

                    width: 40,
                    height: 40,

                    boxSizing: "border-box",

                    border: "1px solid black",
                    borderRadius: 6,

                    cursor: "pointer"
                }}>
                    <div style={{
                        flex: 1,

                        border: "2px solid white",
                        borderRadius: 6,

                        background: "#CBCBCB",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <FurnitureIcon furnitureData={{ type: "rare_dragonlamp", color: 1, name: "Dragon" }}/>
                    </div>
                </div>

                <div style={{
                    display: "flex",

                    width: 40,
                    height: 40,

                    boxSizing: "border-box",

                    border: "1px solid black",
                    borderRadius: 6,

                    cursor: "pointer"
                }}>
                    <div style={{
                        flex: 1,

                        borderRadius: 6,

                        background: "#CBCBCB",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <FurnitureIcon furnitureData={{ type: "roomdimmer", color: 0, name: "Dimmer" }}/>
                    </div>
                </div>
            </div>

            <div style={{
                width: 170,

                display: "flex",
                flexDirection: "column",
                gap: 10
            }}>
                <div ref={roomRef} style={{
                    height: 130,
                    width: "100%",
                }}/>

                <div style={{ flex: 1 }}>
                    <b>Rare dragonlamp</b>
                    <p>Rare dragonlamp</p>
                </div>

                <DialogButton>Place in room</DialogButton>
            </div>
        </div>
    );
}
