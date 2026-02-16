import NavigatorRoomUsersCount from "./NavigatorRoomUsersCount";

export type NavigatorRoomListItemProps = {
    id: string;
    name: string;
    users: number;
    maxUsers: number;
    onClick: () => void;
}

export default function NavigatorRoomListItem({ name, users, maxUsers, onClick }: NavigatorRoomListItemProps) {
    return (
        <div style={{
            flex: 1,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            
            gap: 8
        }} onClick={onClick}>
            <NavigatorRoomUsersCount users={users} maxUsers={maxUsers}/>

            {name}
        </div>
    );
}
