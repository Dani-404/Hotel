export default class HoveringFigure extends Event {
    constructor(public readonly name: string, public readonly position: { left: number, top: number }) {
        super("HoveringFigure");
    }
}
