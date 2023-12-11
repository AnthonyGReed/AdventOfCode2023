import {parseFile, Coord} from "../utilities/Utils"

/**
 * Puzzle Solution Description: I didn't build an actual grid for this one which I beilieve helped me immensely in part 2.
 * Instead, I did it with the power of MATH by plotting where the galaxies would be on a graph and mathematically subtracting
 * their coordinates to get distance.
 */
function solve1() {
    const start: number = new Date().getTime();
    const file: string[] = parseFile("input.txt");
    let galaxies: Galaxy[] = [];
    let lineCount = 0;
    for(const line of file) {
        const data: string[] = [...line];
        for(const char in data) {
            if(data[char] == "#") {
                galaxies.push(new Galaxy(lineCount, parseInt(char)));
            }
        }
        lineCount++;
    }

    for(let i = file.length - 1; i > 0; i--) {
        if(!galaxyExistsByAttribute(i, "Row", galaxies)) {
            for(const galaxy of galaxies) {
                if(galaxy.coord.row > i) {
                    galaxy.coord.row++;
                }
            }
        }
    }

    for(let i = file[0].length - 1; i > 0; i--) {
        if(!galaxyExistsByAttribute(i, "Col", galaxies)) {
            for(const galaxy of galaxies) {
                if(galaxy.coord.column > i) {
                    galaxy.coord.column++;
                }
            }
        }
    }

    let total = 0;
    for(const galaxy of galaxies) {
        for(const otherGalaxy of galaxies) {
            total += Math.abs(galaxy.coord.row - otherGalaxy.coord.row);
            total += Math.abs(galaxy.coord.column - otherGalaxy.coord.column);
        }
    }
    console.log(total / 2);
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

/**
 * Puzzle Solution Description: My solution to part 1 made part 2 trivial. I was already doing this in a way that
 * changing the number from 1 to 1000000 was just additional arithmatic. I did run into trouble where I failed to account
 * for the one empty row that actually existed and was adding a million and one rows in each spot instead but that was
 * quick to rememdy.
 */
function solve2() {
    const start: number = new Date().getTime();
    const file: string[] = parseFile("input.txt");
    let galaxies: Galaxy[] = [];
    let lineCount = 0;
    for(const line of file) {
        const data: string[] = [...line];
        for(const char in data) {
            if(data[char] == "#") {
                galaxies.push(new Galaxy(lineCount, parseInt(char)));
            }
        }
        lineCount++;
    }

    for(let i = file.length - 1; i > 0; i--) {
        if(!galaxyExistsByAttribute(i, "Row", galaxies)) {
            for(const galaxy of galaxies) {
                if(galaxy.coord.row > i) {
                    galaxy.coord.row = galaxy.coord.row + 1000000 - 1;
                }
            }
        }
    }

    for(let i = file[0].length - 1; i > 0; i--) {
        if(!galaxyExistsByAttribute(i, "Col", galaxies)) {
            for(const galaxy of galaxies) {
                if(galaxy.coord.column > i) {
                    galaxy.coord.column = galaxy.coord.column + 1000000 - 1;
                }
            }
        }
    }

    let total = 0;
    for(const galaxy of galaxies) {
        for(const otherGalaxy of galaxies) {
            total += Math.abs(galaxy.coord.row - otherGalaxy.coord.row);
            total += Math.abs(galaxy.coord.column - otherGalaxy.coord.column);
        }
    }
    console.log(total / 2);
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

//HELPER FUNCTIONS
class Galaxy {
    coord: Coord;

    constructor(row: number, column: number) {
        this.coord = new Coord(row, column);
    }

}

function galaxyExistsByAttribute(num: number, type: string, galaxies: Galaxy[]): boolean {
    if(type == "Row") {
        for(const galaxy of galaxies) {
            if(galaxy.coord.row == num) {
                return true;
            }
        }
    }
    if(type == "Col") {
        for(const galaxy of galaxies) {
            if(galaxy.coord.column == num) {
                return true;
            }
        }
    }
    return false;
}
solve1();
solve2();