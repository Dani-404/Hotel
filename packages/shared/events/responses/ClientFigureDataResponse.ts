type Item = {
    image: Promise<ImageBitmap>;
    setId: string;
    colorable: boolean;
};

type Color = {
    id: number;
    color?: string;
};

export default class ClientFigureDataResponse extends Event {
    constructor(
        public readonly id: number,
        public readonly items: Item[],
        public readonly colors: Color[],
        public readonly mandatory: boolean
    ) {
        super("ClientFigureDataResponse");
    }
}
