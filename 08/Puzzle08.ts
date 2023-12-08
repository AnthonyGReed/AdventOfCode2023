import {parseFile} from "../utilities/Utils"

/**
 * Puzzle Solution Description:
 */
function solve1() {
    const start: number = new Date().getTime();
    const file: string[] = parseFile("input.txt");
    const instructionSet: string[] = [...file[0]];
    const nodes: NodeBox = new NodeBox();
    for(let i = 2; i < file.length; i++) {
        const info: string[] = file[i].split(" = ");
        const nodeName: string = info[0];
        const leftNode: string = info[1].substring(1, 4);
        const rightNode: string = info[1].substring(6, 9);
        const node: Node = new Node(nodeName, leftNode, rightNode);
        nodes.add(node);
    }
    let workingNode: Node | undefined = nodes.getNode("AAA");
    let destinationNode: Node | undefined = nodes.getNode("ZZZ");
    let currentInstruction: number = 0;
    let output: number = 0;
    while(workingNode !== destinationNode) {
        if(workingNode !== undefined && instructionSet[currentInstruction] == "L") {
            workingNode = nodes.getNode(workingNode.leftNode);
        } else if(workingNode !== undefined) {
            workingNode = nodes.getNode(workingNode.rightNode);
        }
        currentInstruction++;
        if(currentInstruction >= instructionSet.length) {
            currentInstruction = 0;
        }
        output++;
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
    const instructionSet: string[] = [...file[0]];
    const nodes: NodeBox = new NodeBox();
    for(let i = 2; i < file.length; i++) {
        const info: string[] = file[i].split(" = ");
        const nodeName: string = info[0];
        const leftNode: string = info[1].substring(1, 4);
        const rightNode: string = info[1].substring(6, 9);
        const node: Node = new Node(nodeName, leftNode, rightNode);
        nodes.add(node);
    }
    let workingNodes: Node[] = nodes.getAllStartNodes();
    let steps: number[] = [];
    for(let i = 0; i < workingNodes.length; i++) {
        let workingNode: Node | undefined = workingNodes[i];
        steps.push(0);
        let currentInstruction = 0;
        while(workingNode !== undefined && workingNode.name.substring(2) !== "Z") {
            if(instructionSet[currentInstruction] == "L") {
                workingNode = nodes.getNode(workingNode.leftNode);
            } else {
                workingNode = nodes.getNode(workingNode.rightNode)
            }
            currentInstruction++;
            if(currentInstruction >= instructionSet.length) {
                currentInstruction = 0;
            }
            steps[i]++;
        }
    }
    let lcm: number = steps[0];
    for(let i = 1; i < steps.length; i++) {
        lcm = getLcm(lcm, steps[i]);
    }
    console.log("Final Output: " + lcm);
    console.log("Application ran in " + ((new Date().getTime() - start)/1000) + " seconds");
}

//HELPER FUNCTIONS
class Node {
    name: string;
    leftNode: string;
    rightNode: string;

    constructor(name: string, left: string, right: string) {
        this.name = name;
        this.leftNode = left;
        this.rightNode = right;
    }
}

class NodeBox {
    nodes: Node[];

    constructor() {
        this.nodes = [];
    }

    add(node: Node) {
        this.nodes.push(node);
    }

    getNode(name: string): Node | undefined {
        // console.log(this.nodes)
        for(const node of this.nodes) {
            // console.log(node.name + " - " + name)
            if(node.name == name) {
                return node;
            }
        }
        return undefined;
    }

    getAllStartNodes(): Node[] {
        const outputNodes: Node[] = [];
        for(const node of this.nodes) {
            if(node.name.substring(2) == "A") { outputNodes.push(node) }
        }
        return outputNodes;
    }
}

function getLcm(a: number, b: number): number {
    return (a/calculateGcd(a,b)) * b;
}

function calculateGcd(smaller: number, larger: number): number {
    if( larger < smaller ) {
        let temp = larger;
        larger = smaller;
        smaller = temp;
    }
    while(true) {
        let remainder = larger % smaller;
        if(remainder == 0) {
            return smaller;
        }
        larger = smaller;
        smaller = remainder;
    }
}

// solve1();
solve2();