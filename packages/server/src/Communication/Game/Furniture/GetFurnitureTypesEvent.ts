import User from "../../../Users/User.js";
import IncomingEvent from "../../Interfaces/IncomingEvent.js";
import { FurnitureModel } from "../../../Database/Models/Furniture/FurnitureModel.js";
import OutgoingEvent from "../../../Events/Interfaces/OutgoingEvent.js";
import { FurnitureTypesEventData } from "@shared/Communications/Responses/Furniture/FurnitureTypesEventData.js";

export default class GetFurnitureTypesEvent implements IncomingEvent {
    public readonly name = "GetFurnitureTypesEvent";

    async handle(user: User) {
        const permissions = await user.getPermissions();

        if(!permissions.hasPermission("furniture:edit")) {
            throw new Error("User does not have edit furniture privileges.");
        }

        const categories = await FurnitureModel.findAll({
            attributes: ['category'],
            group: ['category'],
            raw: true
        });
        
        const interactionTypes = await FurnitureModel.findAll({
            attributes: ['interactionType'],
            group: ['interactionType'],
            raw: true
        });

        user.send(new OutgoingEvent<FurnitureTypesEventData>("FurnitureTypesEvent", {
            categories: categories.map(({ category }) => category),
            interactionTypes: interactionTypes.map(({ interactionType} ) => interactionType),
        }));
    }
}
