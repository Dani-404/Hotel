export type GetNavigatorRoomsEventData = {
    type: "category";
    category: string;
} | {
    type: "search";
    search: string;
};
