import { FigureConfiguration, FigurePartKeyAbbreviation } from "../Interfaces/Figure/FigureConfiguration.js";

export default class FigureConfigurationHelper {
    public static getConfigurationFromString(figureString: string): FigureConfiguration {
        const parts = figureString.split('.');

        // TODO: guess gender from head part
        const configuration: FigureConfiguration = {
            gender: "male",
            parts: []
        };

        for(let part of parts) {
            const sections = part.split('-');

            configuration.parts.push({
                type: sections[0] as FigurePartKeyAbbreviation,
                setId: sections[1] as string,
                colors: (sections[2])?([parseInt(sections[2])]):([])
            });
        }

        return configuration;
    }
}