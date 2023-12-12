"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Utils_1 = require("../utilities/Utils");
/**
 * Puzzle Solution Description:
 */
function solve1() {
    var start = new Date().getTime();
    var file = Utils_1.parseFile("input.txt");
    var grid = new Grid();
    for (var _i = 0, file_1 = file; _i < file_1.length; _i++) {
        var line = file_1[_i];
        grid.add(__spreadArrays(line));
    }
    var workingNode = grid.getStartingNode();
    var backAtTheStart = false;
    var count = 0;
    if (workingNode !== undefined) {
        while (!backAtTheStart) {
            // console.log(workingNode?.character + " - (" + workingNode?.coord.row + ", " + workingNode?.coord.column + ")" )
            workingNode = grid.makeMove(workingNode);
            count++;
            if (workingNode === null || workingNode === void 0 ? void 0 : workingNode.startingPoint) {
                backAtTheStart = true;
            }
        }
    }
    console.log(count / 2);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
/**
 * Puzzle Solution Description:
 */
function solve2() {
    var _a;
    var start = new Date().getTime();
    var file = Utils_1.parseFile("input.txt");
    //Do everything in part 1
    var grid = new Grid();
    for (var _i = 0, file_2 = file; _i < file_2.length; _i++) {
        var line = file_2[_i];
        grid.add(__spreadArrays(line));
    }
    var workingNode = grid.getStartingNode();
    var backAtTheStart = false;
    var count = 0;
    if (workingNode !== undefined) {
        while (!backAtTheStart) {
            // console.log(workingNode?.character + " - (" + workingNode?.coord.row + ", " + workingNode?.coord.column + ")" )
            workingNode = grid.makeMove(workingNode);
            count++;
            if (workingNode === null || workingNode === void 0 ? void 0 : workingNode.startingPoint) {
                backAtTheStart = true;
            }
        }
    }
    // //Get all the verticies
    //     const verticies: Node[] = grid.verticies;
    //     console.log(verticies)
    //     console.log(grid.grid[1][1])
    // //Cross multiply the verticies x1 y2 - x2 y1 + x2 y3 - y2 y3 + ... xn y1 - yn x1 / 2 for area
    //     let area = 0;
    //     for(let i = 0; i < verticies.length; i++) {
    //         if(i == verticies.length - 1) {
    //             area += ((verticies[i].coord.row * verticies[0].coord.column) - (verticies[i].coord.column * verticies[0].coord.column));
    //         } else {
    //             area += ((verticies[i].coord.row * verticies[i + 1].coord.column) - (verticies[i].coord.column * verticies[i + 1].coord.column));
    //         }
    //     }
    //     console.log(Math.abs(area))
    //     area = Math.abs(area);
    // //subtract the count from the area to get those trapped inside
    // console.log(count)
    //     console.log(area - count);
    // Instead, let's mark every pipe we go in as part of the loop. Then we'll look for vertical pipes and toggle a boolean
    var loopCounter = 0;
    var inLoop = false;
    var northLoop = false;
    var southLoop = false;
    console.log((_a = grid.getStartingNode()) === null || _a === void 0 ? void 0 : _a.toString());
    for (var _b = 0, _c = grid.grid; _b < _c.length; _b++) {
        var row = _c[_b];
        for (var _d = 0, row_1 = row; _d < row_1.length; _d++) {
            var col = row_1[_d];
            console.log(col.toString());
            if (col.inLoop && col.north && col.south) {
                inLoop = !inLoop;
            }
            else if (inLoop && !col.inLoop) {
                // console.log(col.coord.toString())
                loopCounter++;
            }
            else if (col.inLoop && col.north && !col.south) {
                console.log("Found a north bend");
                if (southLoop) {
                    console.log("Closing south loop");
                    southLoop = false;
                    inLoop = !inLoop;
                }
                else {
                    northLoop = !northLoop;
                }
            }
            else if (col.inLoop && col.south && !col.north) {
                console.log("Found a south bend");
                if (northLoop) {
                    console.log("Closing north loop");
                    northLoop = false;
                    inLoop = !inLoop;
                }
                else {
                    southLoop = !southLoop;
                }
            }
        }
    }
    console.log(loopCounter);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
//HELPER FUNCTIONS
var Node = /** @class */ (function () {
    function Node(character, coord) {
        this.north = false;
        this.south = false;
        this.east = false;
        this.west = false;
        this.startingPoint = false;
        this.inLoop = false;
        this.character = character;
        this.coord = coord;
        switch (character) {
            case "|":
                this.north = true;
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
    Node.prototype.toString = function () {
        return "North: " + this.north + ", South: " + this.south + ", East: " + this.east + ", West: " + this.west + ", In Loop: " + this.inLoop + ", coords: " + this.coord.row + ", " + this.coord.column;
    };
    return Node;
}());
var Grid = /** @class */ (function () {
    function Grid() {
        this.grid = [];
        // this.verticies = [];
        this.startingPoint = undefined;
        this.previousDirection = "start";
    }
    Grid.prototype.add = function (input) {
        var row = [];
        var numOfRows = this.grid.length;
        for (var char in input) {
            var node = new Node(input[char], new Utils_1.Coord(numOfRows, parseInt(char)));
            row.push(node);
            if (input[char] == "S") {
                this.startingPoint = node;
                node.inLoop = true;
            }
        }
        this.grid.push(row);
    };
    Grid.prototype.getStartingNode = function () {
        if (this.startingPoint !== undefined) {
            if (this.grid[this.startingPoint.coord.row - 1] !== undefined && this.grid[this.startingPoint.coord.row - 1][this.startingPoint.coord.column].south) {
                this.startingPoint.north = true;
            }
            if (this.grid[this.startingPoint.coord.row + 1] !== undefined && this.grid[this.startingPoint.coord.row + 1][this.startingPoint.coord.column].north) {
                this.startingPoint.south = true;
            }
            if (this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column - 1] !== undefined && this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column - 1].east) {
                this.startingPoint.west = true;
            }
            if (this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column + 1] !== undefined && this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column + 1].west) {
                this.startingPoint.east = true;
            }
            // if((this.startingPoint.north && this.startingPoint.east)|| (this.startingPoint.north && this.startingPoint.west) || (this.startingPoint.south && this.startingPoint.east) || (this.startingPoint.south && this.startingPoint.west)) {
            //     this.verticies.push(this.startingPoint)
            // }
        }
        return this.startingPoint;
    };
    Grid.prototype.makeMove = function (node) {
        if (node !== undefined) {
            // if((this.previousDirection === "North" || this.previousDirection === "South") && (node.east || node.west)) {
            //     this.verticies.push(node);
            // }
            // if((this.previousDirection === "East" || this.previousDirection === "West") && (node.north || node.south)) {
            //     this.verticies.push(node);
            // }
            node.inLoop = true;
            if (this.previousDirection !== "North" && node.north) {
                this.previousDirection = "South";
                return this.grid[node.coord.row - 1][node.coord.column];
            }
            if (this.previousDirection !== "South" && node.south) {
                this.previousDirection = "North";
                return this.grid[node.coord.row + 1][node.coord.column];
            }
            if (this.previousDirection !== "East" && node.east) {
                this.previousDirection = "West";
                return this.grid[node.coord.row][node.coord.column + 1];
            }
            if (this.previousDirection !== "West" && node.west) {
                this.previousDirection = "East";
                return this.grid[node.coord.row][node.coord.column - 1];
            }
        }
        return undefined;
    };
    return Grid;
}());
// solve1();
solve2();
