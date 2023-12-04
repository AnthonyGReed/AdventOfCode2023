"use strict";
exports.__esModule = true;
var Utils_1 = require("../utilities/Utils");
/**
 * Puzzle Solution Description:
 */
function solve1() {
    var file = Utils_1.parseFile("input.txt");
    var totalOutput = 0;
    var ticketBook = new TicketBook();
    parseTickets(file, ticketBook);
    for (var _i = 0, _a = ticketBook.getAllTickets(); _i < _a.length; _i++) {
        var ticket = _a[_i];
        var ticketScore = 0;
        for (var _b = 0, _c = ticket.winningNumbers; _b < _c.length; _b++) {
            var winner = _c[_b];
            for (var _d = 0, _e = ticket.playedNumbers; _d < _e.length; _d++) {
                var played = _e[_d];
                if (winner == played) {
                    ticketScore = score(ticketScore);
                }
            }
        }
        totalOutput += ticketScore;
    }
    console.log(totalOutput);
}
/**
 * Puzzle Solution Description:
 */
function solve2() {
    var file = Utils_1.parseFile("input.txt");
    var totalOutput = 0;
    var ticketBook = new TicketBook();
    parseTickets(file, ticketBook);
    for (var _i = 0, _a = ticketBook.getAllTickets(); _i < _a.length; _i++) {
        var ticket = _a[_i];
        var ticketScore = 0;
        for (var _b = 0, _c = ticket.winningNumbers; _b < _c.length; _b++) {
            var winner = _c[_b];
            for (var _d = 0, _e = ticket.playedNumbers; _d < _e.length; _d++) {
                var played = _e[_d];
                if (winner == played) {
                    ticketScore++;
                }
            }
        }
        copyTickets(ticket.id, ticketScore, ticket.copies, ticketBook);
    }
    for (var _f = 0, _g = ticketBook.getAllTickets(); _f < _g.length; _f++) {
        var ticket = _g[_f];
        totalOutput += ticket.copies;
    }
    console.log(totalOutput);
}
//HELPER FUNCTIONS
var Ticket = /** @class */ (function () {
    function Ticket(id, winning, played) {
        this.id = id;
        this.winningNumbers = winning;
        this.playedNumbers = played;
        this.copies = 1;
    }
    Ticket.prototype.addCopies = function (num) {
        this.copies += num;
    };
    return Ticket;
}());
var TicketBook = /** @class */ (function () {
    function TicketBook() {
        this.tickets = [];
    }
    TicketBook.prototype.addTicket = function (tix) {
        this.tickets.push(tix);
    };
    TicketBook.prototype.getTicket = function (id) {
        for (var _i = 0, _a = this.tickets; _i < _a.length; _i++) {
            var ticket = _a[_i];
            if (ticket.id == id) {
                return ticket;
            }
        }
        return new Ticket(0, [0], [0]);
    };
    TicketBook.prototype.getAllTickets = function () {
        return this.tickets;
    };
    return TicketBook;
}());
function parseTickets(file, ticketBook) {
    for (var _i = 0, file_1 = file; _i < file_1.length; _i++) {
        var line = file_1[_i];
        var ticketInfo = line.split(": ");
        ticketInfo[0] = ticketInfo[0].replace("   ", " ").replace("  ", " ");
        var ticketId = ticketInfo[0].split(" ");
        var strNumbers = ticketInfo[1].split(" | ");
        var strWinning = strNumbers[0].split(" ");
        var strPlayed = strNumbers[1].split(" ");
        var id = parseInt(ticketId[1]);
        var winningNumbers = [];
        var playedNumbers = [];
        for (var _a = 0, strWinning_1 = strWinning; _a < strWinning_1.length; _a++) {
            var str = strWinning_1[_a];
            winningNumbers.push(parseInt(str));
        }
        for (var _b = 0, strPlayed_1 = strPlayed; _b < strPlayed_1.length; _b++) {
            var str = strPlayed_1[_b];
            playedNumbers.push(parseInt(str));
        }
        var ticket = new Ticket(id, winningNumbers, playedNumbers);
        ticketBook.addTicket(ticket);
    }
}
function score(ticketScore) {
    if (ticketScore == 0) {
        ticketScore++;
    }
    else {
        ticketScore *= 2;
    }
    return ticketScore;
}
function copyTickets(id, score, copies, ticketBook) {
    for (var i = 1; i <= score; i++) {
        console.log(id + " is a winner! Adding " + copies + " copies of ticket " + (id + 1));
        ticketBook.getTicket(id + i).addCopies(copies);
    }
}
// solve1();
solve2();
