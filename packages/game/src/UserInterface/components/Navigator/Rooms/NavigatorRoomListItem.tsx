import { Fragment } from "react/jsx-runtime";

function getUserCountColor(users: number, maxUsers: number) {
    if(users === 0) {
        return "#CAC9C0";
    }

    if(users >= maxUsers) {
        return "#C1322B";
    }

    if(users >= maxUsers - 10) {
        return "#FFB01A";
    }

    return "#62B061";
}

export type NavigatorRoomListItemProps = {
    id: string;
    name: string;
    users: number;
    maxUsers: number;
    onClick: () => void;
}

export default function NavigatorRoomListItem({ id, name, users, maxUsers, onClick }: NavigatorRoomListItemProps) {
    return (
        <div style={{
            flex: 1,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            
            gap: 8
        }} onClick={onClick}>
            <div style={{
                borderRadius: 3,
                background: getUserCountColor(users, maxUsers),
                width: 40,
                height: "100%",
                color: "white",
                boxSizing: "border-box",

                padding: "0 6px",

                display: "flex",
                alignItems: "center",
                flexDirection: "row",
            }}>
                <div className="sprite_navigator_user-count"/>

                <div style={{
                    flex: 1,
                    textAlign: "center",

                    fontSize: (users >= 100)?(12):(13)
                }}>
                    <b>{users}</b>
                </div>
            </div>

            {name}
        </div>
    );
}
