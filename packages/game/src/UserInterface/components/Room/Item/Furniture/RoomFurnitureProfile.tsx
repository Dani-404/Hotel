import { RoomFurnitureData } from "@Shared/Interfaces/Room/RoomFurnitureData";
import FurnitureImage from "../../../Furniture/FurnitureImage";

export type RoomFurnitureProfileProps = {
    furniture: RoomFurnitureData;
}

export default function RoomFurnitureProfile({ furniture }: RoomFurnitureProfileProps) {
    return (
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

            <b>{furniture.furniture.name}</b>

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
                <FurnitureImage furnitureData={furniture.furniture}/>
            </div>
        </div>
    );
}
