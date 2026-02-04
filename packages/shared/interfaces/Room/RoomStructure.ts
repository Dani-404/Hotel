export type RoomStructure = {
    grid: string[];

    door?: {
        row: number;
        column: number;
        direction: number;
    };

    wall: {
        id: string;
        thickness: number;
        hidden: boolean;
    }

    floor: {
        id: string;
        thickness: number;
    }
};
