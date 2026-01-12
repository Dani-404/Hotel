export type RoomFurnitureData = {
    id: string;
    type: string;
    position: {
        row: number;
        column: number;
        depth: number;
    };
    direction: number;
    animation: number;
    color: number;
};
