import { UserFurnitureData } from "../../../Interfaces/User/UserFurnitureData.js";

export type UserFurnitureEventData = {
    allUserFurniture?: UserFurnitureData[];
    updatedUserFurniture?: UserFurnitureData[];
    deletedUserFurniture?: Omit<UserFurnitureData, "quantity">[];
};
