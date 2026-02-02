import { Fragment } from "react";
import WardrobeDialog from "../Wardrobe/WardrobeDialog";
import ShopDialog from "../Shop/ShopDialog";
import InventoryDialog from "../Inventory/InventoryDialog";
import NavigatorDialog from "../Navigator/NavigatorDialog";
import RoomCreationDialog from "../Navigator/Rooms/Creator/RoomCreationDialog";
import { useDialogs } from "../../hooks/useDialogs";
import RoomFurnitureLogicDialog, { RoomFurnitureLogicDialogData } from "../Room/Furniture/Logic/RoomFurnitureLogicDialog";

export default function DialogInstances() {
    const { dialogs, closeDialog } = useDialogs();

    return (
        <Fragment>
            {dialogs.map((dialog) => {
                switch(dialog.type) {
                    case "wardrobe":
                        return (<WardrobeDialog key={dialog.id} hidden={dialog.hidden} onClose={() => closeDialog(dialog.id)}/>);
                        
                    case "shop":
                        return (<ShopDialog key={dialog.id} hidden={dialog.hidden} onClose={() => closeDialog(dialog.id)}/>);
                        
                    case "inventory":
                        return (<InventoryDialog key={dialog.id} hidden={dialog.hidden} onClose={() => closeDialog(dialog.id)}/>);
                        
                    case "navigator":
                        return (<NavigatorDialog key={dialog.id} hidden={dialog.hidden} onClose={() => closeDialog(dialog.id)}/>);
                        
                    case "room-creation":
                        return (<RoomCreationDialog key={dialog.id} hidden={dialog.hidden} onClose={() => closeDialog(dialog.id)}/>);

                    case "room-furniture-logic":
                        return (<RoomFurnitureLogicDialog key={dialog.id} data={dialog.data as RoomFurnitureLogicDialogData} hidden={dialog.hidden} onClose={() => closeDialog(dialog.id)}/>)
                }
            })}
        </Fragment>
    );
}
