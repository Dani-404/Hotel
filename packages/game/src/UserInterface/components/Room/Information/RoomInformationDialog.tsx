import { useRoomInstance } from "../../../hooks/useRoomInstance";
import Dialog from "../../Dialog/Dialog";
import DialogContent from "../../Dialog/DialogContent";

export type RoomInformationDialogProps = {
    hidden?: boolean;
    onClose?: () => void;
}

export default function RoomInformationDialog({ hidden, onClose }: RoomInformationDialogProps) {
    const room = useRoomInstance();

    if(!room) {
        return null;
    }

    return (
        <Dialog title="Room information" hidden={hidden} onClose={onClose} width={230} height={450}>
            <DialogContent>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                }}>
                    <div><b>{room.information.name}</b></div>

                    <div><b style={{ color: "#7A7A7A" }}>Owner:</b> {room.information.owner.name}</div>

                    <div>
                        <p>
                            {room.information.description}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
