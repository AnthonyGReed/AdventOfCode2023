import {parseFile} from "../utilities/Utils"

/**
 * To solve this we break each line into an array, then we itterate through each character until we find a number.
 * We add that number to our total times ten and then reitterate over the array coming from the other direction.
 */
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

/**
 * General idea is the same with this one as it was with the previous one. We spit the array up into characters and test each character,
 * the only difference is that we also use that characters index to check if it is the start of a number word. If it is, we return the number
 * and start from the back end.
 */
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

//HELPER FUNCTIONS

/**
 * This function lets us check the index of the character we are working with to see if there is a number word in that
 * position. If there is, it returns the corresponding value, if not it returns 0.
 * @param i Index of the character in question
 * @param input Line the character is part of
 * @returns Value of a number word found or zero
 */
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

/**
 * This interface is for checkForNumberWords so we can crosswalk the value with the english word
 */
interface numberBond {
    label: string;
    value: number;
}


// solve1();
solve2();