import { useState } from "react";
import Dialog from "../Dialog/Dialog";
import DialogTabs, { DialogTabHeaderProps } from "../Dialog/Tabs/DialogTabs";
import ShopDialogCategory from "./ShopDialogCategory";

export type ShopDialogProps = {
    onClose?: () => void;
}

export default function ShopDialog({ onClose }: ShopDialogProps) {
    const [header, setHeader] = useState<DialogTabHeaderProps>();

    return (
        <Dialog title="Shop" onClose={onClose} width={570} height={670}>
            <DialogTabs initialActiveIndex={1} header={header} withLargeTabs tabs={[
                {
                    icon: "Frontpage",
                    element: (<div/>),
                },
                {
                    icon: "Furniture",
                    element: (
                        <ShopDialogCategory category="furniture" onHeaderChange={setHeader}/>
                    ),
                },
                {
                    icon: "Clothing",
                    element: (<div/>),
                },
                {
                    icon: "Pets",
                    element: (<div/>),
                }
            ]}>

            </DialogTabs>
        </Dialog>
    );
}
