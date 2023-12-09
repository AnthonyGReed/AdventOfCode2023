import { assert } from "console";
import {parseFile} from "../utilities/Utils"

/**
 * Puzzle Solution Description:
 */
function solve1() {
    const start: number = new Date().getTime();
    let hands: Hand[] = [];
    let finalOutput = 0;
    const file: string[] = parseFile("input.txt");
    for(const line of file) {
        const info = line.split(" ");
        hands.push(new Hand([...info[0]], parseInt(info[1]), false))
    }
    for(const hand of hands) {
        scoreHand(hand);
    }
    hands.sort(handComparator);
    for(let i = 0; i < hands.length; i++) {
        // console.log(hands[i].cardsString + " - " + hands[i].category)
        finalOutput += hands[i].bid * (i + 1)
    }
    console.log(finalOutput);
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

/**
 * Puzzle Solution Description:
 */
function solve2() {
    const start: number = new Date().getTime();
    let hands: Hand[] = [];
    let finalOutput = 0;
    const file: string[] = parseFile("input.txt");
    for(const line of file) {
        const info = line.split(" ");
        hands.push(new Hand([...info[0]], parseInt(info[1]), true))
    }
    for(const hand of hands) {
        scoreHand2(hand);
    }
    hands.sort(handComparator);
    for(let i = 0; i < hands.length; i++) {
        console.log(hands[i].cardsString + " - " + hands[i].category)
        finalOutput += hands[i].bid * (i + 1)
    }
    console.log(finalOutput);
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

//HELPER FUNCTIONS
class Hand {
    cardsString: string[];
    cards: number[] = [];
    bid: number;
    category: HandCategory | undefined;

    constructor(hand: string[], bid: number, puzzle2: boolean) {
        this.cardsString = hand;
        this.bid = bid;
        for(let card of hand) {
            if(card == "T") { card = "10" }
            if(card == "J") { card = "11" }
            if(puzzle2 && card == "11") { card = "1" };
            if(card == "Q") { card = "12" }
            if(card == "K") { card = "13" }
            if(card == "A") { card = "14" }
            this.cards.push(parseInt(card))
        }
    }

    getSortedHand(): number[] {
        let outputArray: number[] = []
        for(const element of this.cards) {
            outputArray.push(element);
        }
        return outputArray.sort(this.cardComparator);
    }

    cardComparator(a: number, b: number) {
        if(a < b) { return -1 }
        if(b > a) { return 1 }
        return 0
    }

}

function scoreHand(hand: Hand) {
    const sortedHand = hand.getSortedHand();
    let handstr: string = "";
    for(const char of hand.cardsString) {
        handstr = handstr.concat(char);
    }
    // console.log(handstr);
    if(handstr.match(/(.)(.*\1){4}/gim)) {
        hand.category = HandCategory.FiveOfAKind;
        return;
    }
    if(handstr.match(/(.)(.*\1){3}/gim)) {
        hand.category = HandCategory.FourOfAKind;
        return;
    }
    if((sortedHand[0] == sortedHand[2] && sortedHand[3] == sortedHand[4]) || 
        (sortedHand[0] == sortedHand[1] && sortedHand[2] == sortedHand[4])) {
        hand.category = HandCategory.FullHouse;
        return;
    }
    if(handstr.match(/(.)(.*\1){2}/gim)) {
        hand.category = HandCategory.ThreeOfAKind;
        return;
    }
    if((sortedHand[0] == sortedHand[1] && (sortedHand[2] == sortedHand[3] || sortedHand[3] == sortedHand[4])) ||
        sortedHand[1] == sortedHand[2] && sortedHand[3] == sortedHand[4]) {
        hand.category = HandCategory.TwoPair;
        return;
    }
    if(handstr.match(/(.)(.*\1){1}/gim)) {
        hand.category = HandCategory.OnePair;
        return;
    }
    hand.category = HandCategory.HighCard;
}

function scoreHand2(hand: Hand) {
    const sortedHand = hand.getSortedHand();
    let handstr: string = "";
    for(const char of hand.cardsString) {
        handstr = handstr.concat(char);
    }
    if(handstr.match(/(.)(.*\1){4}/gim)) {
        hand.category = HandCategory.FiveOfAKind;
        return;
    }
    if(handstr.match(/(.)(.*\1){3}/gim)) {
        hand.category = HandCategory.FourOfAKind;
        if(handstr.match(/J/gim)) { hand.category = HandCategory.FiveOfAKind }
        return;
    }
    if((sortedHand[0] == sortedHand[2] && sortedHand[3] == sortedHand[4]) || 
        (sortedHand[0] == sortedHand[1] && sortedHand[2] == sortedHand[4])) {
        hand.category = HandCategory.FullHouse;
        if(handstr.match(/J/gim)) { hand.category = HandCategory.FiveOfAKind }
        return;
    }
    if(handstr.match(/(.)(.*\1){2}/gim)) {
        hand.category = HandCategory.ThreeOfAKind;
        if(handstr.match(/J/gim)) { hand.category = HandCategory.FourOfAKind }
        if(handstr.match(/(J.*){2}/gim)) { hand.category = HandCategory.FiveOfAKind }
        if(handstr.match(/(J.*){3}/gim)) { hand.category = HandCategory.FourOfAKind }
        return;
    }
    if((sortedHand[0] == sortedHand[1] && (sortedHand[2] == sortedHand[3] || sortedHand[3] == sortedHand[4])) ||
        sortedHand[1] == sortedHand[2] && sortedHand[3] == sortedHand[4]) {
        hand.category = HandCategory.TwoPair;
        if(handstr.match(/J/gim)) { hand.category = HandCategory.FullHouse }
        if(handstr.match(/(J.*){2}/)) { hand.category = HandCategory.FourOfAKind }
        return;
    }
    if(handstr.match(/(.)(.*\1){1}/gim)) {
        hand.category = HandCategory.OnePair;
        if(handstr.match(/J/gim)) { hand.category = HandCategory.ThreeOfAKind }
        return;
    }
    hand.category = HandCategory.HighCard;
    if(handstr.match(/J/gim)) { hand.category = HandCategory.OnePair}
}

function handComparator(a: Hand, b: Hand) {
    if(a.category === undefined) throw new Error("Category undefined");
    if(b.category === undefined) throw new Error("Category undefined");
    if(a.category < b.category) { return -1; }
    if(a.category > b.category) { return 1; }
    if(a.cards[0] < b.cards[0]) { return -1; }
    if(a.cards[0] > b.cards[0]) { return 1; }
    if(a.cards[1] < b.cards[1]) { return -1; }
    if(a.cards[1] > b.cards[1]) { return 1; }
    if(a.cards[2] < b.cards[2]) { return -1; }
    if(a.cards[2] > b.cards[2]) { return 1; }
    if(a.cards[3] < b.cards[3]) { return -1; }
    if(a.cards[3] > b.cards[3]) { return 1; }
    if(a.cards[4] < b.cards[4]) { return -1; }
    if(a.cards[4] > b.cards[4]) { return 1; }
    return 0;
}

enum HandCategory {
    FiveOfAKind = 7,
    FourOfAKind = 6,
    FullHouse = 5,
    ThreeOfAKind = 4,
    TwoPair = 3,
    OnePair = 2,
    HighCard = 1
}

solve1();
solve2();