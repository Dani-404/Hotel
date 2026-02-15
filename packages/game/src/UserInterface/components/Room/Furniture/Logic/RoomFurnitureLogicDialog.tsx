import RoomFurnitureBackgroundDialog, { RoomFurnitureBackgroundDialogData } from "./Background/RoomFurnitureBackgroundDialog";
import RoomFurnitureDimmerDialog, { RoomFurnitureDimmerData } from "./Dimmer/RoomFurnitureDimmerDialog";

export type RoomFurnitureLogicDialogProps = {
    data: RoomFurnitureLogicDialogData;
    hidden?: boolean;
    onClose: () => void;
}

export type RoomFurnitureLogicDialogData = RoomFurnitureDimmerData | RoomFurnitureBackgroundDialogData;

export default function RoomFurnitureLogicDialog(props: RoomFurnitureLogicDialogProps) {
    switch(props.data.type) {
        case "furniture_roomdimmer":
            return (<RoomFurnitureDimmerDialog {...props}/>);
            
        case "furniture_background":
            return (<RoomFurnitureBackgroundDialog {...props}/>)
    }

    return null;
}