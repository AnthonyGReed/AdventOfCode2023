"use strict";
exports.__esModule = true;
var Utils_1 = require("../utilities/Utils");
var BLUE = 14;
var GREEN = 13;
var RED = 12;
/**
 * Puzzle Solution Description:
 */
function solve1() {
    var file = Utils_1.parseFile("input.txt");
    var gameCollection = [];
    for (var gameIndex in file) {
        var game = new Game(file[gameIndex]);
        gameCollection.push(game);
    }
    console.log("Puzzle 1 solution: " + calculatePuzzle1(gameCollection));
    console.log("Puzzle 2 solution: " + calculatePuzzle2(gameCollection));
}
var Game = /** @class */ (function () {
    function Game(input) {
        this.id = this.getId(input);
        this.bags = this.fillBags(input);
        this.highestBag = this.getHighestBag(this.bags);
        this.countForPuzzle1 = this.checkConstants(this.highestBag);
    }
    Game.prototype.getId = function (input) {
        return parseInt(input.split(": ")[0].split(" ")[1]);
    };
    Game.prototype.fillBags = function (input) {
        var output = [];
        var bags = input.split(": ")[1].split("; ");
        bags.forEach(function (bag) {
            var draws = bag.split(", ");
            var currentBag = { "blue": 0, "green": 0, "red": 0 };
            draws.forEach(function (draw) {
                var results = draw.split(" ");
                if (results[1] == 'blue') {
                    currentBag.blue = parseInt(results[0]);
                }
                if (results[1] == 'red') {
                    currentBag.red = parseInt(results[0]);
                }
                if (results[1] == 'green') {
                    currentBag.green = parseInt(results[0]);
                }
            });
            output.push(currentBag);
        });
        return output;
    };
    Game.prototype.getHighestBag = function (bags) {
        var outputBag = { "blue": 0, "green": 0, "red": 0 };
        bags.forEach(function (bag) {
            if (bag.blue > outputBag.blue) {
                outputBag.blue = bag.blue;
            }
            if (bag.green > outputBag.green) {
                outputBag.green = bag.green;
            }
            if (bag.red > outputBag.red) {
                outputBag.red = bag.red;
            }
        });
        return outputBag;
    };
    Game.prototype.checkConstants = function (bag) {
        if (bag.blue > BLUE || bag.green > GREEN || bag.red > RED) {
            return false;
        }
        return true;
    };
    return Game;
}());
function calculatePuzzle1(games) {
    var output = 0;
    games.forEach(function (game) {
        if (game.countForPuzzle1) {
            output += game.id;
        }
    });
    return output;
}
function calculatePuzzle2(games) {
    var powerSum = 0;
    games.forEach(function (game) {
        powerSum += (game.highestBag.blue * game.highestBag.green * game.highestBag.red);
    });
    return powerSum;
}
solve1();
