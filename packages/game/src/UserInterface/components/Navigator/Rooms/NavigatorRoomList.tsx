import DialogList from "../../Dialog/List/DialogList";
import DialogListContainer from "../../Dialog/List/DialogListContainer";
import NavigatorRoomListItem from "./NavigatorRoomListItem";

export type NavigatorRoomListProps = {
    rooms: {
        users: number;
        maxUsers: number;
    }[];
};

export default function NavigatorRoomList({ rooms }: NavigatorRoomListProps) {
    return (
        <DialogListContainer title="Most Popular Rooms">
            <DialogList>
                {rooms.map((room) => (
                    <NavigatorRoomListItem users={room.users} maxUsers={room.maxUsers}/>
                ))}
            </DialogList>
        </DialogListContainer>
    );
}
