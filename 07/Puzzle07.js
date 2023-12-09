"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Utils_1 = require("../utilities/Utils");
/**
 * Puzzle Solution Description:
 */
function solve1() {
    var start = new Date().getTime();
    var hands = [];
    var finalOutput = 0;
    var file = Utils_1.parseFile("input.txt");
    for (var _i = 0, file_1 = file; _i < file_1.length; _i++) {
        var line = file_1[_i];
        var info = line.split(" ");
        hands.push(new Hand(__spreadArrays(info[0]), parseInt(info[1]), false));
    }
    for (var _a = 0, hands_1 = hands; _a < hands_1.length; _a++) {
        var hand = hands_1[_a];
        scoreHand(hand);
    }
    hands.sort(handComparator);
    for (var i = 0; i < hands.length; i++) {
        // console.log(hands[i].cardsString + " - " + hands[i].category)
        finalOutput += hands[i].bid * (i + 1);
    }
    console.log(finalOutput);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
/**
 * Puzzle Solution Description:
 */
function solve2() {
    var start = new Date().getTime();
    var hands = [];
    var finalOutput = 0;
    var file = Utils_1.parseFile("input.txt");
    for (var _i = 0, file_2 = file; _i < file_2.length; _i++) {
        var line = file_2[_i];
        var info = line.split(" ");
        hands.push(new Hand(__spreadArrays(info[0]), parseInt(info[1]), true));
    }
    for (var _a = 0, hands_2 = hands; _a < hands_2.length; _a++) {
        var hand = hands_2[_a];
        scoreHand2(hand);
    }
    hands.sort(handComparator);
    for (var i = 0; i < hands.length; i++) {
        console.log(hands[i].cardsString + " - " + hands[i].category);
        finalOutput += hands[i].bid * (i + 1);
    }
    console.log(finalOutput);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
//HELPER FUNCTIONS
var Hand = /** @class */ (function () {
    function Hand(hand, bid, puzzle2) {
        this.cards = [];
        this.cardsString = hand;
        this.bid = bid;
        for (var _i = 0, hand_1 = hand; _i < hand_1.length; _i++) {
            var card = hand_1[_i];
            if (card == "T") {
                card = "10";
            }
            if (card == "J") {
                card = "11";
            }
            if (puzzle2 && card == "11") {
                card = "1";
            }
            ;
            if (card == "Q") {
                card = "12";
            }
            if (card == "K") {
                card = "13";
            }
            if (card == "A") {
                card = "14";
            }
            this.cards.push(parseInt(card));
        }
    }
    Hand.prototype.getSortedHand = function () {
        var outputArray = [];
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var element = _a[_i];
            outputArray.push(element);
        }
        return outputArray.sort(this.cardComparator);
    };
    Hand.prototype.cardComparator = function (a, b) {
        if (a < b) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    };
    return Hand;
}());
function scoreHand(hand) {
    var sortedHand = hand.getSortedHand();
    var handstr = "";
    for (var _i = 0, _a = hand.cardsString; _i < _a.length; _i++) {
        var char = _a[_i];
        handstr = handstr.concat(char);
    }
    // console.log(handstr);
    if (handstr.match(/(.)(.*\1){4}/gim)) {
        hand.category = HandCategory.FiveOfAKind;
        return;
    }
    if (handstr.match(/(.)(.*\1){3}/gim)) {
        hand.category = HandCategory.FourOfAKind;
        return;
    }
    if ((sortedHand[0] == sortedHand[2] && sortedHand[3] == sortedHand[4]) ||
        (sortedHand[0] == sortedHand[1] && sortedHand[2] == sortedHand[4])) {
        hand.category = HandCategory.FullHouse;
        return;
    }
    if (handstr.match(/(.)(.*\1){2}/gim)) {
        hand.category = HandCategory.ThreeOfAKind;
        return;
    }
    if ((sortedHand[0] == sortedHand[1] && (sortedHand[2] == sortedHand[3] || sortedHand[3] == sortedHand[4])) ||
        sortedHand[1] == sortedHand[2] && sortedHand[3] == sortedHand[4]) {
        hand.category = HandCategory.TwoPair;
        return;
    }
    if (handstr.match(/(.)(.*\1){1}/gim)) {
        hand.category = HandCategory.OnePair;
        return;
    }
    hand.category = HandCategory.HighCard;
}
function scoreHand2(hand) {
    var sortedHand = hand.getSortedHand();
    var handstr = "";
    for (var _i = 0, _a = hand.cardsString; _i < _a.length; _i++) {
        var char = _a[_i];
        handstr = handstr.concat(char);
    }
    if (handstr.match(/(.)(.*\1){4}/gim)) {
        hand.category = HandCategory.FiveOfAKind;
        return;
    }
    if (handstr.match(/(.)(.*\1){3}/gim)) {
        hand.category = HandCategory.FourOfAKind;
        if (handstr.match(/J/gim)) {
            hand.category = HandCategory.FiveOfAKind;
        }
        return;
    }
    if ((sortedHand[0] == sortedHand[2] && sortedHand[3] == sortedHand[4]) ||
        (sortedHand[0] == sortedHand[1] && sortedHand[2] == sortedHand[4])) {
        hand.category = HandCategory.FullHouse;
        if (handstr.match(/J/gim)) {
            hand.category = HandCategory.FiveOfAKind;
        }
        return;
    }
    if (handstr.match(/(.)(.*\1){2}/gim)) {
        hand.category = HandCategory.ThreeOfAKind;
        if (handstr.match(/J/gim)) {
            hand.category = HandCategory.FourOfAKind;
        }
        if (handstr.match(/(J.*){2}/gim)) {
            hand.category = HandCategory.FiveOfAKind;
        }
        if (handstr.match(/(J.*){3}/gim)) {
            hand.category = HandCategory.FourOfAKind;
        }
        return;
    }
    if ((sortedHand[0] == sortedHand[1] && (sortedHand[2] == sortedHand[3] || sortedHand[3] == sortedHand[4])) ||
        sortedHand[1] == sortedHand[2] && sortedHand[3] == sortedHand[4]) {
        hand.category = HandCategory.TwoPair;
        if (handstr.match(/J/gim)) {
            hand.category = HandCategory.FullHouse;
        }
        if (handstr.match(/(J.*){2}/)) {
            hand.category = HandCategory.FourOfAKind;
        }
        return;
    }
    if (handstr.match(/(.)(.*\1){1}/gim)) {
        hand.category = HandCategory.OnePair;
        if (handstr.match(/J/gim)) {
            hand.category = HandCategory.ThreeOfAKind;
        }
        return;
    }
    hand.category = HandCategory.HighCard;
    if (handstr.match(/J/gim)) {
        hand.category = HandCategory.OnePair;
    }
}
function handComparator(a, b) {
    if (a.category === undefined)
        throw new Error("Category undefined");
    if (b.category === undefined)
        throw new Error("Category undefined");
    if (a.category < b.category) {
        return -1;
    }
    if (a.category > b.category) {
        return 1;
    }
    if (a.cards[0] < b.cards[0]) {
        return -1;
    }
    if (a.cards[0] > b.cards[0]) {
        return 1;
    }
    if (a.cards[1] < b.cards[1]) {
        return -1;
    }
    if (a.cards[1] > b.cards[1]) {
        return 1;
    }
    if (a.cards[2] < b.cards[2]) {
        return -1;
    }
    if (a.cards[2] > b.cards[2]) {
        return 1;
    }
    if (a.cards[3] < b.cards[3]) {
        return -1;
    }
    if (a.cards[3] > b.cards[3]) {
        return 1;
    }
    if (a.cards[4] < b.cards[4]) {
        return -1;
    }
    if (a.cards[4] > b.cards[4]) {
        return 1;
    }
    return 0;
}
var HandCategory;
(function (HandCategory) {
    HandCategory[HandCategory["FiveOfAKind"] = 7] = "FiveOfAKind";
    HandCategory[HandCategory["FourOfAKind"] = 6] = "FourOfAKind";
    HandCategory[HandCategory["FullHouse"] = 5] = "FullHouse";
    HandCategory[HandCategory["ThreeOfAKind"] = 4] = "ThreeOfAKind";
    HandCategory[HandCategory["TwoPair"] = 3] = "TwoPair";
    HandCategory[HandCategory["OnePair"] = 2] = "OnePair";
    HandCategory[HandCategory["HighCard"] = 1] = "HighCard";
})(HandCategory || (HandCategory = {}));
solve1();
solve2();
