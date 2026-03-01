import FigureWardrobeDialog from "../Wardrobe/FigureWardrobeDialog";
import { UserBotData } from "@Shared/Interfaces/Room/RoomBotData";
import { useCallback } from "react";
import { webSocketClient } from "../../..";
import { UpdateRoomBotEventData } from "@Shared/Communications/Requests/Rooms/Bots/UpdateRoomBotEventData";
import { useDialogs } from "../../hooks/useDialogs";
import { FigureConfigurationData } from "@pixel63/events";

export type BotWardrobeDialogProps = {
    data: UserBotData;
    hidden?: boolean;
    onClose?: () => void;
}

export default function BotWardrobeDialog(props: BotWardrobeDialogProps) {
    const dialogs = useDialogs();

    const handleApply = useCallback((figureConfiguration: FigureConfigurationData) => {
        webSocketClient.send<UpdateRoomBotEventData>("UpdateRoomBotEvent", {
            userBotId: props.data.id,
            figureConfiguration
        });

        dialogs.closeDialog("bot-wardrobe");
    }, [ props.data ]);

    return (
        <FigureWardrobeDialog title={"Bot Wardrobe"} header={props.data.name ?? "Bot"} initialFigureConfiguration={props.data.figureConfiguration} onApply={handleApply} {...props}/>
    );
}
