import WiredDialog from "../../../../../Dialog/Wired/WiredDialog";
import { RoomInstanceFurniture } from "@Client/Room/RoomInstance";
import { RoomFurnitureLogicDialogProps } from "../../RoomFurnitureLogicDialog";
import WiredFurniture from "../../../../../Dialog/Wired/WiredFurniture";
import WiredDivider from "../../../../../Dialog/Wired/WiredDivider";
import WiredSection from "../../../../../Dialog/Wired/WiredSection";
import { useCallback, useState } from "react";
import WiredButton from "../../../../../Dialog/Wired/WiredButton";
import { WiredTriggerUserPerformsActionData, wiredTriggerUserPerformsActions } from "@Shared/Interfaces/Room/Furniture/Wired/Trigger/WiredTriggerUserPerformsActionData";
import { webSocketClient } from "../../../../../../..";
import { SetFurnitureDataEventData } from "@Shared/Communications/Requests/Rooms/Furniture/SetFurnitureDataEventData";
import WiredSelection from "../../../../../Dialog/Wired/Selection/WiredSelection";
import WiredCheckbox from "../../../../../Dialog/Wired/WiredCheckbox";

export type WiredTriggerUserPerformsActionDialog = {
    furniture: RoomInstanceFurniture<WiredTriggerUserPerformsActionData>;
    type: "wf_trg_says_something";
};

export default function WiredTriggerUserPerformsActionDialog({ data, onClose }: RoomFurnitureLogicDialogProps<WiredTriggerUserPerformsActionDialog>) {
    const [action, setAction] = useState(data.furniture.data.data?.action ?? "Wave");
    const [filter, setFilter] = useState(data.furniture.data.data?.filter ?? false);
    const [filterId, setFilterId] = useState(data.furniture.data.data?.filterId ?? 1);

    const handleApply = useCallback(() => {
        webSocketClient.send<SetFurnitureDataEventData<WiredTriggerUserPerformsActionData>>("SetFurnitureDataEvent", {
            furnitureId: data.furniture.data.id,
            data: {
                action,
                filter,
                filterId
            }
        });

        onClose();
    }, [action, filter, filterId, data, onClose]);

    return (
        <WiredDialog onClose={onClose}>
            <WiredFurniture furniture={data.furniture.data}/>

            <WiredDivider/>

            <WiredSection>
                <b>Action:</b>

                <WiredSelection value={action} onChange={setAction} items={wiredTriggerUserPerformsActions.map((action) => {
                    return {
                        value: action,
                        label: action
                    };
                })}/>
            </WiredSection>

            {(["Dance", "Sign"].includes(action)) && (
                <WiredDivider/>
            )}

            {(action === "Dance") && (
                <WiredSection>
                    <WiredCheckbox value={filter} onChange={setFilter} label="Filter by dance"/>

                    {(filter) && (
                        <WiredSelection value={filterId} onChange={setFilterId} items={[
                            {
                                value: 1,
                                label: "Dance"
                            },
                            {
                                value: 2,
                                label: "Pogo Mogo"
                            },
                            {
                                value: 3,
                                label: "Duck Funk"
                            },
                            {
                                value: 4,
                                label: "The Rollie"
                            }
                        ]}/>
                    )}
                </WiredSection>
            )}

            {(action === "Sign") && (
                <WiredSection>
                    <WiredCheckbox value={filter} onChange={setFilter} label="Filter by sign"/>

                    {(filter) && (
                        <WiredSelection value={filterId} onChange={setFilterId} items={Array(10).fill(null).map((_, number) => {
                            return {
                                value: number + 1,
                                label: "Number " + (number + 1)
                            };
                        })}/>
                    )}
                </WiredSection>
            )}

            <WiredDivider/>

            <WiredSection style={{ flexDirection: "row" }}>
                <WiredButton onClick={handleApply}>Apply</WiredButton>
                <WiredButton onClick={onClose}>Cancel</WiredButton>
            </WiredSection>
        </WiredDialog>
    );
}
