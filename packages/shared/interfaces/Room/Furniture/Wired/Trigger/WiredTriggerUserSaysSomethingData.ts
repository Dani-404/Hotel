export type WiredTriggerUserSaysSomethingData = {
    type: "keyword" | "match" | "match_all";
    message: string;
    hideMessage: boolean;
    onlyRoomOwner: boolean;
};
