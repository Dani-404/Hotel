import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "fs";

function getValueAsArray(value: any) {
    if(!value) {
        return [];
    }

    if(value.length) {
        return value;
    }

    return [value];
}

export function createFiguremapData(): any {
    const parser = new XMLParser({
        ignoreAttributes: false
    });

    const document = parser.parse(readFileSync("assets/figuremap.xml", { encoding: "utf-8" }), true);

    return document.map.lib.map((library: any) => {
        return {
            id: library["@_id"],
            parts: getValueAsArray(library.part).map((part: any) => {
                return {
                    id: part["@_id"],
                    type: part["@_type"]
                }
            })
        };
    });
}

export function createFiguredataData(): any {
    const parser = new XMLParser({
        ignoreAttributes: false
    });

    const document = parser.parse(readFileSync("assets/figuredata.xml", { encoding: "utf-8" }), true);


    return {
        palettes: document["figuredata"]["colors"]["palette"].map((palette: any) => {
            return {
                id: parseInt(palette["@_id"]),
                colors: palette["color"].map((color: any) => {
                    return {
                        id: parseInt(color["@_id"]),
                        index: parseInt(color["@_index"]),
                        club: color["@_club"] === '1',
                        selectable: color["@_selectable"] === '1',
                        preselectable: color["@_preselectable"] === '1',
                        color: color["#text"]
                    }
                })
            }
        }),

        settypes: document["figuredata"]["sets"]["settype"].map((settype: any) => {
            return {
                type: settype["@_type"],
                paletteId: parseInt(settype["@_paletteid"]),
                mandatoryGender: {
                    male: [ parseInt(settype["@_mand_m_0"]) === 1, parseInt(settype["@_mand_m_1"]) === 1 ],
                    female: [ parseInt(settype["@_mand_m_0"]) === 1, parseInt(settype["@_mand_m_1"]) === 1 ]
                },
                sets: settype["set"].map((set: any) => {
                    return {
                        id: set["@_id"],
                        gender: set["@_gender"],
                        club: set["@_club"] === '1',
                        colorable: set["@_colorable"] === '1',
                        selectable: set["@_selectable"] === '1',
                        preselectable: set["@_preselectable"] === '1',

                        parts: getValueAsArray(set["part"]).map((part: any) => {
                            return {
                                id: part["@_id"],
                                type: part["@_type"],
                                colorable: set["@_colorable"] === '1',
                                index: parseInt(part["@_index"]),
                                colorIndex: parseInt(part["@_colorindex"])
                            }
                        }),

                        hiddenPartTypes: (set["hiddenlayers"]?.["layer"])?(getValueAsArray(set["hiddenlayers"]?.["layer"]).map((layer: any) => {
                            return layer["@_parttype"];
                        })):(undefined)
                    }
                })
            }
        })
    }
}

export function createAvatarActionsData(): any {
    const parser = new XMLParser({
        ignoreAttributes: false
    });

    const document = parser.parse(readFileSync("assets/HabboAvatarActions.xml", { encoding: "utf-8" }), true);

    return document.actions.action.map((action: any) => {
        return {
            id: action["@_id"],
            state: action["@_state"],
            precedence: parseInt(action["@_precedence"]),
            main: action["@_main"] === '1',
            isDefault: action["@_isdefault"] === '1',
            geometryType: action["@_geometrytype"],
            activePartSet: action["@_activepartset"],
            assetPartDefinition: action["@_assetpartdefinition"],
            prevents: action["@_prevents"]?.split(','),
            animation: action["@_animation"] === '1',
            types: getValueAsArray(action.type).map((type: any) => {
                return {
                    id: parseInt(type["@_id"]),
                    animated: type["@_animated"] == 'true',
                    prevents: type["@_prevents"]?.split(','),
                    preventHeadTurn: type["@_preventheadturn"] === 'true'
                }
            }),
            params: getValueAsArray(action.param).map((param: any) => {
                return {
                    id: param["@_id"],
                    value: parseInt(param["@_value"]),
                }
            })
        };
    });
}
