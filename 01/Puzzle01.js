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
 * To solve this we break each line into an array, then we itterate through each character until we find a number.
 * We add that number to our total times ten and then reitterate over the array coming from the other direction.
 */
function solve1() {
    var file = Utils_1.parseFile("input01-a.txt");
    var total = 0;
    for (var line in file) {
        var firstDigit = 0;
        var secondDigit = 0;
        var input = file[line];
        var inputChars = __spreadArrays(input);
        for (var i = 0; i < inputChars.length && firstDigit == 0; i++) {
            firstDigit = parseValues(inputChars[i], firstDigit, i);
            total += (10 * firstDigit);
        }
        for (var i = inputChars.length; i >= 0 && secondDigit == 0; i--) {
            secondDigit = parseValues(inputChars[i], secondDigit, i);
            total += secondDigit;
        }
    }
    console.log(total);
}
/**
 * General idea is the same with this one as it was with the previous one. We spit the array up into characters and test each character,
 * the only difference is that we also use that characters index to check if it is the start of a number word. If it is, we return the number
 * and start from the back end.
 */
function solve2() {
    var file = Utils_1.parseFile("input01-b.txt");
    var total = 0;
    for (var line in file) {
        var firstDigit = 0;
        var secondDigit = 0;
        var input = file[line];
        var inputChars = __spreadArrays(input);
        for (var i = 0; i < inputChars.length && firstDigit == 0; i++) {
            firstDigit = parseValues(inputChars[i], firstDigit, i, input);
            total += (10 * firstDigit);
        }
        for (var i = inputChars.length; i >= 0 && secondDigit == 0; i--) {
            secondDigit = parseValues(inputChars[i], secondDigit, i, input);
            total += secondDigit;
        }
    }
    console.log(total);
}
//HELPER FUNCTIONS
/**
 * This function lets us check the index of the character we are working with to see if there is a number word in that
 * position. If there is, it returns the corresponding value, if not it returns 0.
 * @param i Index of the character in question
 * @param input Line the character is part of
 * @returns Value of a number word found or zero
 */
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
function parseValues(inputChar, digit, index, input) {
    var value = parseInt(inputChar, 10);
    if (!isNaN(value)) {
        digit = value;
    }
    else if (typeof input !== 'undefined') {
        digit = checkForNumberWords(index, input);
    }
    return digit;
}
solve1();
solve2();
