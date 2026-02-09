import { randomUUID } from "node:crypto";
import { HotelFeedbackModel } from "../../../Database/Models/Hotel/HotelFeedbackModel.js";
import User from "../../../Users/User.js";
import IncomingEvent from "../../Interfaces/IncomingEvent.js";
import { SendFeedbackEventData } from "@shared/Communications/Requests/Hotel/SendFeedbackEventData.js";

export default class SendFeedbackEvent implements IncomingEvent<SendFeedbackEventData> {
    async handle(user: User, event: SendFeedbackEventData) {
        await HotelFeedbackModel.create({
            id: randomUUID(),
            userId: user.model.id,
            area: (event.area.length)?(event.area):(null),
            description: event.description
        });
    }
}
