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
var solve = function () {
    // solve1();
    solve2();
};
function solve1() {
    var file = Utils_1.parseFile("input01-a.txt");
    var total = 0;
    for (var line in file) {
        var firstDigit = 0;
        var secondDigit = 0;
        var firstDigitFound = false;
        var secondDigitFound = false;
        var input = file[line];
        var inputChars = __spreadArrays(input);
        for (var i = 0; i < inputChars.length && !firstDigitFound; i++) {
            var value = parseInt(inputChars[i], 10);
            if (!isNaN(value)) {
                firstDigit = value;
                firstDigitFound = true;
                console.log("First digit found, first digit is " + firstDigit);
            }
        }
        for (var i = inputChars.length; i >= 0 && !secondDigitFound; i--) {
            var value = parseInt(inputChars[i], 10);
            if (!isNaN(value)) {
                secondDigit = value;
                secondDigitFound = true;
                console.log("Second digit found, second digit is " + secondDigit);
            }
        }
        total += (10 * firstDigit);
        total += secondDigit;
    }
    console.log(total);
}
function solve2() {
    var file = Utils_1.parseFile("input01-b.txt");
    var total = 0;
    for (var line in file) {
        var firstDigit = 0;
        var secondDigit = 0;
        var input = file[line];
        var inputChars = __spreadArrays(input);
        for (var i = 0; i < inputChars.length && firstDigit == 0; i++) {
            var value = parseInt(inputChars[i], 10);
            if (!isNaN(value)) {
                firstDigit = value;
            }
            else {
                firstDigit = checkForNumberWords(i, input);
            }
            total += (10 * firstDigit);
        }
        for (var i = inputChars.length; i >= 0 && secondDigit == 0; i--) {
            var value = parseInt(inputChars[i], 10);
            if (!isNaN(value)) {
                secondDigit = value;
            }
            else {
                secondDigit = checkForNumberWords(i, input);
            }
            total += secondDigit;
        }
    }
    console.log(total);
}
function checkForNumberWords(i, input) {
    var numbers = [
        { label: "one", value: 1 },
        { label: "two", value: 2 },
        { label: "three", value: 3 },
        { label: "four", value: 4 },
        { label: "five", value: 5 },
        { label: "six", value: 6 },
        { label: "seven", value: 7 },
        { label: "eight", value: 8 },
        { label: "nine", value: 9 }
    ];
    for (var num in numbers) {
        if (input.length >= i + numbers[num].label.length && input.substring(i, i + numbers[num].label.length) == numbers[num].label) {
            // console.log("Input: " + input + ", index: " + i + ", matching label: " + numbers[num].label + ", matching value: " + numbers[num].value )
            return numbers[num].value;
        }
    }
    return 0;
}
solve();
