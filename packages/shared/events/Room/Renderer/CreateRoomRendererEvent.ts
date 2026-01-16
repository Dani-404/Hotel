export type RoomRendererProperties = {
    withoutWalls?: boolean;
};

export type RoomRendererResult = {
    setFurniture: (type: string, size: number, direction: number | undefined, animation: number, color: number) => Promise<void>,
    progressFurnitureAnimation: () => void,
    terminate: () => void
};

export default class CreateRoomRendererEvent extends Event {
    constructor(
        public readonly element: HTMLDivElement,
        public readonly options: RoomRendererProperties,
        public readonly resolve: (result: RoomRendererResult) => void
    ) {
        super("CreateRoomRendererEvent");
    }
}
