import { FigureConfiguration } from "../../Interfaces/figure/FigureConfiguration.js";

export default class ClientFigureRequest extends Event {
    public readonly id: number = Math.random();

    constructor(public readonly configuration: string | FigureConfiguration, public readonly direction: number = 2) {
        super("ClientFigureRequest");
    }
}
