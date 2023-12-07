import {parseFile} from "../utilities/Utils"

/**
 * Puzzle Solution Description:
 */
function solve1() {
    const file: string[] = parseFile("input.txt");
    let finalOutput = 1;
    let races: Race[] = [];
    const times: string[] = file[0].split(/[\s, \t, \n]+/);
    const distances: string[] = file[1].split(/[\s, \t, \n]+/);
    for(let i = 1; i < times.length; i++) {
        races.push(new Race(parseInt(times[i]), parseInt(distances[i])))
    }
    for(const race of races) {
        finalOutput *= runBoat(race.time, race.distance)
    }
    console.log(finalOutput)
}

/**
 * Puzzle Solution Description:
 */
function solve2() {
    const file: string[] = parseFile("input.txt");
    let finalOutput = 1;
    const times: string[] = file[0].split(/[\s, \t, \n]+/);
    const distances: string[] = file[1].split(/[\s, \t, \n]+/);
    let time: string = "";
    let distance: string = "";
    for(let i = 1; i < times.length; i++) {
        time = time.concat(times[i]);
        distance = distance.concat(distances[i]);
    }
    finalOutput *= runBoat(parseInt(time), parseInt(distance));
    console.log(finalOutput)
}

//HELPER FUNCTIONS
class Race {
    time: number;
    distance: number;

    constructor(time: number, distance: number) {
        this.time = time;
        this.distance = distance;
    }
}

function runBoat(time: number, goal: number): number {
    let finalCount = 0;
    for(let hold = 0; hold < time; hold++) {
        if(((time - hold) * hold) > goal) {
            finalCount++;
        }
    }
    return finalCount
}


solve1();
solve2();