export type ShopPageData = {
    id: string;
    
    title: string;
    description?: string;

    type: "default" | "none";
    
    icon?: string | undefined;
    header?: string | undefined;
    teaser?: string | undefined;

    children?: Omit<ShopPageData, "children">[];
};

export type ShopPagesEventData = {
    category: "frontpage" | "furniture" | "clothing" | "pets";
    pages: ShopPageData[];
};
