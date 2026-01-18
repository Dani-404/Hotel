import { RoomUserData } from "@Shared/Interfaces/Room/RoomUserData";
import FigureImage from "../../../Figure/FigureImage";

export type RoomUserProfileProps = {
    user: RoomUserData;
}

export default function RoomUserProfile({ user }: RoomUserProfileProps) {
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

            <b>{user.name}</b>

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
                <FigureImage figureConfiguration={user.figureConfiguration} direction={2}/>
            </div>
        </div>
    );
}
