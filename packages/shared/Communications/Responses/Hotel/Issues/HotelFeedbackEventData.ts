export enum HotelFeedbackStatus {
    CREATED = 0,
};

export type HotelFeedbackEventData = {
    id: string;
    user: {
        id: string;
        name: string;
    };
    area: string | null;
    description: string;
    status: HotelFeedbackStatus;
}[];
