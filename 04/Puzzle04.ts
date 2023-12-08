import {parseFile} from "../utilities/Utils"

/**
 * Puzzle Solution Description: This builds a ticket obejct and ticket book. It scores each ticket and increments
 * the output when the ticket is a winner.
 */
function solve1() {
    const file: string[] = parseFile("input.txt");
    let totalOutput: number = 0;
    let ticketBook: TicketBook = new TicketBook();
    parseTickets(file, ticketBook);
    for(const ticket of ticketBook.getAllTickets()) {
        let ticketScore = 0;
        for(const winner of ticket.winningNumbers) {
            for(const played of ticket.playedNumbers) {
                if(winner == played) {
                    ticketScore = score(ticketScore);
                } 
            }
        }
        totalOutput += ticketScore
    }
    console.log(totalOutput)
    
}

/**
 * Puzzle Solution Description: This is like the previous one, but instead of incrementing a 
 * counter on a win it adds copies to teh next set of objects as per the rules. Rather than
 * creating a bunch of objects and blowing the heap, we instead put an attribute on the ticket
 * that keeps count of how many copies there are.
 */
function solve2() {
    const file: string[] = parseFile("input.txt");
    let totalOutput = 0;
    let ticketBook: TicketBook = new TicketBook();
    parseTickets(file, ticketBook);
    for(const ticket of ticketBook.getAllTickets()) {
        let ticketScore = 0;
        for(const winner of ticket.winningNumbers) {
            for(const played of ticket.playedNumbers) {
                if(winner == played) {
                    ticketScore++;
                } 
            }
        }
        copyTickets(ticket.id, ticketScore, ticket.copies, ticketBook);
    }
    for(let ticket of ticketBook.getAllTickets()) {
        totalOutput += ticket.copies;
    }
    console.log(totalOutput)
}

//HELPER FUNCTIONS
class Ticket {
    id: number;
    winningNumbers: number[];
    playedNumbers: number[];
    copies: number;

    constructor(id: number, winning: number[], played: number[]) {
        this.id = id;
        this.winningNumbers = winning;
        this.playedNumbers = played;
        this.copies = 1;
    }

    addCopies(num: number) {
        this.copies += num;
    }
}

class TicketBook {
    tickets: Ticket[];

    constructor() {
        this.tickets = []
    }

    addTicket(tix: Ticket) {
        this.tickets.push(tix)
    }

    getTicket(id: number): Ticket {
        for(const ticket of this.tickets) {
            if(ticket.id == id) {
                return ticket
            }
        }
        return new Ticket(0,[0],[0]);
    }

    getAllTickets(): Ticket[] {
        return this.tickets;
    }
}

function parseTickets(file: string[], ticketBook: TicketBook) {
    for(const line of file) {
        let ticketInfo: string[] = line.split(": ");
        ticketInfo[0] = ticketInfo[0].replace("   ", " ").replace("  ", " ");
        const ticketId: string[] = ticketInfo[0].split(" ");
        const strNumbers: string[] = ticketInfo[1].split(" | ");
        const strWinning: string[] = strNumbers[0].split(" ");
        const strPlayed: string[] = strNumbers[1].split(" ");
        const id: number = parseInt(ticketId[1]);
        let winningNumbers: number[] = [];
        let playedNumbers: number[] = [];
        for(const str of strWinning) {
            winningNumbers.push(parseInt(str));
        }
        for(const str of strPlayed) {
            playedNumbers.push(parseInt(str));
        }
        const ticket = new Ticket(id, winningNumbers, playedNumbers);
        ticketBook.addTicket(ticket);
    }
}

function score(ticketScore: number): number {
    if(ticketScore == 0) {
        ticketScore++;
    } else {
        ticketScore *= 2;
    }
    return ticketScore;
}

function copyTickets(id: number, score: number, copies: number, ticketBook: TicketBook) {
    for(let i = 1; i <= score; i ++) {
        console.log(id + " is a winner! Adding " + copies + " copies of ticket " + (id + 1))
        ticketBook.getTicket(id + i).addCopies(copies);
    }
}


// solve1();
solve2();