import { RoomPattern } from "@/Interfaces/RoomPattern.js";
import ContextNotAvailableError from "../../Exceptions/ContextNotAvailableError.js";
import { RoomStructure } from "../../Interfaces/RoomStructure.js";

type FloorRectangle = {
    row: number;
    column: number;
    depth: number;

    width: number;
    height: number;
};

type FloorTile = {
    row: number;
    column: number;
    depth: number;

    path: Path2D;
};

export default class FloorRenderer {
    public tiles: FloorTile[] = [];

    public rows: number;
    public columns: number;
    public depth: number;

    constructor(public readonly structure: RoomStructure, private readonly patterns: RoomPattern) {
        this.rows = this.structure.grid.length;
        this.columns = Math.max(...this.structure.grid.map((row) => row.length));
        this.depth = 0;

        for(let row in this.structure.grid) {
            for(let column of this.structure.grid[row]) {
                if(column === 'X') {
                    continue;
                }

                if(this.depth > parseInt(column)) {
                    continue;
                }

                this.depth = parseInt(column);
            }
        }
    }

    public renderOffScreen() {
        const width = (this.rows * 32) + (this.columns * 32) + (this.structure.wall.thickness * 2);
        const height = (this.rows * 16) + (this.columns * 16) + this.structure.floor.thickness + (this.depth * 16) + 10;

        const canvas = new OffscreenCanvas(width, height);

        const context = canvas.getContext("2d");

        if(!context) {
            throw new ContextNotAvailableError();
        }

        const rectangles = this.getRectangles();

        this.tiles = [];

        for(let currentDepth = 0; currentDepth <= this.depth; currentDepth++) {
            const currentRectangles = rectangles.filter((rectangle) => Math.ceil(rectangle.depth) === currentDepth);

            this.renderLeftEdges(context, currentRectangles);
            this.renderRightEdges(context, currentRectangles);
            this.renderTiles(context, currentRectangles);
        }

        return canvas;
    }

    private renderLeftEdges(context: OffscreenCanvasRenderingContext2D, rectangles: FloorRectangle[]) {
        context.beginPath();

        context.setTransform(1, .5, 0, 1, this.structure.wall.thickness + this.rows * 32, this.depth * 16);
                
        context.fillStyle = this.patterns.left;

        for(let index in rectangles) {
            const rectangle = rectangles[index];

            if(rectangles.find(x => (x.row == rectangle.row + 1 && x.column == rectangle.column && x.depth == rectangle.depth)) != null)
                continue;

            const left = (rectangle.column * 32) - (rectangle.row * 32) - rectangle.height;
            const top = (rectangle.row * 32) - (rectangle.depth * 32) + rectangle.height;

            context.rect(left, top, rectangle.width, this.structure.floor.thickness);
        }

        context.fill();
    }

    private renderRightEdges(context: OffscreenCanvasRenderingContext2D, rectangles: FloorRectangle[]) {
        context.beginPath();

        context.setTransform(1, -.5, 0, 1, this.structure.wall.thickness + this.rows * 32, this.depth * 16);
                
        context.fillStyle = this.patterns.right;

        for(let index in rectangles) {
            const rectangle = rectangles[index];

            if(rectangles.find(x => (x.row == rectangle.row && x.column == rectangle.column + 1 && x.depth == rectangle.depth)) != null)
                continue;

            const row = rectangle.row;

            const column = rectangle.column;

            const left = -(row * 32) + (column * 32) + rectangle.width - rectangle.height;
            const top = (column * 32) - (rectangle.depth * 32) + rectangle.width;

            context.rect(left, top, rectangle.height, this.structure.floor.thickness);
        }

        context.fill();
    }

    private renderTiles(context: OffscreenCanvasRenderingContext2D, rectangles: FloorRectangle[]) {
        context.beginPath();

        context.setTransform(1, .5, -1, .5, this.structure.wall.thickness + this.rows * 32, this.depth * 16);
                
        const tiles = new Path2D();

        for(let index in rectangles) {
            const rectangle = rectangles[index];

            const left = rectangle.column * 32 - (rectangle.depth * 32);
            const top = rectangle.row * 32 - (rectangle.depth * 32);

            const path = new Path2D();

            path.rect(left, top, rectangle.width, rectangle.height);

            this.tiles.push({ row: rectangle.row, column: rectangle.column, depth: rectangle.depth, path });
            
            tiles.addPath(path);
        }

        context.fillStyle = this.patterns.tile;

        context.fill(tiles);
    }

    private getRectangles() {
        const rectangles: FloorRectangle[] = [];

        for(let row = 0; row < this.structure.grid.length; row++) {
            for(let column = 0; column < this.structure.grid[row].length; column++) {
                if(this.structure.grid[row][column] === 'X') {
                    continue;
                }

                if(parseInt(this.getTileDepth(row, column - 1)) === parseInt(this.getTileDepth(row, column)) + 1) {
                    for(let step = 0; step < 4; step++) {
                        rectangles.push({
                            row,
                            column: column + (step * .25),
                            depth: parseInt(this.getTileDepth(row, column)) + 0.75 - (step * .25),
        
                            width: 8, height: 32
                        });
                    }

                    continue;
                }

                if(parseInt(this.getTileDepth(row - 1, column)) === parseInt(this.getTileDepth(row, column)) + 1) {
                    for(let step = 0; step < 4; step++) {
                        rectangles.push({
                            row: row + (step * .25),
                            column,
                            depth: parseInt(this.getTileDepth(row, column)) + 0.75 - (step * .25),
        
                            width: 32, height: 8
                        });
                    }

                    continue;
                }

                rectangles.push({
                    row,
                    column,
                    depth: parseInt(this.structure.grid[row][column]),

                    width: 32,
                    height: 32
                });
            }
        }

        return rectangles;
    }

    private getTileDepth(row: number, column: number): string {
        if(this.structure.grid[row] && this.structure.grid[row][column]) {
            return this.structure.grid[row][column];
        }
   
        return 'X';
    }
}