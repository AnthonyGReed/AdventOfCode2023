import {parseFile} from "../utilities/Utils"

//GLOBAL VARIABLES
/**
 * I had to move this up here so I could make a global version of the Engine Map. I don't know why classes are required to exist
 * before you instantiate them and methods aren't but here we are.
 */
class EngineMap {
    schematic: string[][];

    constructor() {
        this.schematic = [];
    }

    addRow() {
        this.schematic.push([]);
    }

    addEntry(coord: Coord, val: string) {
        this.schematic[coord.row][coord.column] = val;
    }

    /**
     * This is where all the bounds checking is done. Both puzzles requiring getting certain ranges from the puzzle input so 
     * I wanted to make sure there was an easy way to make sure I wasn't going beyond the bounds of the array. This accounted
     * for a lot of the bugs in my solution in part 1. I'm sure there is a cleaner way to do this, but this was a little bit
     * of whack-a-mole.
     */ 
    getRange(startingCoord: Coord, length: number): string[] {
        if(startingCoord.row < 0) {return []}
        if(startingCoord.column < 0 && length == 1) {return []}
        if(startingCoord.row > this.schematic.length - 1) {return []}
        if(startingCoord.column >= this.schematic[startingCoord.row].length) {return []}
        if(startingCoord.column + length > this.schematic[startingCoord.row].length) {length--;}
        if(startingCoord.column < 0) {length--; startingCoord.column = 0;}
        let outputArray: string[] = [];
        for(let i = startingCoord.column; i < startingCoord.column + length; i ++) {
            outputArray.push(this.schematic[startingCoord.row][i]);
        }
        return outputArray;
    }
}

//map is going to hold the puzzle input, entries are the numbers found on the table, gears are the * we find.
let map: EngineMap = new EngineMap();
let entries: Entry[] = [];
let gears: Gear[] = [];

/**
 * Puzzle Solution Description: A lot of the work for this is done in the EngineMap and the Entry classes. We are going through
 * each row and looking for numbers. When we find numbers we follow them to the next symbol then look everywhere above below and
 * beside to see if we detect a symbol. If we do, we set the flag. Then the soolution gets all of the entries with a flag and 
 * sums them.
 */
function solve1() {
    setup();
    let outputTotal: number = 0;
    for(const entry of entries) {
        if(entry.shouldBeCounted) {
            console.log("Adding value " + entry.value + " from entry " + entry.startingCoord.row + ", " + entry.startingCoord.column + " - " + entry.numArray)
            outputTotal += entry.value;
        }
    }
    console.log("Final Output: " + outputTotal)
}

/**
 * Puzzle Solution Description: This time we have to look from the gear point of view. I had thought to try and modify what we had to
 * have entries track if they were near a gear but that proved to be complex and this was a simpler solution but it did require me to 
 * add a few methods to entry and started tracking the ending coordinates.
 */
function solve2() {
    setup();
    let outputTotal: number = 0;
    for(const row in map.schematic) {
        parseForGear(map.schematic[row], parseInt(row));
    }
    for(const gear of gears) {
        if(gear.countGearRatio) {
            outputTotal += gear.gearRatio;
        }
    }
    console.log("Final Output: " + outputTotal);
}

//HELPER FUNCTIONS

/**
 * This is where the majority of puzzle 1 is handled.
 */
class Entry {
    numArray: string[];
    startingCoord: Coord;
    endingCoord: Coord;
    length: number;
    shouldBeCounted: boolean;
    value: number;
    
    constructor(num: string, startingCoord: Coord, endingCoord: Coord) {
        this.numArray = [...num];
        this.startingCoord = startingCoord;
        this.endingCoord = endingCoord;
        this.length = this.numArray.length;
        this.value = this.parseValue(this.numArray);
        this.shouldBeCounted = this.parseSurroundings(this.startingCoord, this.length);
    }

    /**
     * This feels like a method where I really made a mistake. There has to be a better way to programatticaly
     * handle checking these locations but we just kind of manually do it here.
     * @param coord starting coordinate of the string of numbers.
     * @param length length of the string of numbers
     * @returns 
     */
    private parseSurroundings(coord: Coord, length: number): boolean {
        let symbolFound = false;
        const aboveCoord: Coord = new Coord(coord.row - 1, coord.column - 1)
        const leftCoord: Coord = new Coord(coord.row, coord.column - 1)
        const rightCoord: Coord = new Coord(coord.row, coord.column + length)
        const belowCoord: Coord = new Coord(coord.row + 1, coord.column - 1)
        const aboveRow: string[] = map.getRange(aboveCoord,length + 2);
        const leftEntry: string[] = map.getRange(leftCoord, 1);
        const rightEntry: string[] = map.getRange(rightCoord, 1);
        const belowRow: string[] = map.getRange(belowCoord, length + 2);
        if(symbolFound == false) {symbolFound = this.checkForSymbol(aboveRow)};
        if(symbolFound == false) {symbolFound = this.checkForSymbol(leftEntry)};
        if(symbolFound == false) {symbolFound = this.checkForSymbol(rightEntry)};
        if(symbolFound == false) {symbolFound = this.checkForSymbol(belowRow)};
        return symbolFound;
    }

