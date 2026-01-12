import { DataTypes } from "@sequelize/core";
import { FigureConfiguration } from "@shared/Interfaces/figure/FigureConfiguration";

export class FigureConfigurationType extends DataTypes.ABSTRACT<FigureConfiguration> {
    parseDatabaseValue(value: string): FigureConfiguration {
        console.log("parse", value);
        return JSON.parse(value);
    }
    
    toBindableValue(value: FigureConfiguration): string {
        console.log("bind", value);
        return JSON.stringify(value);
    }

    toSql() {
        return "TEXT";
    }
}
