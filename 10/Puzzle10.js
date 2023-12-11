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
    var start = new Date().getTime();
    var file = Utils_1.parseFile("sample2.txt");
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
    return Node;
}());
var Grid = /** @class */ (function () {
    function Grid() {
        this.grid = [];
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
            }
        }
        this.grid.push(row);
    };
    Grid.prototype.getStartingNode = function () {
        if (this.startingPoint !== undefined) {
            if (this.grid[this.startingPoint.coord.row - 1][this.startingPoint.coord.column] !== undefined && this.grid[this.startingPoint.coord.row - 1][this.startingPoint.coord.column].south) {
                this.startingPoint.north = true;
            }
            if (this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column - 1] !== undefined && this.grid[this.startingPoint.coord.row][this.startingPoint.coord.column - 1].east) {
                this.startingPoint.west = true;
            }
            if (!this.startingPoint.north && !this.startingPoint.west) {
                this.startingPoint.east = true;
                this.startingPoint.south = true;
            }
        }
        return this.startingPoint;
    };
    Grid.prototype.makeMove = function (node) {
        if (node !== undefined) {
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
solve1();
//solve2();
