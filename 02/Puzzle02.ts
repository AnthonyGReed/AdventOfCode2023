import {parseFile} from "../utilities/Utils"

/**
 * Puzzle Solution Description: In this solution, we split down to the smallest piece and if any of the colors have more than the threshold
 * we invalidate the solution. As long as the solution is valid, it's id gets added to the output.
 */
function solve1() {
    const file: string[] = parseFile("input.txt");
    const blueThreshold: number = 14;
    const greenThreshold: number = 13;
    const redThreshold: number = 12;
    let output: number = 0;
    for(const lineIndex in file) {
        const line: string = file[lineIndex];
        const firstSplit: string[] = line.split(": ");
        const gameInfo: string[] = firstSplit[0].split(" ");
        let isValid = true;
        const gameResults: string[] = firstSplit[1].split("; ");
        for(const gameIndex in gameResults) {
            const reveals: string[] = gameResults[gameIndex].split(", ");
            for(const moveIndex in reveals) {
                const moveInfo: string[] = reveals[moveIndex].split(" ");
                switch(moveInfo[1]) {
                    case "blue":
                        if(parseInt(moveInfo[0], 10) > blueThreshold) {
                            isValid = false;
                        }
                        break;
                    case "green":
                        if(parseInt(moveInfo[0], 10) > greenThreshold) {
                            isValid = false;
                        }
                        break;
                    case "red":
                        if(parseInt(moveInfo[0], 10) > redThreshold) {
                            isValid = false;
                        }
                        break;
                }
            }
        }
        if(isValid) {
            console.log("Game Number " + gameInfo[1] + " valid! Adding number")
            output += parseInt(gameInfo[1], 10);
        } else {
            console.log("Game Number " + gameInfo[1] + " Not valid...")
        }
    }
    console.log(output)
}

/**
 * Puzzle Solution Description: In this solution, we replace the highest value if we find one that is larger. Then we multiply the highest
 * for each game and add it to the power sum
 */
function solve2() {
    const file: string[] = parseFile("input.txt");
    let powerSum: number = 0;
    for(const lineIndex in file) {
        const line: string = file[lineIndex];
        const firstSplit: string[] = line.split(": ");
        const gameInfo: string[] = firstSplit[0].split(" ");
        let blueThreshold: number = 0;
        let redThreshold: number = 0;
        let greenThreshold: number = 0;
        const gameResults: string[] = firstSplit[1].split("; ");
        for(const gameIndex in gameResults) {
            const reveals: string[] = gameResults[gameIndex].split(", ");
            for(const moveIndex in reveals) {
                const moveInfo: string[] = reveals[moveIndex].split(" ");
                switch(moveInfo[1]) {
                    case "blue":
                        if(parseInt(moveInfo[0], 10) > blueThreshold) {
                            blueThreshold = parseInt(moveInfo[0], 10);
                        }
                        break;
                    case "green":
                        if(parseInt(moveInfo[0], 10) > greenThreshold) {
                            greenThreshold = parseInt(moveInfo[0], 10);
                        }
                        break;
                    case "red":
                        if(parseInt(moveInfo[0], 10) > redThreshold) {
                            redThreshold = parseInt(moveInfo[0], 10);
                        }
                        break;
                }
            }
        }
        console.log("Game " + gameInfo[1] + " stats:")
        console.log("Blue Threshold - " + blueThreshold)
        console.log("Green Threshold - " + greenThreshold)
        console.log("Red Threshold - " + redThreshold)
        console.log("Power of this game - " + (blueThreshold * redThreshold * greenThreshold))
        powerSum += (blueThreshold * greenThreshold * redThreshold)
        console.log("Updated PowerSum - " + powerSum)
    }
    console.log(powerSum);

}

//HELPER FUNCTIONS

// solve1();
solve2();