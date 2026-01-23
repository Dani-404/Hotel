import { ShopPageData } from "@Shared/Communications/Responses/Shop/ShopPagesEventData";
import ShopDefaultPage from "./ShopDefaultPage";

export type ShopPageProps = {
    page: ShopPageData;
}

export default function ShopPage({ page }: ShopPageProps) {
    switch(page.type) {
        case "default":
            return <ShopDefaultPage key={page.id} page={page}/>
        
        default:
            return <div/>;
    }
}
