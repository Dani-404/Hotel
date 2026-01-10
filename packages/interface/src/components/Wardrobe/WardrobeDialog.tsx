import { useState } from "react";
import Dialog from "../Dialog/Dialog";
import DialogSubTabs from "../Dialog/DialogSubTabs";
import DialogTabs from "../Dialog/DialogTabs";
import WardrobeSelection from "./Selection/WardrobeSelection";

import { FigureConfiguration, FigurePartKeyAbbreviation } from "@shared/interfaces/figure/FigureConfiguration";

const wardrobeTabs = [
    {
        spriteName: "sprite_wardrobe_head_tab",
        tabs: [
            {
                part: "hr" satisfies FigurePartKeyAbbreviation,
                spriteName: "sprite_wardrobe_head_hair",
            },
            {
                part: "ha" satisfies FigurePartKeyAbbreviation,
                spriteName: "sprite_wardrobe_head_hats",
            },
            {
                part: "fa" satisfies FigurePartKeyAbbreviation,
                spriteName: "sprite_wardrobe_head_accessories",
            },
            {
                part: "ea" satisfies FigurePartKeyAbbreviation,
                spriteName: "sprite_wardrobe_head_eyewear",
            },
            {
                part: "he" satisfies FigurePartKeyAbbreviation,
                spriteName: "sprite_wardrobe_head_face_accesories",
            }
        ]
    }
];

export default function WardrobeDialog() {
    const [figureConfiguration, setFigureConfiguration] = useState<FigureConfiguration>([
        {
            type: "hr",
            setId: "831",
            colorIndex: undefined
        }
    ]);
    
    return (
        <Dialog title="Wardrobe">
            <DialogTabs initialActiveIndex={1} tabs={[
                {
                    icon: (<div className="sprite_wardrobe_generic_tab"/>),
                    element: (
                        <DialogSubTabs tabs={[
                            {
                                icon: (<div className="sprite_wardrobe_male"/>),
                                activeIcon: (<div className="sprite_wardrobe_male_on"/>),
                                element: (<div>male</div>)
                            },
                            {
                                icon: (<div className="sprite_wardrobe_female"/>),
                                activeIcon: (<div className="sprite_wardrobe_female_on"/>),
                                element: (<div>female</div>)
                            }
                        ]}/>
                    )
                },
                ...wardrobeTabs.map((wardrobeTab) => {
                    return {
                        icon: (<div className={wardrobeTab.spriteName}/>),
                        element: (
                            <DialogSubTabs tabs={wardrobeTab.tabs.map((tab) => {
                                return {
                                    icon: (<div className={tab.spriteName}/>),
                                    activeIcon: (<div className={`${tab.spriteName}_on`}/>),
                                    element: (<WardrobeSelection part={tab.part as FigurePartKeyAbbreviation} figureConfiguration={figureConfiguration} onFigureConfigurationChange={setFigureConfiguration}/>)
                                };
                            })}/>
                        )
                    }
                }),
                {
                    icon: (<div className="sprite_wardrobe_torso_tab"/>),
                    element: <div>test</div>
                },
                {
                    icon: (<div className="sprite_wardrobe_legs_tab"/>),
                    element: <div>test</div>
                }
            ]}/>
        </Dialog>
    )
}
