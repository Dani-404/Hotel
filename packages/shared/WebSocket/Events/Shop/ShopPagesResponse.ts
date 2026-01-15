export type ShopPageData = {
    id: string;
    
    title: string;
    description?: string;

    type: "default";
    
    icon?: string | undefined;
    header?: string | undefined;

    children?: Omit<ShopPageData, "children">[];
};

export type ShopPagesResponse = {
    category: "frontpage" | "furniture" | "clothing" | "pets";
    pages: ShopPageData[];
};
