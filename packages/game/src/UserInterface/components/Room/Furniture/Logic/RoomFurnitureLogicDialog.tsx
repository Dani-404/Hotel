import RoomFurnitureBackgroundDialog, { RoomFurnitureBackgroundDialogData } from "./Background/RoomFurnitureBackgroundDialog";
import RoomFurnitureDimmerDialog, { RoomFurnitureDimmerData } from "./Dimmer/RoomFurnitureDimmerDialog";
import RoomFurnitureStickiesDialog, { RoomFurnitureStickiesDialogData } from "./Stickies/RoomFurnitureStickiesDialog";
import RoomFurnitureBackgroundTonerDialog, { RoomFurnitureBackgroundTonerDialogData } from "./Toner/RoomFurnitureBackgroundTonerDialog";
import RoomFurnitureTrophyDialog, { RoomFurnitureTrophyDialogData } from "./Trophy/RoomFurnitureTrophyDialog";

export type RoomFurnitureLogicDialogProps = {
    data: RoomFurnitureLogicDialogData;
    hidden?: boolean;
    onClose: () => void;
}

export type RoomFurnitureLogicDialogData =
    RoomFurnitureDimmerData
    | RoomFurnitureBackgroundDialogData
    | RoomFurnitureBackgroundTonerDialogData
    | RoomFurnitureStickiesDialogData
    | RoomFurnitureTrophyDialogData;

export default function RoomFurnitureLogicDialog(props: RoomFurnitureLogicDialogProps) {
    switch(props.data.type) {
        case "furniture_roomdimmer":
            return (<RoomFurnitureDimmerDialog {...props}/>);
            
        case "furniture_background":
            return (<RoomFurnitureBackgroundDialog {...props}/>);
            
        case "furniture_stickie":
            return (<RoomFurnitureStickiesDialog {...props}/>);
            
        case "furniture_background_color":
            return (<RoomFurnitureBackgroundTonerDialog {...props}/>);
            
        case "trophy":
            return (<RoomFurnitureTrophyDialog {...props}/>);
    }

    return null;
}