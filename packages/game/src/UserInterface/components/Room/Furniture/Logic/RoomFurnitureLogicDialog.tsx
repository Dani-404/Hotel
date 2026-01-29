import RoomFurnitureDimmerDialog, { RoomFurnitureDimmerData } from "./RoomFurnitureDimmerDialog";

export type RoomFurnitureLogicDialogProps = {
    data: RoomFurnitureLogicDialogData;
    hidden?: boolean;
    onClose: () => void;
}

export type RoomFurnitureLogicDialogData = RoomFurnitureDimmerData;

export default function RoomFurnitureLogicDialog(props: RoomFurnitureLogicDialogProps) {
    switch(props.data.type) {
        case "furniture_roomdimmer":
            return (<RoomFurnitureDimmerDialog {...props}/>)
    }

    return null;
}