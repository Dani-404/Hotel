import { useDialogs } from "../../../hooks/useDialogs";
import { useRoomInstance } from "../../../hooks/useRoomInstance";

export type RoomThumbnailProps = {
    roomId: string;
    thumbnail: string | null;
};

export default function RoomThumbnail({ roomId, thumbnail }: RoomThumbnailProps) {
    const room = useRoomInstance();
    const dialogs = useDialogs();

    return (
        <div style={{
            width: 112,
            height: 112,

            boxSizing: "border-box",

            border: "1px solid black",
            backgroundColor: "#B4B3AA",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            position: "relative"
        }}>
            {(!thumbnail)?(
                <div className="sprite_room_thumbnail_empty"/>
            ):(
                <img src={thumbnail}/>
            )}

            {(room && room.id === roomId && room.hasRights) && (
                <div className="sprite_room_camera" style={{
                    position: "absolute",

                    bottom: 3,
                    right: 3,

                    cursor: "pointer"
                }} onClick={() =>
                    dialogs.addUniqueDialog("room-settings-thumbnail")
                }/>
            )}
        </div>
    );
}
