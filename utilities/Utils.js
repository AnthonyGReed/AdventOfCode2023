"use strict";
exports.__esModule = true;
var fs = require("fs");
function parseFile(filename) {
    try {
        // Read the content of the file synchronously
        var fileContent = fs.readFileSync("./sourceFiles/" + filename, 'utf-8');
        // Split the content into an array of lines
        var lines = fileContent.split('\n');
        // Remove any trailing newline from the last line
        if (lines.length > 0 && lines[lines.length - 1] === '') {
            lines.pop();
        }
        return lines;
    }
    catch (error) {
        var message = 'Unknown Error';
        if (error instanceof Error)
            message = error.message;
        // Handle file read errors
        console.error("Error reading file " + filename + ": " + message);
        return [];
    }
}
exports.parseFile = parseFile;
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
exports.Coord = Coord;
