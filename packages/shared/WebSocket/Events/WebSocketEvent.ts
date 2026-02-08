export default class WebSocketEvent<T> extends Event {
    constructor(type: string, public readonly data: T, public readonly delay: number | undefined) {
        super(type);
    }
}