    /**
     * Checking for the actual symbols
     * @param input this is a line of the puzzle input
     * @returns true if a symbol is found, false otherwise.
     */
    private checkForSymbol(input: string[]): boolean {
        let symbolFound = false;
        for(const char of input) {
            if(char !== '.' && isNaN(parseInt(char))) {
                symbolFound = true;
            }
        }
        return symbolFound;
    }
    
    /**
     * reads the charactersinto a number and parse it into an int
     * @param input flagged array of characters
     * @returns the parsed int
     */
    private parseValue(input: string[]): number {
        let stringValue: string = "";
        for(const char in input) {
            stringValue += input[char];
        }
        return parseInt(stringValue);
    }
    
    equals(other: Entry): boolean {
        return other.startingCoord.equals(this.startingCoord) && other.endingCoord.equals(this.endingCoord);
    }
    
    containsCoord(otherCoords: Coord): boolean {
        return (otherCoords.row == this.startingCoord.row && 
            this.startingCoord.column <= otherCoords.column &&
            this.endingCoord.column >= otherCoords.column)
    }
}

/**
 * This is similar to the entry class but for the gear instead.
 */
class Gear {
    coord: Coord;
    countGearRatio: boolean;
    gearRatio: number;
    entryContainer: Entry[] = [];
    
    constructor(coord: Coord) {
        this.coord = coord;
        this.countGearRatio = this.parseGear(coord);
        if(this.countGearRatio) {
            this.gearRatio = this.calculateGearRatio();
        } else {
            this.gearRatio = 0;
        }
    }

    private parseGear(coord: Coord): boolean {
        let coordsContainer: Coord[] = [];
        const aboveCoord = new Coord(coord.row - 1, coord.column - 1);
        const middleCoord = new Coord(coord.row, coord.column - 1);
        const belowCoord = new Coord(coord.row + 1, coord.column - 1);
        const aboveRow: string[] = map.getRange(aboveCoord, 3);
        const middleRow: string[] = map.getRange(middleCoord, 3);
        const belowRow: string[] = map.getRange(belowCoord, 3);
        this.getNumbers(coordsContainer, aboveRow, aboveCoord)
        this.getNumbers(coordsContainer, middleRow, middleCoord)
        this.getNumbers(coordsContainer, belowRow, belowCoord)
        for(const coord of coordsContainer) {
            let entryFound = false;
            for(const entry of this.entryContainer) {
                if(entry.containsCoord(coord)) {
                    entryFound = true;
                }
            }
            if(!entryFound) {
                for(const entry of entries) {
                    if(entry.containsCoord(coord)) {
                        this.entryContainer.push(entry)
                    }
                }
            }
        }
        return this.entryContainer.length == 2;
    }

    private calculateGearRatio() {
        return this.entryContainer[0].value * this.entryContainer[1].value;
    }

    private getNumbers(coordsContainer: Coord[], input: string[], coord: Coord) {
        for(const char in input) {
            if(!isNaN(parseInt(input[char]))) {
                coordsContainer.push(new Coord(coord.row, coord.column + parseInt(char)))
            }
        }
    }

    equals(other: Gear) {
        return this.coord.equals(other.coord);
    }
}

/**
 * Might move these to utilities since I've used them a couple of times now
 */
class Coord {
    row: number;
    column: number;
    
    constructor(row: number, col: number) {
        this.row = row;
        this.column = col;
    }
    
    equals(other: Coord): boolean {
        return (this.row == other.row && this.column == other.column);
    }
}

/**
 * This function is called by both puzzles to set up the input schematic.
 */
function setup(): void {
    let lineCount: number = 0;
    const file: string[] = parseFile("input.txt");
    for(const line of file) {
        map.addRow();
        parseLine([...line], lineCount);
        lineCount++;
    }
    for(const row in map.schematic) {
        findEntries(map.schematic[row], parseInt(row));
    }
}

/**
 * This is a little complicated. This one is going through and finding the entries to build out the entry array.
 * Most of the time This happens with the setup functions.
 * @param input puzzle lines.
 * @param row which row we are writing to.
 */
function findEntries(input: string[], row: number) {
    let inNumber: boolean = false;
    let currentNumberString: string = "";
    let currentLength:number = 0;
    let startingCol: number = 0;
    let endingCol: number = 0;
    for(const char in input) {
        if(!isNaN(parseInt(input[char]))) {
            if(!inNumber) {
                inNumber = true;
                startingCol = parseInt(char);
                currentNumberString += input[char];
                currentLength++;
            } else {
                currentNumberString += input[char];
                currentLength++;
            }
            if(parseInt(char) == input.length - 1) {
                endingCol = parseInt(char);
                const newEntry = new Entry(currentNumberString, new Coord(row, startingCol), new Coord(row, endingCol));
                entries.push(newEntry);
            }
        } else {
            if(inNumber) {
                inNumber = false;
                endingCol = parseInt(char) - 1;
                const newEntry = new Entry(currentNumberString, new Coord(row, startingCol), new Coord(row, endingCol));
                entries.push(newEntry);
                currentLength = 0;
                currentNumberString = "";
                startingCol = 0;
                endingCol = 0;
            }
        }
    }
}

function parseLine(input: string[], row: number) {
    input.forEach((entry, i) => {
        map.addEntry(new Coord(row, i), entry);
    });
}

function parseForGear(input: string[], row: number): void {
    for(const char in input) {
        if(input[char] == '*') {
            gears.push(new Gear(new Coord(row, parseInt(char))));
        }
    }
}

// solve1();
solve2();