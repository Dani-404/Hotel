export default class ClientFigureResponse extends Event {
    constructor(public readonly id: number, public readonly image: ImageBitmap) {
        super("ClientFigureResponse");
    }
}
