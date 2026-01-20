export default interface IncomingEvent<T = null> {
    handle(event: T): Promise<void>;
}
