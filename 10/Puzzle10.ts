import {parseFile, Coord} from "../utilities/Utils"

/**
 * Puzzle Solution Description:
 */
function solve1() {
    const start: number = new Date().getTime();
    const file: string[] = parseFile("input.txt");
    let grid: Grid = new Grid();
    for(const line of file) {
        grid.add([...line]);
    }
    let workingNode: Node | undefined = grid.getStartingNode();
    let backAtTheStart: boolean = false;
    let count: number = 0;
    if(workingNode !== undefined) {
        while(!backAtTheStart) {
            // console.log(workingNode?.character + " - (" + workingNode?.coord.row + ", " + workingNode?.coord.column + ")" )
            workingNode = grid.makeMove(workingNode);
            count++;
            if(workingNode?.startingPoint) {
                backAtTheStart = true;
            }
        }
    }
    console.log(count / 2);
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

/**
 * Puzzle Solution Description:
 */
function solve2() {
    const start: number = new Date().getTime();
    const file: string[] = parseFile("sample.txt");
//Do everything in part 1
//Get all the verticies
//Cross multiply the verticies x1 y2 - x2 y1 + x2 y3 - y2 y3 + ... xn y1 - yn x1 / 2 for area
//subtract the count from the area to get those trapped inside
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

//HELPER FUNCTIONS
class Node {
    north: boolean = false;
    south: boolean = false;
    east: boolean = false;
    west: boolean = false;
    startingPoint = false;
    coord: Coord;
    character: string;

    constructor(character: string, coord: Coord) {
        this.character = character;
        this.coord = coord;
        switch(character) {
            case "|":
                this.north=true;
                this.south = true;
                break;
            case "-":
                this.east = true;
                this.west = true;
                break;
            case "F":
                this.south = true;
                this.east = true;
                break;
            case "J":
                this.west = true;
                this.north = true;
                break;
            case "L":
                this.north = true;
                this.east = true;
                break;
            case "7":
                this.west = true;
                this.south = true;
                break;
            case "S":
                this.startingPoint = true;
                break;
        }
    }
}

class Grid {
    grid: Node[][];
    startingPoint: Node | undefined;
    previousDirection: string;

    constructor() {
        this.grid = [];
        this.startingPoint = undefined;
        this.previousDirection = "start";
    }

    add(input: string[]) {
        let row: Node[] = [];
        const numOfRows = this.grid.length;
        for(const char in input) {
            const node: Node = new Node(input[char], new Coord(numOfRows, parseInt(char)))
            row.push(node);
            if(input[char] == "S") {
                this.startingPoint = node;
            }
        }
        this.grid.push(row);
    }

    getStartingNode() {
        if(this.startingPoint !== undefined) {
            if(this.grid[this.startingPoint.coord.row - 1][this.startingPoint.coord.column] !== undefined && this.grid[this.startingPoint.coord.row - 1][this.startingPoint.coord.column].south) {
                this.startingPoint.north = true;
            }
            if(this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column - 1] !== undefined && this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column - 1].east) {
                this.startingPoint.west = true;
            }
            if(!this.startingPoint.north && !this.startingPoint.west) {
                this.startingPoint.east = true;
                this.startingPoint.south = true;
            }
        }
        return this.startingPoint;
    }

    makeMove(node: Node | undefined): Node | undefined {
        if(node !== undefined) {
            if(this.previousDirection !== "North" && node.north) {
                this.previousDirection = "South"
                return this.grid[node.coord.row - 1][node.coord.column]
            }
            if(this.previousDirection !== "South" && node.south) {
                this.previousDirection = "North"
                return this.grid[node.coord.row + 1][node.coord.column]
            }
            if(this.previousDirection !== "East" && node.east) {
                this.previousDirection = "West"
                return this.grid[node.coord.row][node.coord.column + 1]
            }
            if(this.previousDirection !== "West" && node.west) {
                this.previousDirection = "East"
                return this.grid[node.coord.row][node.coord.column - 1]
            }
        }
        return undefined;
    }
}


solve1();
//solve2();