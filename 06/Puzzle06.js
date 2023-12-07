"use strict";
exports.__esModule = true;
var Utils_1 = require("../utilities/Utils");
/**
 * Puzzle Solution Description:
 */
function solve1() {
    var file = Utils_1.parseFile("input.txt");
    var finalOutput = 1;
    var races = [];
    var times = file[0].split(/[\s, \t, \n]+/);
    var distances = file[1].split(/[\s, \t, \n]+/);
    for (var i = 1; i < times.length; i++) {
        races.push(new Race(parseInt(times[i]), parseInt(distances[i])));
    }
    for (var _i = 0, races_1 = races; _i < races_1.length; _i++) {
        var race = races_1[_i];
        finalOutput *= runBoat(race.time, race.distance);
    }
    console.log(finalOutput);
}
/**
 * Puzzle Solution Description:
 */
function solve2() {
    var file = Utils_1.parseFile("input.txt");
    var finalOutput = 1;
    var times = file[0].split(/[\s, \t, \n]+/);
    var distances = file[1].split(/[\s, \t, \n]+/);
    var time = "";
    var distance = "";
    for (var i = 1; i < times.length; i++) {
        time = time.concat(times[i]);
        distance = distance.concat(distances[i]);
    }
    finalOutput *= runBoat(parseInt(time), parseInt(distance));
    console.log(finalOutput);
}
//HELPER FUNCTIONS
var Race = /** @class */ (function () {
    function Race(time, distance) {
        this.time = time;
        this.distance = distance;
    }
    return Race;
}());
function runBoat(time, goal) {
    var finalCount = 0;
    for (var hold = 0; hold < time; hold++) {
        if (((time - hold) * hold) > goal) {
            finalCount++;
        }
    }
    return finalCount;
}
solve1();
solve2();
