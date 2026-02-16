export type NavigatorRoomsEventData = {
    title: string;
    rooms: {
        id: string;
        name: string;
        users: number;
        thumbnail: string | null;
        maxUsers: number;
    }[];
}[];
