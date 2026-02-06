import { EventEmitter } from "node:events";
import type User from "../Users/User.js";
import type { RawData } from "ws";
import IncomingEvent from "../Communication/Interfaces/IncomingEvent.js";

class EventHandler extends EventEmitter {
    constructor() {
        super();
    }

    public decodeAndDispatchMessages(user: User, rawData: RawData) {
        const payload = JSON.parse(rawData.toString());

        if(typeof payload !== "object") {
            throw new Error("Received payload is not an object.");
        }

        if(!Array.isArray(payload)) {
            throw new Error("Received payload is not an array.");
        }

        for(let event of payload) {
            const [ eventName, eventBody ] = event;

            console.log("Processing event: " + eventName);

            this.emit(eventName, user, eventBody);
            user.emit(eventName, user, eventBody);
        }
    }

    addIncomingEvent<T>(eventName: string | symbol, listener: IncomingEvent<T>): this {
        return super.addListener(eventName, async (user, event) => {
            try {
                await listener.handle(user, event);
            }
            catch(error) {
                console.error(error);
            }
        });
    }
}

export const eventHandler = new EventHandler();
