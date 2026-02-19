import { useCallback, useState } from "react";
import { RoomFurnitureLogicDialogProps } from "../RoomFurnitureLogicDialog";
import { webSocketClient } from "../../../../../..";
import { SetFurnitureDataEventData } from "@Shared/Communications/Requests/Rooms/Furniture/SetFurnitureDataEventData";
import { RoomFurnitureBackgroundTonerData } from "@Shared/Interfaces/Room/Furniture/RoomFurnitureBackgroundTonerData";
import { RoomInstanceFurniture } from "@Client/Room/RoomInstance";
import Dialog from "../../../../Dialog/Dialog";
import DialogContent from "../../../../Dialog/DialogContent";
import DialogButton from "../../../../Dialog/Button/DialogButton";
import DialogColorPicker from "../../../../Dialog/ColorPicker/DialogColorPicker";

export type RoomFurnitureBackgroundTonerDialogData = {
    furniture: RoomInstanceFurniture;
    type: "furniture_background_color";
};

export default function RoomFurnitureBackgroundTonerDialog({ data, hidden, onClose }: RoomFurnitureLogicDialogProps) {
    const [enabled, setEnabled] = useState((data.furniture.data.data as RoomFurnitureBackgroundTonerData)?.enabled ?? false);
    const [color, setColor] = useState((data.furniture.data.data as RoomFurnitureBackgroundTonerData)?.color ?? "#000000");

    const handleApply = useCallback(() => {        
        webSocketClient.send<SetFurnitureDataEventData<RoomFurnitureBackgroundTonerData>>("SetFurnitureDataEvent", {
            furnitureId: data.furniture.data.id,
            data: {
                enabled,
                color
            }
        });
    }, [enabled, color, data]);
    
    const handleToggle = useCallback(() => {
        setEnabled(!enabled);

        webSocketClient.send<SetFurnitureDataEventData<RoomFurnitureBackgroundTonerData>>("SetFurnitureDataEvent", {
            furnitureId: data.furniture.data.id,
            data: {
                enabled: !enabled,
                color
            }
        });
    }, [enabled, color, data]);

    if(hidden) {
        return null;
    }

    return (
        <Dialog title="Room Furniture Background" hidden={hidden} onClose={onClose} width={300} height={390} initialPosition="center">
            <DialogContent>
                <div style={{
                    flex: 1,
                    
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                }}>
                    <DialogColorPicker value={color} onChange={setColor}/>
                </div>

                <div style={{
                    display: "flex",
                    gap: 10
                }}>
                    <DialogButton style={{ flex: 1 }} onClick={handleToggle}>{(enabled)?("Turn off"):("Turn on")}</DialogButton>
                    <DialogButton style={{ flex: 1 }} onClick={handleApply}>Apply</DialogButton>
                </div>
            </DialogContent>
        </Dialog>
    );
}
