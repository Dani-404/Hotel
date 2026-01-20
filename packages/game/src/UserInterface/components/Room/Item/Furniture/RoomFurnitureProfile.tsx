import { RoomFurnitureData } from "@Shared/Interfaces/Room/RoomFurnitureData";
import FurnitureImage from "../../../Furniture/FurnitureImage";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { FurnitureData } from "@Client/Interfaces/Furniture/FurnitureData";
import FurnitureAssets from "@Client/Assets/FurnitureAssets";
import RoomFurnitureItem from "@Client/Room/Items/Furniture/RoomFurnitureItem";
import { webSocketClient } from "../../../../..";
import { UpdateRoomFurnitureEventData } from "@Shared/Communications/Requests/Rooms/Furniture/UpdateRoomFurnitureEventData";

export type RoomFurnitureProfileProps = {
    data: RoomFurnitureData;
    item: RoomFurnitureItem;
}

export default function RoomFurnitureProfile({ data, item }: RoomFurnitureProfileProps) {    
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 10
        }}>
            <div style={{
                background: "rgba(61, 61, 61, .95)",
                padding: 10,
                borderRadius: 6,
                fontSize: 11,

                minWidth: 170,

                display: "flex",
                flexDirection: "column",
                gap: 10
            }}>

                <b>{data.furniture.name}</b>

                <div style={{
                    width: "100%",
                    height: 1,
                    background: "#333333"
                }}/>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <FurnitureImage furnitureData={data.furniture}/>
                </div>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 10
            }}>
                {(item.furnitureRenderer.getNextDirection() !== item.furnitureRenderer.direction) && (
                    <div style={{
                        background: "rgba(61, 61, 61, .95)",
                        fontSize: 12,
                        padding: 6,
                        color: "#FFFFFF",
                        borderRadius: 4,
                        border: "1px solid #FFFFFF",
                        cursor: "pointer",
                        pointerEvents: "auto"
                    }} onClick={() => {
                        webSocketClient.send<UpdateRoomFurnitureEventData>("UpdateRoomFurnitureEvent", {
                            roomFurnitureId: data.id,
                            direction: item.furnitureRenderer.getNextDirection()
                        });
                    }}>
                        Rotate
                    </div>
                )}
            </div>
        </div>
    );
}
