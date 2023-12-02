import {parseFile} from "../utilities/Utils"

const BLUE: number = 14;
const GREEN: number = 13;
const RED: number = 12;

/**
 * Puzzle Solution Description: THIS IS A REFACTOR AFTER THE PUZZLE HAD BEEN SOLVED. I wanted to go with a more object oriented approach
 * to the puzzle so I refactored to use new classes and helper functions to model the puzzle better. In both cases we parse the line
 * into a game that contains draws from the bag. We then do some small calculations to fill out the puzzle criteria in helper functions.
 */
function solve1() {
    const file: string[] = parseFile("input.txt");
    let gameCollection: Game[] = [];
    for(const gameIndex in file) {
        let game: Game = new Game(file[gameIndex]);
        gameCollection.push(game);
    }
    console.log("Puzzle 1 solution: " + calculatePuzzle1(gameCollection));
    console.log("Puzzle 2 solution: " + calculatePuzzle2(gameCollection))
}

//HELPER FUNCTIONS
interface bag {
    "blue": number;
    "red": number;
    "green": number;
}

class Game {
    id: number;
    bags: bag[];
    highestBag: bag;
    countForPuzzle1: boolean;

    constructor(input: string) {
        this.id = this.getId(input);
        this.bags = this.fillBags(input);
        this.highestBag = this.getHighestBag(this.bags);
        this.countForPuzzle1 = this.checkConstants(this.highestBag);
    }

    getId(input: string): number {
        return parseInt(input.split(": ")[0].split(" ")[1]);
    }

    fillBags(input: string): bag[] {
        let output: bag[] = [];
        let bags: string[] = input.split(": ")[1].split("; ");
        bags.forEach((bag) => {
            let draws: string[] = bag.split(", ");
            let currentBag: bag = {"blue": 0, "green": 0, "red": 0};
            draws.forEach((draw) => {
                let results: string[] = draw.split(" ");
                if(results[1] == 'blue') {currentBag.blue = parseInt(results[0])}
                if(results[1] == 'red') {currentBag.red = parseInt(results[0])}
                if(results[1] == 'green') {currentBag.green = parseInt(results[0])}
            })
            output.push(currentBag)
        })
        return output;
    }

    getHighestBag(bags: bag[]): bag {
        let outputBag: bag = {"blue": 0, "green": 0, "red": 0}
        bags.forEach((bag) => {
            if(bag.blue > outputBag.blue) {outputBag.blue = bag.blue}
            if(bag.green > outputBag.green) {outputBag.green = bag.green}
            if(bag.red > outputBag.red) {outputBag.red = bag.red}
        })
        return outputBag;
    }

    checkConstants(bag: bag): boolean {
        if(bag.blue > BLUE || bag.green > GREEN || bag.red > RED) { return false; }
        return true;
    }
}

function calculatePuzzle1(games: Game[]): number {
    let output: number = 0;
    games.forEach((game) => {
        if(game.countForPuzzle1) {output += game.id}
    })
    return output;
}

function calculatePuzzle2(games: Game[]): number {
    let powerSum: number = 0;
    games.forEach((game) => {
        powerSum += (game.highestBag.blue * game.highestBag.green * game.highestBag.red)
    })
    return powerSum;
}

solve1();