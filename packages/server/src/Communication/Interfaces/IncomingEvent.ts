import User from "../../Users/User";

export default interface IncomingEvent<T> {
    handle(user: User, event: T): Promise<void>;
}
