import {parseFile} from "../utilities/Utils"

function solve1() {
    const file: string[] = parseFile("input01-a.txt");
    let total: number = 0;
    for (const line in file) {
        let firstDigit: number = 0;
        let secondDigit: number = 0;
        const input: string = file[line];
        const inputChars: string[] = [...input];
        for(let i = 0; i < inputChars.length && firstDigit == 0; i++) {
            const value = parseInt(inputChars[i], 10)
            if(!isNaN(value)) {
                firstDigit = value;
            }
        }
        for(let i = inputChars.length; i >= 0 && secondDigit == 0; i--) {
            const value = parseInt(inputChars[i], 10)
            if(!isNaN(value)) {
                secondDigit = value;
            }
        }
        total += (10 * firstDigit);
        total += secondDigit;
    }
    console.log(total)
}

function solve2() {
    const file: string[] = parseFile("input01-b.txt");
    let total: number = 0;
    for(const line in file) {
        let firstDigit: number = 0;
        let secondDigit: number = 0;
        const input: string = file[line];
        const inputChars: string[] = [...input];
        for(let i = 0; i < inputChars.length && firstDigit == 0; i++) {
            let value = parseInt(inputChars[i], 10)
            if(!isNaN(value)) {
                firstDigit = value;
            } else {
                firstDigit = checkForNumberWords(i,input);
            }
            total += (10 * firstDigit);
        }
        for(let i = inputChars.length; i >= 0 && secondDigit == 0; i--) {
            let value = parseInt(inputChars[i], 10);
            if(!isNaN(value)) {
                secondDigit = value;
            } else {
                secondDigit = checkForNumberWords(i, input);
            }
            total += secondDigit;
        }
    }
    console.log(total);
}

function checkForNumberWords(i: number, input: string): number {
    const numbers: numberBond[] = [
        {label:"one", value:1 }, 
        {label:"two", value:2}, 
        {label:"three", value:3}, 
        {label:"four", value:4},
        {label:"five", value:5}, 
        {label:"six", value:6}, 
        {label:"seven", value:7}, 
        {label:"eight", value:8},
        {label:"nine", value:9}
    ];
    for(const num in numbers) {
        if(input.length >= i + numbers[num].label.length && input.substring(i, i+numbers[num].label.length) == numbers[num].label) {
            // console.log("Input: " + input + ", index: " + i + ", matching label: " + numbers[num].label + ", matching value: " + numbers[num].value )
            return numbers[num].value;
        }
    }
    return 0;
}

interface numberBond {
    label: string;
    value: number;
}


// solve1();
solve2();