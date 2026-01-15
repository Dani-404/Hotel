import { Model, NonAttribute } from "sequelize";
import { ShopPageFurniture } from "./ShopPageFurniture";

export class ShopPage extends Model {
    declare id: string;
    
    declare title: string;
    declare description: string;

    declare category: "frontpage" | "furniture" | "clothing" | "pets";
    declare type: "default";

    declare icon: string | null;
    declare header: string | null;
    
    declare children: NonAttribute<ShopPage[]>;
    declare furniture: NonAttribute<ShopPageFurniture[]>;
}
