"use strict";
exports.__esModule = true;
var Utils_1 = require("../utilities/Utils");
/**
 * Puzzle Solution Description:
 */
function solve1() {
    var file = Utils_1.parseFile("input.txt");
    var blueThreshold = 14;
    var greenThreshold = 13;
    var redThreshold = 12;
    var output = 0;
    for (var lineIndex in file) {
        var line = file[lineIndex];
        var firstSplit = line.split(": ");
        var gameInfo = firstSplit[0].split(" ");
        var isValid = true;
        var gameResults = firstSplit[1].split("; ");
        for (var gameIndex in gameResults) {
            var reveals = gameResults[gameIndex].split(", ");
            for (var moveIndex in reveals) {
                var moveInfo = reveals[moveIndex].split(" ");
                switch (moveInfo[1]) {
                    case "blue":
                        if (parseInt(moveInfo[0], 10) > blueThreshold) {
                            isValid = false;
                        }
                        break;
                    case "green":
                        if (parseInt(moveInfo[0], 10) > greenThreshold) {
                            isValid = false;
                        }
                        break;
                    case "red":
                        if (parseInt(moveInfo[0], 10) > redThreshold) {
                            isValid = false;
                        }
                        break;
                }
            }
        }
        if (isValid) {
            console.log("Game Number " + gameInfo[1] + " valid! Adding number");
            output += parseInt(gameInfo[1], 10);
        }
        else {
            console.log("Game Number " + gameInfo[1] + " Not valid...");
        }
    }
    console.log(output);
}
/**
 * Puzzle Solution Description:
 */
function solve2() {
    var file = Utils_1.parseFile("input.txt");
    var powerSum = 0;
    for (var lineIndex in file) {
        var line = file[lineIndex];
        var firstSplit = line.split(": ");
        var gameInfo = firstSplit[0].split(" ");
        var blueThreshold = 0;
        var redThreshold = 0;
        var greenThreshold = 0;
        var gameResults = firstSplit[1].split("; ");
        for (var gameIndex in gameResults) {
            var reveals = gameResults[gameIndex].split(", ");
            for (var moveIndex in reveals) {
                var moveInfo = reveals[moveIndex].split(" ");
                switch (moveInfo[1]) {
                    case "blue":
                        if (parseInt(moveInfo[0], 10) > blueThreshold) {
                            blueThreshold = parseInt(moveInfo[0], 10);
                        }
                        break;
                    case "green":
                        if (parseInt(moveInfo[0], 10) > greenThreshold) {
                            greenThreshold = parseInt(moveInfo[0], 10);
                        }
                        break;
                    case "red":
                        if (parseInt(moveInfo[0], 10) > redThreshold) {
                            redThreshold = parseInt(moveInfo[0], 10);
                        }
                        break;
                }
            }
        }
        console.log("Game " + gameInfo[1] + " stats:");
        console.log("Blue Threshold - " + blueThreshold);
        console.log("Green Threshold - " + greenThreshold);
        console.log("Red Threshold - " + redThreshold);
        console.log("Power of this game - " + (blueThreshold * redThreshold * greenThreshold));
        powerSum += (blueThreshold * greenThreshold * redThreshold);
        console.log("Updated PowerSum - " + powerSum);
    }
    console.log(powerSum);
}
//HELPER FUNCTIONS
// solve1();
solve2();
