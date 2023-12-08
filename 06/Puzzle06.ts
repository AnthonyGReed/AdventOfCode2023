import {parseFile} from "../utilities/Utils"

/**
 * Puzzle Solution Description: This one goes pretty quick.we just run through each possible hold time and see if it works.
 */
function solve1() {
    const start: number = new Date().getTime();
    const file: string[] = parseFile("input.txt");
    let finalOutput = 1;
    let races: Race[] = [];
    const times: string[] = file[0].split(/[\s, \t, \n]+/);
    const distances: string[] = file[1].split(/[\s, \t, \n]+/);
    for(let i = 1; i < times.length; i++) {
        races.push(new Race(parseInt(times[i]), parseInt(distances[i])));
    }
    for(const race of races) {
        finalOutput *= runBoat(race.time, race.distance);
    }
    console.log(finalOutput);
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

/**
 * Puzzle Solution Description: We do the same here for the larger numbers. Supposedly this shouldn't be very fast but it was for me.
 * I don't know why, but this is the same solution as above but with its longer time and distance.
 */
function solve2() {
    const start: number = new Date().getTime();
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
    console.log(finalOutput);
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
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