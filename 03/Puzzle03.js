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
//GLOBAL VARIABLES
var EngineMap = /** @class */ (function () {
    function EngineMap() {
        this.schematic = [];
    }
    EngineMap.prototype.addRow = function () {
        this.schematic.push([]);
    };
    EngineMap.prototype.addEntry = function (coord, val) {
        this.schematic[coord.row][coord.column] = val;
    };
    EngineMap.prototype.getRange = function (startingCoord, length) {
        if (startingCoord.row < 0) {
            return [];
        }
        if (startingCoord.column < 0 && length == 1) {
            return [];
        }
        if (startingCoord.row > this.schematic.length - 1) {
            return [];
        }
        if (startingCoord.column >= this.schematic[startingCoord.row].length) {
            return [];
        }
        if (startingCoord.column + length > this.schematic[startingCoord.row].length) {
            length--;
        }
        if (startingCoord.column < 0) {
            length--;
            startingCoord.column = 0;
        }
        var outputArray = [];
        for (var i = startingCoord.column; i < startingCoord.column + length; i++) {
            outputArray.push(this.schematic[startingCoord.row][i]);
        }
        return outputArray;
    };
    return EngineMap;
}());
var map = new EngineMap();
var entries = [];
var gears = [];
/**
 * Puzzle Solution Description:
 */
function solve1() {
    setup();
    var outputTotal = 0;
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        if (entry.shouldBeCounted) {
            console.log("Adding value " + entry.value + " from entry " + entry.startingCoord.row + ", " + entry.startingCoord.column + " - " + entry.numArray);
            outputTotal += entry.value;
        }
    }
    console.log("Final Output: " + outputTotal);
}
/**
 * Puzzle Solution Description:
 */
