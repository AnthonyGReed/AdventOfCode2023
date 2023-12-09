"use strict";
exports.__esModule = true;
var Utils_1 = require("../utilities/Utils");
/**
 * Puzzle Solution Description:
 */
function solve1() {
    var start = new Date().getTime();
    var file = Utils_1.parseFile("input.txt");
    var inputList = [];
    for (var _i = 0, file_1 = file; _i < file_1.length; _i++) {
        var line = file_1[_i];
        var temp = line.split(" ");
        var input = [];
        for (var _a = 0, temp_1 = temp; _a < temp_1.length; _a++) {
            var char = temp_1[_a];
            input.push(parseInt(char));
        }
        inputList.push(input);
    }
    var output = 0;
    for (var _b = 0, inputList_1 = inputList; _b < inputList_1.length; _b++) {
        var input = inputList_1[_b];
        output += getNextNumber(input);
    }
    console.log(output);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
/**
 * Puzzle Solution Description:
 */
function solve2() {
    var start = new Date().getTime();
    var file = Utils_1.parseFile("input.txt");
    var inputList = [];
    for (var _i = 0, file_2 = file; _i < file_2.length; _i++) {
        var line = file_2[_i];
        var temp = line.split(" ");
        var input = [];
        for (var _a = 0, temp_2 = temp; _a < temp_2.length; _a++) {
            var char = temp_2[_a];
            input.push(parseInt(char));
        }
        inputList.push(input);
    }
    var output = 0;
    for (var _b = 0, inputList_2 = inputList; _b < inputList_2.length; _b++) {
        var input = inputList_2[_b];
        output += getPreviousNumber(input);
    }
    console.log(output);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
//HELPER FUNCTIONS
function getNextNumber(input) {
    var workingSet = input;
    var allZeros = false;
    var rightValues = [];
    while (!allZeros) {
        var differences = [];
        rightValues.push(workingSet[workingSet.length - 1]);
        for (var i = 0; i < workingSet.length - 1; i++) {
            differences.push(workingSet[i + 1] - workingSet[i]);
        }
        allZeros = true;
        for (var _i = 0, differences_1 = differences; _i < differences_1.length; _i++) {
            var difference = differences_1[_i];
            if (difference !== 0) {
                allZeros = false;
            }
        }
        workingSet = differences;
    }
    var output = 0;
    for (var _a = 0, rightValues_1 = rightValues; _a < rightValues_1.length; _a++) {
        var value = rightValues_1[_a];
        output += value;
    }
    return output;
}
function getPreviousNumber(input) {
    var workingSet = input;
    var allZeros = false;
    var leftValues = [];
    while (!allZeros) {
        var differences = [];
        leftValues.push(workingSet[0]);
        for (var i = 0; i < workingSet.length - 1; i++) {
            differences.push(workingSet[i + 1] - workingSet[i]);
        }
        allZeros = true;
        for (var _i = 0, differences_2 = differences; _i < differences_2.length; _i++) {
            var difference = differences_2[_i];
            if (difference !== 0) {
                allZeros = false;
            }
        }
        workingSet = differences;
    }
    // console.log(leftValues);
    var output = 0;
    for (var i = leftValues.length; i > 0; i--) {
        // console.log(leftValues[i-1] + " - " + output)
        output = leftValues[i - 1] - output;
    }
    return output;
}
// solve1();
solve2();
