import {parseFile} from "../utilities/Utils"

/**
 * Puzzle Solution Description:
 */
function solve1() {
    const start: number = new Date().getTime();
    const file: string[] = parseFile("input.txt");
    let inputList: number[][] = [];
    for(const line of file) {
        const temp: string[] = line.split(" ");
        let input: number[] = [];
        for(const char of temp) {
            input.push(parseInt(char));
        }
        inputList.push(input)
    }
    let output: number = 0;
    for(const input of inputList) {
        output += getNextNumber(input);
    }
    console.log(output);
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

/**
 * Puzzle Solution Description:
 */
function solve2() {
    const start: number = new Date().getTime();
    const file: string[] = parseFile("input.txt");
    let inputList: number[][] = [];
    for(const line of file) {
        const temp: string[] = line.split(" ");
        let input: number[] = [];
        for(const char of temp) {
            input.push(parseInt(char));
        }
        inputList.push(input)
    }
    let output: number = 0;
    for(const input of inputList) {
        output += getPreviousNumber(input);
    }
    console.log(output);
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

//HELPER FUNCTIONS
function getNextNumber(input: number[]): number {
    let workingSet: number[] = input;
    let allZeros: boolean = false;
    let rightValues: number[] = [];
    while(!allZeros) {
        let differences: number[] = [];
        rightValues.push(workingSet[workingSet.length - 1])
        for(let i = 0; i < workingSet.length - 1; i++) {
            differences.push(workingSet[i+1] - workingSet[i])
        }
        allZeros = true;
        for(const difference of differences) {
            if(difference !== 0) {
                allZeros = false;
            }
        }
        workingSet = differences;
    }
    let output: number = 0;
    for(const value of rightValues) {
        output += value;
    }
    return output
}

function getPreviousNumber(input: number[]): number {
    let workingSet: number[] = input;
    let allZeros: boolean = false;
    let leftValues: number[] = [];
    while(!allZeros) {
        let differences: number[] = [];
        leftValues.push(workingSet[0])
        for(let i = 0; i < workingSet.length - 1; i++) {
            differences.push(workingSet[i+1] - workingSet[i])
        }
        allZeros = true;
        for(const difference of differences) {
            if(difference !== 0) {
                allZeros = false;
            }
        }
        workingSet = differences;
    }
    // console.log(leftValues);
    let output: number = 0;
    for(let i = leftValues.length; i > 0; i--) {
        // console.log(leftValues[i-1] + " - " + output)
        output = leftValues[i-1] - output
    }
    return output
}


// solve1();
solve2();