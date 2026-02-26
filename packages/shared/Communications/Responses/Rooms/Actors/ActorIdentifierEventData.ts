export type UserIdentifierEventData = {
    type: "user";
    
    userId: string;
};

export type BotIdentifierEventData = {
    type: "bot";
    
    botId: string;
};

export type ActorIdentifierEventData = UserIdentifierEventData | BotIdentifierEventData;
