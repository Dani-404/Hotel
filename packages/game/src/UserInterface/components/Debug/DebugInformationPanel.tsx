import { useDialogs } from "../../hooks/useDialogs";
import { useHotel } from "../../hooks/useHotel";

export default function DebugInformationPanel() {
    const hotel = useHotel();
    const dialogs = useDialogs();

    return (
        <div style={{
            position: "absolute",

            left: 0,
            top: 0,

            padding: 32
        }}>
            <div style={{
                fontFamily: "Ubuntu Medium",
                fontSize: 40
            }}>
                Pixel63
            </div>

            {(hotel?.users !== undefined) && (
                <div>
                    {hotel.users} {(hotel.users !== 1)?("guests"):("guest")} online
                </div>
            )}

            <div style={{ height: 20 }}/>

            <div style={{
                cursor: "pointer",
                pointerEvents: "auto",
                textDecoration: "underline"
            }} onClick={() => dialogs.addUniqueDialog("report-issue")}>
                Report an issue
            </div>
        </div>
    );
}
