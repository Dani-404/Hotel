import { clientInstance } from "../../..";
import ProtobuffListener from "@Client/Communications/ProtobuffListener";
import { UserData } from "@pixel63/events";

export default class UserEvent implements ProtobuffListener<UserData> {
    public readonly name: string = "UserData";
    public readonly message = UserData;

    async handle(payload: UserData) {
        clientInstance.user.value = payload;
    }
}
