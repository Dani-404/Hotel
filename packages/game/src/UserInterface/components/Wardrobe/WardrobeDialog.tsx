import { useUser } from "../../hooks/useUser";
import FigureWardrobeDialog from "./FigureWardrobeDialog";
import { webSocketClient } from "../../..";
import { useCallback } from "react";
import { SetFigureConfigurationEventData } from "@Shared/Communications/Requests/User/SetFigureConfigurationEventData";
import { FigureConfigurationData } from "@pixel63/events";

export type WardrobeDialogProps = {
    hidden?: boolean;
    onClose?: () => void;
};

export default function WardrobeDialog(props: WardrobeDialogProps) {
    const user = useUser();
    
    const handleApply = useCallback((figureConfiguration: FigureConfigurationData) => {
        webSocketClient.send<SetFigureConfigurationEventData>("SetFigureConfigurationEvent", {
            figureConfiguration
        });
    }, []);

    if(!user.figureConfiguration) {
        return null;
    }

    return (
        <FigureWardrobeDialog title="Wardrobe" header={user.name} initialFigureConfiguration={user.figureConfiguration} onApply={handleApply} {...props}/>
    );
}
