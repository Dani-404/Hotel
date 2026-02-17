import User from "../../../Users/User.js";
import { ShopPageModel } from "../../../Database/Models/Shop/ShopPageModel.js";
import OutgoingEvent from "../../../Events/Interfaces/OutgoingEvent.js";
import IncomingEvent from "../../Interfaces/IncomingEvent.js";
import { GetShopPagesEventData } from "@shared/Communications/Requests/Shop/GetShopPagesEventData.js";
import { ShopPagesEventData } from "@shared/Communications/Responses/Shop/ShopPagesEventData.js";

export default class GetShopPagesEvent implements IncomingEvent<GetShopPagesEventData> {
    public readonly name = "GetShopPagesEvent";
    
    async handle(user: User, event: GetShopPagesEventData) {
        if(event.category !== "furniture") {
            return;
        }

        const shopPages: ShopPageModel[] = await ShopPageModel.findAll({
            where: {
                category: "furniture",
                parentId: null
            },
            include: {
                model: ShopPageModel,
                as: "children",
                order: ["index"]
            },
            order: []
        });

        user.send(new OutgoingEvent<ShopPagesEventData>("ShopPagesEventData", {
            category: "furniture",
            pages: shopPages.sort((a, b) => a.index - b.index).map((shopPage) => {
                return {
                    id: shopPage.id,

                    title: shopPage.title,
                    description: shopPage.description,
                    
                    icon: shopPage.icon ?? undefined,
                    header: shopPage.header ?? undefined,
                    teaser: shopPage.teaser ?? undefined,
                    
                    type: shopPage.type,

                    index: shopPage.index,
                    
                    children: shopPage.children.sort((a, b) => a.index - b.index).map((childShopPage) => {
                        return {
                            id: childShopPage.id,
                            title: childShopPage.title,
                            description: childShopPage.description,
                            
                            type: childShopPage.type,
                            
                            icon: childShopPage.icon ?? undefined,
                            header: childShopPage.header ?? shopPage.header ?? undefined,
                            teaser: childShopPage.teaser ?? shopPage.teaser ?? undefined,

                            index: childShopPage.index,
                        };
                    })
                };
            })
        }));
    }
}