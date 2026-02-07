import FigureImage from "../Figure/FigureImage";
import { useUser } from "../../hooks/useUser";

export default function Reception() {
    const user = useUser();

    return (
        <div style={{
            position: "absolute",

            left: 0,

            bottom: 47,

            width: "100%",
            height: "100%",

            background: "url(/assets/reception/habbo20_background_gradient.png)",
            backgroundSize: "contain"
        }}>
            <div style={{
                position: "absolute",
                left: 100,
                top: 47
            }}>
                <img src="/assets/reception/reception_logo_drape.png"/>
            </div>

            <div style={{
                position: "absolute",

                left: 0,
                bottom: 0
            }}>
                <img src="/assets/reception/nov19_background_left.png"/>

                {(user) && (
                    <div style={{
                        position: "absolute",
                        left: 145,
                        bottom: 38
                    }}>
                        <FigureImage figureConfiguration={user.figureConfiguration} direction={2}/>
                    </div>
                )}
            </div>
            
            <div style={{
                position: "absolute",

                right: 0,
                bottom: 0
            }}>
                <img src="/assets/reception/default_new_bg_right.png"/>
            </div>
        </div>
    );
}
