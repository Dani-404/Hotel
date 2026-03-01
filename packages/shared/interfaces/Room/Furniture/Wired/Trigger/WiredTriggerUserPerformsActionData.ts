export const wiredTriggerUserPerformsActions = ["Wave", "Blow", "Laugh", "Thumbs up", "Awake", "Idle", "Sit", "Stand", "Lay", "Sign", "Dance"];

export type WiredTriggerUserPerformsActionData = {
    action: (typeof wiredTriggerUserPerformsActions)[number];
    filter?: boolean;
    filterId?: number;
};
