import {parseFile, Coord} from "../utilities/Utils"

/**
 * Puzzle Solution Description: This is a full on grid build. Build out the pipe objects, fill them in
 * the puzzle. Follow the path using the node's boolean values. It's ugly but it's also very cool.
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
 * Puzzle Solution Description: This took me for ever to figure out. I tried to do it mathy using 
 * the shoelace theorm but my number just weren't lining up correctly. So instead I devised this method.
 * Line by line we determine if we are in the shape or out of it by the pipes and their configurations
 * and count the spaces inside. It feels a little hacky but it got me where I was going. Hooray!
 */
function solve2() {
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
            workingNode = grid.makeMove(workingNode);
            count++;
            if(workingNode?.startingPoint) {
                backAtTheStart = true;
            }
        }
    }
    let loopCounter: number = 0;
    let inLoop: boolean = false;
    let northLoop: boolean = false;
    let southLoop: boolean = false;
    for(const row of grid.grid) {
        for(const col of row) {
            if(col.inLoop && col.north && col.south) {
                inLoop = !inLoop
            } else if(inLoop && !col.inLoop) {
                loopCounter++;
            } else if(col.inLoop && col.north && !col.south) {
                if(southLoop) {
                    southLoop = false;
                    inLoop = !inLoop;
                } else {
                    northLoop = !northLoop;
                }
            } else if(col.inLoop && col.south && !col.north) {
                if(northLoop) {
                    northLoop = false;
                    inLoop = !inLoop;
                } else {
                    southLoop = !southLoop;
                }
            }
        }
    }
    console.log(loopCounter)
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

//HELPER FUNCTIONS
class Node {
    north: boolean = false;
    south: boolean = false;
    east: boolean = false;
    west: boolean = false;
    startingPoint: boolean = false;
    inLoop: boolean = false;
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

    toString() {
        return "North: " + this.north + ", South: " + this.south + ", East: " + this.east + ", West: " + this.west + ", In Loop: " + this.inLoop + ", coords: " + this.coord.row + ", " + this.coord.column 
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
                node.inLoop = true;
            }
        }
        this.grid.push(row);
    }

    getStartingNode(): Node | undefined{
        if(this.startingPoint !== undefined) {
            if(this.grid[this.startingPoint.coord.row - 1] !== undefined && this.grid[this.startingPoint.coord.row - 1][this.startingPoint.coord.column].south) {
                this.startingPoint.north = true;
            }
            if(this.grid[this.startingPoint.coord.row + 1] !== undefined && this.grid[this.startingPoint.coord.row + 1][this.startingPoint.coord.column].north) {
                this.startingPoint.south = true;
            }
            if(this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column - 1] !== undefined && this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column - 1].east) {
                this.startingPoint.west = true;
            }
            if(this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column + 1] !== undefined && this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column + 1].west) {
                this.startingPoint.east = true;
            }
        }
        return this.startingPoint;
    }

    makeMove(node: Node | undefined): Node | undefined {
        if(node !== undefined) {
            node.inLoop = true;
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
solve2();