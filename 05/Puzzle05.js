"use strict";
exports.__esModule = true;
var Utils_1 = require("../utilities/Utils");
/**
 * Puzzle Solution Description:
 */
function solve1() {
    var start = new Date().getTime();
    var categories = [[], [], [], [], [], [], [], []];
    var seedContainer = [];
    var outputArray = [];
    var almanac = new Almanac();
    var file = Utils_1.parseFile("input.txt");
    parseCategories(file, categories);
    parseMap(categories, seedContainer, almanac);
    parseSeeds(seedContainer, almanac, outputArray);
    console.log(outputArray.sort(rangeCompare)[0]);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
/**
 * Puzzle Solution Description:
 */
function solve2() {
    var start = new Date().getTime();
    var categories = [[], [], [], [], [], [], [], []];
    var seedContainer = [];
    var seedRanges = [];
    var outputArray = [];
    var almanac = new Almanac();
    var file = Utils_1.parseFile("input.txt");
    parseCategories(file, categories);
    parseMap(categories, seedContainer, almanac);
    // makeSeedRanges(seedContainer, seedRanges)
    // console.log(parseSeedRanges(seedRanges, almanac))
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
//HELPER FUNCTIONS
var Range = /** @class */ (function () {
    function Range(start, end) {
        this.start = start;
        this.end = end;
    }
    Range.prototype.check = function (number) {
        return this.start <= number && number <= this.end;
    };
    Range.prototype.getOffset = function (number) {
        return number - this.start;
    };
    Range.prototype.useOffset = function (number) {
        return number + this.start;
    };
    return Range;
}());
function rangeCompare(a, b) {
    if (a.end < b.end) {
        return -1;
    }
    if (a.end > b.end) {
        return 1;
    }
    return 0;
}
var Entry = /** @class */ (function () {
    function Entry(source, destination) {
        this.source = source;
        this.destination = destination;
    }
    return Entry;
}());
var EntryPage = /** @class */ (function () {
    function EntryPage() {
        this.entries = [];
    }
    EntryPage.prototype.add = function (entry) {
        this.entries.push(entry);
    };
    EntryPage.prototype.sortSources = function () {
        this.entries.sort(this.compareSources);
    };
    EntryPage.prototype.sortDestinations = function () {
        this.entries.sort(this.compareDestinationa);
    };
    EntryPage.prototype.getNextSource = function (seed) {
        this.sortSources();
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (seed > entry.source.start && seed < entry.source.end) {
                return entry;
            }
            if (seed < entry.source.start) {
                return entry;
            }
        }
        return undefined;
    };
    EntryPage.prototype.compareSources = function (a, b) {
        if (a.source.start < b.source.start) {
            return -1;
        }
        if (a.source.start > b.source.start) {
            return 1;
        }
        return 0;
    };
    EntryPage.prototype.compareDestinationa = function (a, b) {
        if (a.destination.start < b.destination.start) {
            return -1;
        }
        if (a.destination.start > b.destination.start) {
            return 1;
        }
        return 0;
    };
    return EntryPage;
}());
var Almanac = /** @class */ (function () {
    function Almanac() {
        this.names = ["seed-to-soil", "soil-to-fertilizer", "fertilizer-to-water", "water-to-light",
            "light-to-temperature", "temperature-to-humidity", "humidity-to-location"];
        this.ranges = new Map();
    }
    Almanac.prototype.add = function (name, page) {
        var _a;
        if (this.ranges.has(name)) {
            for (var _i = 0, _b = page.entries; _i < _b.length; _i++) {
                var entry = _b[_i];
                (_a = this.ranges.get(name)) === null || _a === void 0 ? void 0 : _a.push(entry);
            }
        }
        else {
            this.ranges.set(name, page);
        }
    };
    Almanac.prototype.lookup = function (number) {
        for (var _i = 0, _a = this.names; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var range = this.ranges.get(name_1);
            if (range !== undefined) {
                var numberFound = false;
                for (var i = 0; i < range.entries.length && !numberFound; i++) {
                    var entry = range.entries[i];
                    if (entry.source.check(number)) {
                        var offset = entry.source.getOffset(number);
                        number = entry.destination.useOffset(offset);
                        numberFound = true;
                    }
                }
            }
            else {
                return undefined;
            }
        }
        return number;
    };
    return Almanac;
}());
function parseCategories(file, categories) {
    var category = 0;
    for (var _i = 0, file_1 = file; _i < file_1.length; _i++) {
        var line = file_1[_i];
        if (line.length == 0) {
            category++;
        }
        else {
            categories[category].push(line);
        }
    }
}
function parseMap(categories, seedContainer, almanac) {
    var categoryCount = 0;
    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
        var category = categories_1[_i];
        if (categoryCount == 0) {
            var info = category[0].split(": ");
            var seeds = info[1].split(" ");
            for (var _a = 0, seeds_1 = seeds; _a < seeds_1.length; _a++) {
                var seed = seeds_1[_a];
                seedContainer.push(parseInt(seed));
            }
            categoryCount++;
        }
        else {
            var lineCount = 0;
            var name_2 = "";
            var entries = new EntryPage();
            for (var _b = 0, category_1 = category; _b < category_1.length; _b++) {
                var line = category_1[_b];
                var info = line.split(" ");
                if (lineCount == 0) {
                    name_2 = info[0];
                    lineCount++;
                }
                else {
                    var source = new Range(parseInt(info[1]), (parseInt(info[1]) + parseInt(info[2]) - 1));
                    var destination = new Range(parseInt(info[0]), (parseInt(info[0]) + parseInt(info[2]) - 1));
                    var entry = new Entry(source, destination);
                    entries.add(entry);
                }
            }
            almanac.add(name_2, entries);
        }
    }
}
function parseSeeds(seedContainer, almanac, outputArray) {
    for (var _i = 0, seedContainer_1 = seedContainer; _i < seedContainer_1.length; _i++) {
        var seed = seedContainer_1[_i];
        var location_1 = almanac.lookup(seed);
        if (location_1 !== undefined) {
            outputArray.push(new Range(seed, location_1));
        }
    }
}
// function makeSeedRanges(seedContainer: number[], seedRanges: Range[]) {
//     for(let i = 0; i < seedContainer.length; i += 2) {
//         seedRanges.push(new Range(seedContainer[i], seedContainer[i] + seedContainer[i + 1] - 1))
//     }
// }
// function getSmallestSeeds(seedRanges: Range[], almanac: Almanac): number[] {
//     const seeds: number[] = [];
//     for(const range of seedRanges) {
//         const newSeeds = almanac.getSmallestSeeds(range);
//         for(const seed of newSeeds) {
//             seeds.push(seed);
//         }
//     }
//     return seeds;
// }
// function parseSeedRanges(seedRanges: Range[], almanac: Almanac): Range[] | undefined {
//     let firstLocation: number | undefined = almanac.lookup(seedRanges[0].start);
//     if(firstLocation !== undefined) {
//         let lowestSeed: Range = new Range(seedRanges[0].start, firstLocation);
//         for(const range of seedRanges) {
//             for(let i = range.start; i <= range.end; i++) {
//                 console.log("Checking seed " + i)
//                 const location = almanac.lookup(i);
//                 if(location !== undefined && location < lowestSeed.end) {
//                     lowestSeed = new Range(i, location)
//                 }
//             }
//         }
//         return lowestSeed
//     } else {
//         return undefined
//     }
// }
solve1();
// solve2();
