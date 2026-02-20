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
        height?: number;
    }

    floor: {
        id: string;
        thickness: number;
    }
};
