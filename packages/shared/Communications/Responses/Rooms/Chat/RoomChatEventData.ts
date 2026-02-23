export type RoomChatEventData = {
    message: string;
    roomChatStyleId: string;
} & ({
    type: "user";
    userId: string;
} | {
    type: "bot";
    botId: string;
});
