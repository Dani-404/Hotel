import { FigureConfiguration, FigurePartKeyAbbreviation } from "../Interfaces/Figure/FigureConfiguration.js";

export default class FigureConfigurationHelper {
    public static getConfigurationFromString(figureString: string): FigureConfiguration {
        const parts = figureString.split('.');

        const configuration: FigureConfiguration = [];

        for(let part of parts) {
            const sections = part.split('-');

            configuration.push({
                type: sections[0] as FigurePartKeyAbbreviation,
                setId: sections[1] as string,
                colors: (sections[2])?([parseInt(sections[2])]):([])
            });
        }

        return configuration;
    }
}