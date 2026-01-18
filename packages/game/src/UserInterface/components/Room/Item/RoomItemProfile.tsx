import RoomInstance from "@Client/Room/RoomInstance";
import { useEffect, useRef, useState } from "react";
import { RoomUserData } from "@Shared/Interfaces/Room/RoomUserData";
import { RoomFurnitureData } from "@Shared/Interfaces/Room/RoomFurnitureData";
import RoomClickEvent from "@Client/Events/RoomClickEvent";
import RoomFigureItem from "@Client/Room/Items/Figure/RoomFigureItem";
import RoomFurnitureItem from "@Client/Room/Items/Furniture/RoomFurnitureItem";
import RoomFurnitureProfile from "./Furniture/RoomFurnitureProfile";
import RoomUserProfile from "./User/RoomUserProfile";

export type RoomItemProfileItem = {
    type: "user";
    user: RoomUserData;
} | {
    type: "furniture";
    furniture: RoomFurnitureData;
};

export type RoomItemProfileProps = {
    room: RoomInstance;
};

export default function RoomItemProfile({ room }: RoomItemProfileProps) {
    const roomEventsRegistered = useRef<boolean>(false);

    const [focusedItem, setFocusedItem] = useState<RoomItemProfileItem>();

    useEffect(() => {
        if(roomEventsRegistered.current) {
            return;
        }

        room.roomRenderer.cursor?.addEventListener("click", (event) => {
            if(!(event instanceof RoomClickEvent)) {
                return;
            }

            if(event.otherEntity) {
                if(event.otherEntity.item instanceof RoomFigureItem) {
                    const user = room.getUserByItem(event.otherEntity.item);

                    setFocusedItem({
                        type: "user",
                        user: user.data
                    });
                }
                else if(event.otherEntity.item instanceof RoomFurnitureItem) {
                    const furniture = room.getFurnitureByItem(event.otherEntity.item);

                    setFocusedItem({
                        type: "furniture",
                        furniture: furniture.data
                    });
                }
                else {
                    setFocusedItem(undefined);
                }
            }
            else {
                setFocusedItem(undefined);
            }
        });
    }, []);

    if(!focusedItem) {
        return null;
    }

    return (
        <div style={{
            position: "absolute",

            padding: 10,

            right: 0,
            bottom: 50,
        }}>
            {(focusedItem.type === "furniture")?(
                <RoomFurnitureProfile furniture={focusedItem.furniture}/>
            ):(
                <RoomUserProfile user={focusedItem.user}/>
            )}
        </div>
    );
}
