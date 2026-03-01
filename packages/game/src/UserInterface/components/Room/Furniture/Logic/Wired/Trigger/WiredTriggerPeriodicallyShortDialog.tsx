import WiredDialog from "../../../../../Dialog/Wired/WiredDialog";
import { RoomInstanceFurniture } from "@Client/Room/RoomInstance";
import { RoomFurnitureLogicDialogProps } from "../../RoomFurnitureLogicDialog";
import WiredFurniture from "../../../../../Dialog/Wired/WiredFurniture";
import WiredDivider from "../../../../../Dialog/Wired/WiredDivider";
import WiredSection from "../../../../../Dialog/Wired/WiredSection";
import { useCallback, useState } from "react";
import WiredButton from "../../../../../Dialog/Wired/WiredButton";
import { WiredTriggerPeriodicallyData } from "@Shared/Interfaces/Room/Furniture/Wired/Trigger/WiredTriggerPeriodicallyData";
import { webSocketClient } from "../../../../../../..";
import { SetFurnitureDataEventData } from "@Shared/Communications/Requests/Rooms/Furniture/SetFurnitureDataEventData";
import WiredSlider from "../../../../../Dialog/Wired/Slider/WiredSlider";

export type WiredTriggerPeriodicallyShortDialog = {
    furniture: RoomInstanceFurniture<WiredTriggerPeriodicallyData>;
    type: "wf_trg_says_something";
};

export default function WiredTriggerPeriodicallyShortDialog({ data, onClose }: RoomFurnitureLogicDialogProps<WiredTriggerPeriodicallyShortDialog>) {
    const [seconds, setSeconds] = useState(data.furniture.data.data?.seconds ?? 5);

    const handleApply = useCallback(() => {
        webSocketClient.send<SetFurnitureDataEventData<WiredTriggerPeriodicallyData>>("SetFurnitureDataEvent", {
            furnitureId: data.furniture.data.id,
            data: {
                seconds,
            }
        });

        onClose();
    }, [seconds, data, onClose]);

    return (
        <WiredDialog onClose={onClose}>
            <WiredFurniture furniture={data.furniture.data}/>

            <WiredDivider/>

            <WiredSection>
                <b>Set the time: {seconds * 1000} milliseconds</b>

                <WiredSlider value={seconds * 1000} onChange={(value) => setSeconds(value / 1000)} min={100} max={1000} step={100}/>

                <div style={{ fontSize: 11 }}><i>Currently limited to 500 millisecond intervals.</i></div>
            </WiredSection>

            <WiredDivider/>

            <WiredSection style={{ flexDirection: "row" }}>
                <WiredButton onClick={handleApply}>Apply</WiredButton>
                <WiredButton onClick={onClose}>Cancel</WiredButton>
            </WiredSection>
        </WiredDialog>
    );
}
