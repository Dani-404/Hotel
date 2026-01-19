import DialogList from "../../Dialog/List/DialogList";
import DialogListContainer from "../../Dialog/List/DialogListContainer";
import NavigatorRoomListItem from "./NavigatorRoomListItem";

export type NavigatorRoomListProps = {
    rooms: {
        id: string;
        name: string;
        users: number;
        maxUsers: number;
    }[];

    onClick: (room: NavigatorRoomListProps["rooms"][0]) => void;
};

export default function NavigatorRoomList({ rooms, onClick }: NavigatorRoomListProps) {
    return (
        <DialogListContainer title="Most Popular Rooms">
            <DialogList>
                {rooms.map((room) => (
                    <NavigatorRoomListItem {...room} onClick={() => onClick(room)}/>
                ))}
            </DialogList>
        </DialogListContainer>
    );
}
