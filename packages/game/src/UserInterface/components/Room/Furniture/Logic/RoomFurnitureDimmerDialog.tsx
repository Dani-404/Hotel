import Dialog from "../../../Dialog/Dialog";
import DialogContent from "../../../Dialog/DialogContent";
import { RoomFurnitureLogicDialogProps } from "./RoomFurnitureLogicDialog";

export type RoomFurnitureDimmerData = {
    type: "furniture_roomdimmer";
};

export default function RoomFurnitureDimmerDialog({ hidden, onClose }: RoomFurnitureLogicDialogProps) {
    return (
        <Dialog title="Room Creation" hidden={hidden} onClose={onClose} width={100} height={70}>
            <DialogContent>
                hello world
            </DialogContent>
        </Dialog>
    );
}
