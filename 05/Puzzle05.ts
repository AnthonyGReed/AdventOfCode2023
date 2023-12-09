import { parse } from "path";
import {parseFile} from "../utilities/Utils"

/**
 * Puzzle Solution Description:
 */
function solve1() {
    const start: number = new Date().getTime();
    const categories: string[][] = [[],[],[],[],[],[],[],[]];
    const seedContainer: number[] = [];
    const outputArray: Range[] = [];
    const almanac: Almanac = new Almanac();
    const file: string[] = parseFile("input.txt");
    parseCategories(file, categories);
    parseMap(categories, seedContainer, almanac);
    parseSeeds(seedContainer, almanac, outputArray);
    console.log(outputArray.sort(rangeCompare)[0])
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

/**
 * Puzzle Solution Description:
 */
function solve2() {
    const start: number = new Date().getTime();
    const categories: string[][] = [[],[],[],[],[],[],[],[]];
    const seedContainer: number[] = [];
    const seedRanges: Range[] = [];
    const outputArray: Range[] = [];
    const almanac: Almanac = new Almanac();
    const file: string[] = parseFile("sample.txt");
    parseCategories(file, categories);
    parseMap(categories, seedContainer, almanac);
    // makeSeedRanges(seedContainer, seedRanges)
    
    // console.log(parseSeedRanges(seedRanges, almanac))
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

//HELPER FUNCTIONS
class Range {
    start: number;
    end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    check(number: number): boolean {
        return this.start <= number && number <= this.end;
    }

    getOffset(number: number): number {
        return number - this.start;
    }

    useOffset(number: number): number {
        return number + this.start;
    }
}

function  rangeCompare(a: Range, b: Range): number {
    if(a.end < b.end) {
        return -1;
    }
    if(a.end > b.end) {
        return 1;
    }
    return 0;
}

class Entry {
    source: Range;
    destination: Range;

    constructor(source: Range, destination: Range) {
        this.source = source;
        this.destination = destination;
    }
}

class EntryPage {
    entries: Entry[]

    constructor() {
        this.entries = [];
    }

    add(entry: Entry) {
        this.entries.push(entry)
    }

    sortSources() {
        this.entries.sort(this.compareSources)
    }

    sortDestinations() {
        this.entries.sort(this.compareDestinationa)
    }

    getNextSource(seed: number): Entry | undefined {
        this.sortSources()
        for(const entry of this.entries) {
            if(seed > entry.source.start && seed < entry.source.end) {
                return entry;
            }
            if(seed < entry.source.start) {
                return entry;
            }
        }
        return undefined;
    }

    private compareSources(a: Entry, b: Entry) {
        if(a.source.start < b.source.start) {
            return -1
        }
        if(a.source.start > b.source.start) {
            return 1
        }
        return 0
    }

    private compareDestinationa(a: Entry, b: Entry) {
        if(a.destination.start < b.destination.start) {
            return -1
        }
        if(a.destination.start > b.destination.start) {
            return 1
        }
        return 0
    }
}

class Almanac {
    ranges: Map<string, EntryPage>;
    names: string[] = ["seed-to-soil", "soil-to-fertilizer", "fertilizer-to-water", "water-to-light",
            "light-to-temperature", "temperature-to-humidity", "humidity-to-location"];

    constructor() {
        this.ranges = new Map<string, EntryPage>();
    }

    add(name: string, page: EntryPage): void {
        if(this.ranges.has(name)) {
            for(const entry of page.entries) {
                this.ranges.get(name)?.push(entry);
            }
        } else {
            this.ranges.set(name, page);
        }
    }

    lookup(number: number): number | undefined {
        for(const name of this.names) {
            const range = this.ranges.get(name);
            if(range !== undefined) {
                let numberFound = false;
                for(let i = 0; i < range.entries.length && !numberFound; i++) {
                    const entry = range.entries[i]
                    if(entry.source.check(number)) {
                        const offset = entry.source.getOffset(number);
                        number = entry.destination.useOffset(offset);
                        numberFound = true;
                    }
                }
            } else {
                return undefined;
            }
        }
        return number;
    }

    // getSmallestSeeds(range: Range) {
    //     //For each map
    //     // start with the lowest seed of the range
    //     // add that seed to the collection
    //     // if you are within a range on the mapping table count up until you reach the end of that range or the end of the larger range.
    //     // if you reach the end of the mapping table range, add the next seed and conginue to count up
    //     // each range that begins take the first seed, accounting for the non-mapped areas
    //     // Run all these ranges through the next map
    //     let seedRanges: Range[] = this.getSmallerSeedRanges(range, this.names[0]);
        
    // }

    // getSmallerSeedRanges(range: Range, name: string): Range[] {
    //     let output: Range[] = [];
    //     let i : number = range.start
    //     while(i < range.end) {
    //         const entries: EntryPage | undefined = this.ranges.get(name);
    //         if(entries !== undefined) {
    //             const entry: Entry | undefined = entries.getNextSource(i);
    //             if(entry === undefined) {
    //                 output.push(new Range(i, range.end));
    //                 i = range.end;
    //             } else {
    //                 if(entry.source.start <= i) {
    //                     if(entry.source.end >= range.end) {
    //                         output.push(new Range(i, range.end));
    //                         i = range.end;
    //                     } else {
    //                         output.push(new Range(i, entry.source.end));
    //                         i = entry.source.end + 1
    //                     }
    //                 } else {
    //                     output.push(new Range(i, entry.source.start - 1));
    //                     i = entry.source.start;
    //                 }
    //             }
    //         }
    //     }
    //     return output
    // }
}

function parseCategories(file: string[], categories: string[][]): void {
    let category: number = 0;
    for(const line of file) {
        if(line.length == 0) {
            category++;
        } else {
            categories[category].push(line)
        }
    }
}

function parseMap(categories: string[][], seedContainer: number[], almanac: Almanac): void {
    let categoryCount = 0;
    for(const category of categories) {
        if(categoryCount == 0) {
            const info: string[] = category[0].split(": ");
            const seeds: string[] = info[1].split(" ");
            for(const seed of seeds) {
                seedContainer.push(parseInt(seed));
            }
            categoryCount++;
        } else {
            let lineCount:number = 0;
            let name: string = "";
            let entries: EntryPage = new EntryPage();
            for(const line of category) {
                const info = line.split(" ");
                if(lineCount == 0) {
                    name = info[0];
                    lineCount++;
                } else {
                    const source = new Range(parseInt(info[1]), (parseInt(info[1]) + parseInt(info[2]) - 1));
                    const destination = new Range(parseInt(info[0]), (parseInt(info[0]) + parseInt(info[2]) - 1));
                    const entry: Entry = new Entry(source, destination);
                    entries.add(entry);
                }
            }
            almanac.add(name, entries);
        }
    }
}

function parseSeeds(seedContainer: number[], almanac: Almanac, outputArray: Range[]): void {
    for(const seed of seedContainer) {
        const location = almanac.lookup(seed);
        if(location !== undefined) {
            outputArray.push(new Range(seed, location))
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