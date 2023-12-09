"use strict";
exports.__esModule = true;
var Utils_1 = require("../utilities/Utils");
/**
 * Puzzle Solution Description: This one goes pretty quick.we just run through each possible hold time and see if it works.
 */
function solve1() {
    var start = new Date().getTime();
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
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
/**
 * Puzzle Solution Description: We do the same here for the larger numbers. Supposedly this shouldn't be very fast but it was for me.
 * I don't know why, but this is the same solution as above but with its longer time and distance.
 */
function solve2() {
    var start = new Date().getTime();
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
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
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
