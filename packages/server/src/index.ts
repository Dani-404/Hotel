import { WebSocketServer } from "ws";
import { eventHandler } from "./Events/EventHandler.js";
import User from "./Users/User.js";
import { UserModel } from "./Database/Models/Users/UserModel.js";
import { UserDataUpdated } from "@shared/WebSocket/Events/User/UserDataUpdated.js";
import OutgoingEvent from "./Events/Interfaces/OutgoingEvent.js";

import "./Users/Events/RequestUserData.js";
import "./Users/Inventory/Events/RequestUserFurnitureData.js";

import { initializeModels } from "./Database/Database.js";
import { initializeDevelopmentData } from "./Database/Development/DatabaseDevelopmentData.js";
import Game from "./Game.js";
import GetShopPagesEvent from "./Communication/Shop/GetShopPagesEvent.js";
import GetShopPageFurnitureEvent from "./Communication/Shop/GetShopPageFurnitureEvent.js";
import PurchaseShopFurnitureEvent from "./Communication/Shop/PurchaseShopFurnitureEvent.js";

await initializeModels();
await initializeDevelopmentData();

eventHandler.addListener("ClientPingEvent", (user: User) => {
	user.send(new OutgoingEvent<UserDataUpdated>("UserDataUpdated", {
        id: user.model.id,
		name: user.model.name,
		figureConfiguration: user.model.figureConfiguration
	}));
});

// TODO: clean up event handler types
eventHandler.addListener<any>("GetShopPagesEvent", async (user, event) => await new GetShopPagesEvent().handle(user, event));
eventHandler.addListener<any>("GetShopPageFurnitureEvent", async (user, event) => await new GetShopPageFurnitureEvent().handle(user, event));
eventHandler.addListener<any>("PurchaseShopFurnitureEvent", async (user, event) => await new PurchaseShopFurnitureEvent().handle(user, event));

export const game = new Game();

await game.loadModels();

const webSocketServer = new WebSocketServer({
    port: 7632
});

webSocketServer.on("connection", async (webSocket, request) => {
	if(!request.url) {
		console.warn("No url provided.");

        return webSocket.close();
	}

	const url = new URL(request.url, "http://localhost");

    const userId = url.searchParams.get("userId");

    if(!userId) {
		console.warn("No user id provided.");

        return webSocket.close();
    }

    const model = await UserModel.findByPk(userId);

    if(!model) {
		console.warn("User does not exist.");

        return webSocket.close();
    }

    const user = new User(webSocket, model);

    webSocket.on("error", console.error);

    webSocket.on("message", (rawData) => {
        eventHandler.decodeAndDispatchMessages(user, rawData);
    });

    webSocket.on("close", () => {
        user.emit("close", user);
    });
});
