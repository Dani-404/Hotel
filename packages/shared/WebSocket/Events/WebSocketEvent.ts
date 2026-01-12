export default class WebSocketEvent<T> extends Event {
    constructor(type: string, public readonly data: T) {
        super(type);
    }
}
