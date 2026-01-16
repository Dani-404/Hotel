export type RoomRendererOptions = {
    setFurniture: (type: string, size: number, direction: number | undefined, animation: number, color: number) => Promise<void>,
    progressFurnitureAnimation: () => void,
    terminate: () => void
};

export default class CreateRoomRendererEvent extends Event {
    constructor(
        public readonly element: HTMLDivElement,
        public readonly resolve: (options: RoomRendererOptions) => void
    ) {
        super("CreateRoomRendererEvent");
    }
}