function solve2() {
    setup();
    var outputTotal = 0;
    for (var row in map.schematic) {
        parseForGear(map.schematic[row], parseInt(row));
    }
    for (var _i = 0, gears_1 = gears; _i < gears_1.length; _i++) {
        var gear = gears_1[_i];
        if (gear.countGearRatio) {
            outputTotal += gear.gearRatio;
        }
    }
    console.log("Final Output: " + outputTotal);
}
//HELPER FUNCTIONS
var Entry = /** @class */ (function () {
    function Entry(num, startingCoord, endingCoord) {
        this.numArray = __spreadArrays(num);
        this.startingCoord = startingCoord;
        this.endingCoord = endingCoord;
        this.length = this.numArray.length;
        this.value = this.parseValue(this.numArray);
        this.shouldBeCounted = this.parseSurroundings(this.startingCoord, this.length);
    }
    Entry.prototype.parseSurroundings = function (coord, length) {
        var symbolFound = false;
        if (coord.row == 0) {
            if (coord.column == 0) {
            }
        }
        var aboveCoord = new Coord(coord.row - 1, coord.column - 1);
        var leftCoord = new Coord(coord.row, coord.column - 1);
        var rightCoord = new Coord(coord.row, coord.column + length);
        var belowCoord = new Coord(coord.row + 1, coord.column - 1);
        var aboveRow = map.getRange(aboveCoord, length + 2);
        var leftEntry = map.getRange(leftCoord, 1);
        var rightEntry = map.getRange(rightCoord, 1);
        var belowRow = map.getRange(belowCoord, length + 2);
        if (symbolFound == false) {
            symbolFound = this.checkForSymbol(aboveRow);
        }
        ;
        if (symbolFound == false) {
            symbolFound = this.checkForSymbol(leftEntry);
        }
        ;
        if (symbolFound == false) {
            symbolFound = this.checkForSymbol(rightEntry);
        }
        ;
        if (symbolFound == false) {
            symbolFound = this.checkForSymbol(belowRow);
        }
        ;
        return symbolFound;
    };
    Entry.prototype.checkForSymbol = function (input) {
        var symbolFound = false;
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var char = input_1[_i];
            if (char !== '.' && isNaN(parseInt(char))) {
                symbolFound = true;
            }
        }
        return symbolFound;
    };
    Entry.prototype.parseValue = function (input) {
        var stringValue = "";
        for (var char in input) {
            stringValue += input[char];
        }
        return parseInt(stringValue);
    };
    Entry.prototype.equals = function (other) {
        return other.startingCoord.equals(this.startingCoord) && other.endingCoord.equals(this.endingCoord);
    };
    Entry.prototype.containsCoord = function (otherCoords) {
        return (otherCoords.row == this.startingCoord.row &&
            this.startingCoord.column <= otherCoords.column &&
            this.endingCoord.column >= otherCoords.column);
    };
    return Entry;
}());
var Gear = /** @class */ (function () {
    function Gear(coord) {
        this.entryContainer = [];
        this.coord = coord;
        this.countGearRatio = this.parseGear(coord);
        if (this.countGearRatio) {
            this.gearRatio = this.calculateGearRatio();
        }
        else {
            this.gearRatio = 0;
        }
    }
    Gear.prototype.parseGear = function (coord) {
        var coordsContainer = [];
        var aboveCoord = new Coord(coord.row - 1, coord.column - 1);
        var middleCoord = new Coord(coord.row, coord.column - 1);
        var belowCoord = new Coord(coord.row + 1, coord.column - 1);
        var aboveRow = map.getRange(aboveCoord, 3);
        var middleRow = map.getRange(middleCoord, 3);
        var belowRow = map.getRange(belowCoord, 3);
        this.getNumbers(coordsContainer, aboveRow, aboveCoord);
        this.getNumbers(coordsContainer, middleRow, middleCoord);
        this.getNumbers(coordsContainer, belowRow, belowCoord);
        for (var _i = 0, coordsContainer_1 = coordsContainer; _i < coordsContainer_1.length; _i++) {
            var coord_1 = coordsContainer_1[_i];
            var entryFound = false;
            for (var _a = 0, _b = this.entryContainer; _a < _b.length; _a++) {
                var entry = _b[_a];
                if (entry.containsCoord(coord_1)) {
                    entryFound = true;
                }
            }
            if (!entryFound) {
                for (var _c = 0, entries_2 = entries; _c < entries_2.length; _c++) {
                    var entry = entries_2[_c];
                    if (entry.containsCoord(coord_1)) {
                        this.entryContainer.push(entry);
                    }
                }
            }
        }
        return this.entryContainer.length == 2;
    };
    Gear.prototype.calculateGearRatio = function () {
        return this.entryContainer[0].value * this.entryContainer[1].value;
    };
    Gear.prototype.getNumbers = function (coordsContainer, input, coord) {
        for (var char in input) {
            if (!isNaN(parseInt(input[char]))) {
                coordsContainer.push(new Coord(coord.row, coord.column + parseInt(char)));
            }
        }
    };
    Gear.prototype.equals = function (other) {
        return this.coord.equals(other.coord);
    };
    return Gear;
}());
var Coord = /** @class */ (function () {
    function Coord(row, col) {
        this.row = row;
        this.column = col;
    }
    Coord.prototype.equals = function (other) {
        return (this.row == other.row && this.column == other.column);
    };
    return Coord;
}());
function setup() {
    var lineCount = 0;
    var file = Utils_1.parseFile("input.txt");
    for (var _i = 0, file_1 = file; _i < file_1.length; _i++) {
        var line = file_1[_i];
        map.addRow();
        parseLine(__spreadArrays(line), lineCount);
        lineCount++;
    }
    for (var row in map.schematic) {
        findEntries(map.schematic[row], parseInt(row));
    }
}
function findEntries(input, row) {
    var inNumber = false;
    var currentNumberString = "";
    var currentLength = 0;
    var startingCol = 0;
    var endingCol = 0;
    for (var char in input) {
        if (!isNaN(parseInt(input[char]))) {
            if (!inNumber) {
                inNumber = true;
                startingCol = parseInt(char);
                currentNumberString += input[char];
                currentLength++;
            }
            else {
                currentNumberString += input[char];
                currentLength++;
            }
            if (parseInt(char) == input.length - 1) {
                endingCol = parseInt(char);
                var newEntry = new Entry(currentNumberString, new Coord(row, startingCol), new Coord(row, endingCol));
                entries.push(newEntry);
            }
        }
        else {
            if (inNumber) {
                inNumber = false;
                endingCol = parseInt(char) - 1;
                var newEntry = new Entry(currentNumberString, new Coord(row, startingCol), new Coord(row, endingCol));
                entries.push(newEntry);
                currentLength = 0;
                currentNumberString = "";
                startingCol = 0;
                endingCol = 0;
            }
        }
    }
}
function parseLine(input, row) {
    input.forEach(function (entry, i) {
        map.addEntry(new Coord(row, i), entry);
    });
}
function parseForGear(input, row) {
    for (var char in input) {
        if (input[char] == '*') {
            gears.push(new Gear(new Coord(row, parseInt(char))));
        }
    }
}
// solve1();
solve2();
