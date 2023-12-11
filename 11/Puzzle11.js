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
 * Puzzle Solution Description: I didn't build an actual grid for this one which I beilieve helped me immensely in part 2.
 * Instead, I did it with the power of MATH by plotting where the galaxies would be on a graph and mathematically subtracting
 * their coordinates to get distance.
 */
function solve1() {
    var start = new Date().getTime();
    var file = Utils_1.parseFile("input.txt");
    var galaxies = [];
    var lineCount = 0;
    for (var _i = 0, file_1 = file; _i < file_1.length; _i++) {
        var line = file_1[_i];
        var data = __spreadArrays(line);
        for (var char in data) {
            if (data[char] == "#") {
                galaxies.push(new Galaxy(lineCount, parseInt(char)));
            }
        }
        lineCount++;
    }
    for (var i = file.length - 1; i > 0; i--) {
        if (!galaxyExistsByAttribute(i, "Row", galaxies)) {
            for (var _a = 0, galaxies_1 = galaxies; _a < galaxies_1.length; _a++) {
                var galaxy = galaxies_1[_a];
                if (galaxy.coord.row > i) {
                    galaxy.coord.row++;
                }
            }
        }
    }
    for (var i = file[0].length - 1; i > 0; i--) {
        if (!galaxyExistsByAttribute(i, "Col", galaxies)) {
            for (var _b = 0, galaxies_2 = galaxies; _b < galaxies_2.length; _b++) {
                var galaxy = galaxies_2[_b];
                if (galaxy.coord.column > i) {
                    galaxy.coord.column++;
                }
            }
        }
    }
    var total = 0;
    for (var _c = 0, galaxies_3 = galaxies; _c < galaxies_3.length; _c++) {
        var galaxy = galaxies_3[_c];
        for (var _d = 0, galaxies_4 = galaxies; _d < galaxies_4.length; _d++) {
            var otherGalaxy = galaxies_4[_d];
            total += Math.abs(galaxy.coord.row - otherGalaxy.coord.row);
            total += Math.abs(galaxy.coord.column - otherGalaxy.coord.column);
        }
    }
    console.log(total / 2);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
/**
 * Puzzle Solution Description: My solution to part 1 made part 2 trivial. I was already doing this in a way that
 * changing the number from 1 to 1000000 was just additional arithmatic. I did run into trouble where I failed to account
 * for the one empty row that actually existed and was adding a million and one rows in each spot instead but that was
 * quick to rememdy.
 */
function solve2() {
    var start = new Date().getTime();
    var file = Utils_1.parseFile("input.txt");
    var galaxies = [];
    var lineCount = 0;
    for (var _i = 0, file_2 = file; _i < file_2.length; _i++) {
        var line = file_2[_i];
        var data = __spreadArrays(line);
        for (var char in data) {
            if (data[char] == "#") {
                galaxies.push(new Galaxy(lineCount, parseInt(char)));
            }
        }
        lineCount++;
    }
    for (var i = file.length - 1; i > 0; i--) {
        if (!galaxyExistsByAttribute(i, "Row", galaxies)) {
            for (var _a = 0, galaxies_5 = galaxies; _a < galaxies_5.length; _a++) {
                var galaxy = galaxies_5[_a];
                if (galaxy.coord.row > i) {
                    galaxy.coord.row = galaxy.coord.row + 1000000 - 1;
                }
            }
        }
    }
    for (var i = file[0].length - 1; i > 0; i--) {
        if (!galaxyExistsByAttribute(i, "Col", galaxies)) {
            for (var _b = 0, galaxies_6 = galaxies; _b < galaxies_6.length; _b++) {
                var galaxy = galaxies_6[_b];
                if (galaxy.coord.column > i) {
                    galaxy.coord.column = galaxy.coord.column + 1000000 - 1;
                }
            }
        }
    }
    var total = 0;
    for (var _c = 0, galaxies_7 = galaxies; _c < galaxies_7.length; _c++) {
        var galaxy = galaxies_7[_c];
        for (var _d = 0, galaxies_8 = galaxies; _d < galaxies_8.length; _d++) {
            var otherGalaxy = galaxies_8[_d];
            total += Math.abs(galaxy.coord.row - otherGalaxy.coord.row);
            total += Math.abs(galaxy.coord.column - otherGalaxy.coord.column);
        }
    }
    console.log(total / 2);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
//HELPER FUNCTIONS
var Galaxy = /** @class */ (function () {
    function Galaxy(row, column) {
        this.coord = new Utils_1.Coord(row, column);
    }
    return Galaxy;
}());
function galaxyExistsByAttribute(num, type, galaxies) {
    if (type == "Row") {
        for (var _i = 0, galaxies_9 = galaxies; _i < galaxies_9.length; _i++) {
            var galaxy = galaxies_9[_i];
            if (galaxy.coord.row == num) {
                return true;
            }
        }
    }
    if (type == "Col") {
        for (var _a = 0, galaxies_10 = galaxies; _a < galaxies_10.length; _a++) {
            var galaxy = galaxies_10[_a];
            if (galaxy.coord.column == num) {
                return true;
            }
        }
    }
    return false;
}
solve1();
solve2();
