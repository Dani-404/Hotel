import User from "../../Users/User";

export default interface IncomingEvent<T = null> {
    handle(user: User, event: T): Promise<void>;
}
