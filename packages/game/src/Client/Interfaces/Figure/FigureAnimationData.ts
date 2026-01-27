export type FigureAnimationData = {
    sprites: {
        id: string;
        member: string;
        directions?: {
            id: number;
            destinationZ: number;
        }[];
    }[];

    frames: {
        bodyParts: {
            id: string;
            action: string;
            frame: number;

            destinationY?: number;
        }[];

        effects: {
            id: string;
            action: string;
            frame: number;

            destinationY?: number;
        }[];
    }[];
};
