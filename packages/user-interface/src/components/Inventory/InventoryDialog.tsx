import Dialog from "../Dialog/Dialog";
import DialogTabs from "../Dialog/Tabs/DialogTabs";
import InventoryEmptyTab from "./Tabs/InventoryEmptyTab";
import InventoryFurnitureTab from "./Tabs/InventoryFurnitureTab";

export type InventoryDialogProps = {
    onClose: () => void;
};

export default function InventoryDialog({ onClose }: InventoryDialogProps) {
    return (
        <Dialog title="Inventory" width={490} height={340} onClose={onClose}>
            <DialogTabs withoutHeader tabs={[
                {
                    icon: "Furniture",
                    element: (<InventoryFurnitureTab/>)
                },
                {
                    icon: "Pets",
                    element: (<InventoryEmptyTab/>)
                },
                {
                    icon: "Badges",
                    element: (<InventoryEmptyTab/>)
                },
                {
                    icon: "Bots",
                    element: (<InventoryEmptyTab/>)
                }
            ]}/>
        </Dialog>
    );
}
