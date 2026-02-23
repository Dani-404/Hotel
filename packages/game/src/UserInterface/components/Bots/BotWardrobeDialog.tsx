import { FigureConfiguration } from "@Shared/Interfaces/Figure/FigureConfiguration";
import FigureWardrobeDialog from "../Wardrobe/FigureWardrobeDialog";
import { UserBotData } from "@Shared/Interfaces/Room/RoomBotData";
import { useCallback } from "react";
import { webSocketClient } from "../../..";
import { UpdateRoomBotEventData } from "@Shared/Communications/Requests/Rooms/Bots/UpdateRoomBotEventData";

export type BotWardrobeDialogProps = {
    data: UserBotData;
    hidden?: boolean;
    onClose?: () => void;
}

export default function BotWardrobeDialog(props: BotWardrobeDialogProps) {
    const handleApply = useCallback((figureConfiguration: FigureConfiguration) => {
        webSocketClient.send<UpdateRoomBotEventData>("UpdateRoomBotEvent", {
            userBotId: props.data.id,
            figureConfiguration
        })
    }, [ props.data ]);

    return (
        <FigureWardrobeDialog title={"Bot Wardrobe"} header={props.data.name ?? "Bot"} initialFigureConfiguration={props.data.figureConfiguration} onApply={handleApply} {...props}/>
    );
}
