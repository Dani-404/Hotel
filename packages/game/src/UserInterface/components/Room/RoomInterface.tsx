import { useRoomInstance } from "../../hooks/useRoomInstance";
import RoomItemProfile from "./Item/RoomItemProfile";
import UserContextMenu from "./Users/UserContextMenu";

export default function RoomInterface() {
    const room = useRoomInstance();

    if(!room) {
        return null;
    }

    return (
        <div key={room.key} style={{
            position: "fixed",

            left: 0,
            top: 0,

            width: "100%",
            height: "100%",

            pointerEvents: "none"
        }}>
            <UserContextMenu/>

            <RoomItemProfile room={room}/>
        </div>
    );
}
