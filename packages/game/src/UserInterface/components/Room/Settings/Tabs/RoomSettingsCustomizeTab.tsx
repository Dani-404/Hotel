import { useEffect, useState } from "react";
import Selection from "../../../Form/Selection";
import { useRoomInstance } from "../../../../hooks/useRoomInstance";
import { webSocketClient } from "../../../../..";
import { UpdateRoomStructureEventData } from "@Shared/Communications/Requests/Rooms/UpdateRoomStructureEventData";
import Checkbox from "../../../Form/Checkbox";

export default function RoomSettingsCustomizeTab() {
    const room = useRoomInstance();

    if(!room) {
        return;
    }

    const [floorThickness, setFloorThickness] = useState(room?.roomRenderer.structure.floor.thickness);
    const [wallThickness, setWallThickness] = useState(room?.roomRenderer.structure.wall.thickness);
    const [wallHidden, setWallHidden] = useState(room?.roomRenderer.structure.wall.hidden);

    useEffect(() => {
        webSocketClient.send<UpdateRoomStructureEventData>("UpdateRoomStructureEvent", {
            floorThickness
        });
    }, [floorThickness]);

    useEffect(() => {
        webSocketClient.send<UpdateRoomStructureEventData>("UpdateRoomStructureEvent", {
            wallThickness
        });
    }, [wallThickness]);

    useEffect(() => {
        webSocketClient.send<UpdateRoomStructureEventData>("UpdateRoomStructureEvent", {
            wallHidden
        });
    }, [wallHidden]);

    return (
        <div style={{
            flex: 1,

            display: "flex",
            flexDirection: "column",
            gap: 8
        }}>
            <b>Room customization</b>

            <Selection value={floorThickness} items={[
                {
                    value: 0,
                    label: "Thinnest floor"
                },
                {
                    value: 4,
                    label: "Thin floor"
                },
                {
                    value: 8,
                    label: "Normal floor"
                },
                {
                    value: 12,
                    label: "Thick floor"
                },
                {
                    value: 16,
                    label: "Thickest floor"
                }
            ]} onChange={(value) => setFloorThickness(value as number)}/>
            
            <Selection value={wallThickness} items={[
                {
                    value: 0,
                    label: "Thinnest walls"
                },
                {
                    value: 4,
                    label: "Thin walls"
                },
                {
                    value: 8,
                    label: "Normal walls"
                },
                {
                    value: 12,
                    label: "Thick walls"
                },
                {
                    value: 16,
                    label: "Thickest walls"
                }
            ]} onChange={(value) => setWallThickness(value as number)}/>

            <Checkbox label="Hide room walls" value={wallHidden} onChange={setWallHidden}/>
        </div>
    );
}
