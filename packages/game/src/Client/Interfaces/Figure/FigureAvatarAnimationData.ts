export type FigureAvatarAnimationData = {
    actions: {
        id: string;

        parts: {
            setType: string;
            frames: {
                number: number;
                assetPartDefinition: string;
                repeats: number | undefined;
            }[];
        }[];

        offsets: {
            frame: number;

            directions: {
                id: number;

                bodypart: {
                    id: string;

                    destinationX: number | undefined;
                    destinationY: number | undefined;
                };
            }[];
        }[];
    }[];
};
