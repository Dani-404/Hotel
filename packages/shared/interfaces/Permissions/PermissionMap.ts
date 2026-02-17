export type ShopPermissions = 
    "shop:edit";

export type FeedbackPermissions =
    "feedback:read";

export type RoomPermissions =
    "room:export_furniture"
    | "room:import_furniture"
    | "room:type";

export type PermissionAction =
    ShopPermissions
    | FeedbackPermissions
    | RoomPermissions;
