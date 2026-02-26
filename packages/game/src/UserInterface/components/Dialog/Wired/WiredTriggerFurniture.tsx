import { RoomFurnitureData } from "@Shared/Interfaces/Room/RoomFurnitureData";
import WiredSection from "./WiredSection";

export type WiredTriggerFurnitureProps = {
    furniture: RoomFurnitureData;
}

export default function WiredTriggerFurniture({ furniture }: WiredTriggerFurnitureProps) {
    return (
        <WiredSection>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 6
            }}>
                <div className="sprite_dialog_wired_trigger"/>

                <div style={{
                    fontFamily: "Ubuntu Bold"
                }}>
                    {furniture.furniture.name}
                </div>
            </div>
        </WiredSection>
    )
}