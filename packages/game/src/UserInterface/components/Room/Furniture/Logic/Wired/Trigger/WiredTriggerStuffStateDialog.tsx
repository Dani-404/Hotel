import WiredDialog from "../../../../../Dialog/Wired/WiredDialog";
import { RoomInstanceFurniture } from "@Client/Room/RoomInstance";
import { RoomFurnitureLogicDialogProps } from "../../RoomFurnitureLogicDialog";
import WiredFurniture from "../../../../../Dialog/Wired/WiredFurniture";
import WiredDivider from "../../../../../Dialog/Wired/WiredDivider";
import WiredSection from "../../../../../Dialog/Wired/WiredSection";
import { useCallback, useState } from "react";
import WiredButton from "../../../../../Dialog/Wired/WiredButton";
import { WiredTriggerStuffStateData } from "@Shared/Interfaces/Room/Furniture/Wired/Trigger/WiredTriggerStuffStateData";
import { webSocketClient } from "../../../../../../..";
import { SetFurnitureDataEventData } from "@Shared/Communications/Requests/Rooms/Furniture/SetFurnitureDataEventData";
import WiredFurniturePicker from "../../../../../Dialog/Wired/WiredFurniturePicker";
import WiredFurnitureSource from "../../../../../Dialog/Wired/WiredFurnitureSource";
import WiredRadio from "../../../../../Dialog/Wired/WiredRadio";
import { useRoomInstance } from "../../../../../../hooks/useRoomInstance";

export type WiredTriggerStuffStateDialog = {
    furniture: RoomInstanceFurniture<WiredTriggerStuffStateData>;
    type: "wf_trg_says_something";
};

export default function WiredTriggerStuffStateDialog({ data, onClose }: RoomFurnitureLogicDialogProps<WiredTriggerStuffStateDialog>) {
    const room = useRoomInstance();

    const [trigger, setTrigger] = useState(data.furniture.data.data?.trigger ?? "all");

    const [furnitureIds, setFurnitureIds] = useState(data.furniture.data.data?.furnitureIds ?? []);
    const [furnitureSource, setFurnitureSource] = useState(data.furniture.data.data?.furnitureSource ?? "list");

    const handleApply = useCallback(() => {
        if(!room) {
            return;
        }

        const furnitureTriggerStates = furnitureIds.map((furnitureId) => {
            const roomFurniture = room.getFurnitureById(furnitureId);

            return roomFurniture.furniture.animation;
        });

        webSocketClient.send<SetFurnitureDataEventData<WiredTriggerStuffStateData>>("SetFurnitureDataEvent", {
            furnitureId: data.furniture.data.id,
            data: {
                furnitureIds,
                furnitureSource,

                trigger,
                furnitureTriggerStates
            }
        });

        onClose();
    }, [furnitureIds, furnitureSource, trigger, room, data, onClose]);

    return (
        <WiredDialog onClose={onClose}>
            <WiredFurniture furniture={data.furniture.data}/>

            <WiredDivider/>

            <WiredSection>
                <b>Select options:</b>
                
                <WiredRadio value={trigger} onChange={setTrigger} items={[
                    {
                        value: "all",
                        label: "Trigger for all states"
                    },
                    {
                        value: "state",
                        label: "Trigger for the current state"
                    }
                ]}/>
            </WiredSection>

            <WiredDivider/>

            <WiredFurniturePicker value={furnitureIds} onChange={setFurnitureIds} maxFurniture={20}/>

            <WiredDivider/>

            <WiredFurnitureSource value={furnitureSource} onChange={setFurnitureSource} furnitureIds={furnitureIds} maxFurniture={20}/>

            <WiredDivider/>

            <WiredSection style={{ flexDirection: "row" }}>
                <WiredButton onClick={handleApply}>Apply</WiredButton>
                <WiredButton onClick={onClose}>Cancel</WiredButton>
            </WiredSection>
        </WiredDialog>
    );
}
