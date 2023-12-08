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
    var file = Utils_1.parseFile("input.txt");
    var instructionSet = __spreadArrays(file[0]);
    var nodes = new NodeBox();
    for (var i = 2; i < file.length; i++) {
        var info = file[i].split(" = ");
        var nodeName = info[0];
        var leftNode = info[1].substring(1, 4);
        var rightNode = info[1].substring(6, 9);
        var node = new Node(nodeName, leftNode, rightNode);
        nodes.add(node);
    }
    var workingNode = nodes.getNode("AAA");
    var destinationNode = nodes.getNode("ZZZ");
    var currentInstruction = 0;
    var output = 0;
    while (workingNode !== destinationNode) {
        if (workingNode !== undefined && instructionSet[currentInstruction] == "L") {
            workingNode = nodes.getNode(workingNode.leftNode);
        }
        else if (workingNode !== undefined) {
            workingNode = nodes.getNode(workingNode.rightNode);
        }
        currentInstruction++;
        if (currentInstruction >= instructionSet.length) {
            currentInstruction = 0;
        }
        output++;
    }
    console.log(output);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
/**
 * Puzzle Solution Description:
 */
function solve2() {
    var start = new Date().getTime();
    var file = Utils_1.parseFile("input.txt");
    var instructionSet = __spreadArrays(file[0]);
    var nodes = new NodeBox();
    for (var i = 2; i < file.length; i++) {
        var info = file[i].split(" = ");
        var nodeName = info[0];
        var leftNode = info[1].substring(1, 4);
        var rightNode = info[1].substring(6, 9);
        var node = new Node(nodeName, leftNode, rightNode);
        nodes.add(node);
    }
    var workingNodes = nodes.getAllStartNodes();
    var steps = [];
    for (var i = 0; i < workingNodes.length; i++) {
        var workingNode = workingNodes[i];
        steps.push(0);
        var currentInstruction = 0;
        while (workingNode !== undefined && workingNode.name.substring(2) !== "Z") {
            if (instructionSet[currentInstruction] == "L") {
                workingNode = nodes.getNode(workingNode.leftNode);
            }
            else {
                workingNode = nodes.getNode(workingNode.rightNode);
            }
            currentInstruction++;
            if (currentInstruction >= instructionSet.length) {
                currentInstruction = 0;
            }
            steps[i]++;
        }
    }
    var lcm = steps[0];
    for (var i = 1; i < steps.length; i++) {
        lcm = getLcm(lcm, steps[i]);
    }
    console.log("Final Output: " + lcm);
    console.log("Application ran in " + ((new Date().getTime() - start) / 1000) + " seconds");
}
//HELPER FUNCTIONS
var Node = /** @class */ (function () {
    function Node(name, left, right) {
        this.name = name;
        this.leftNode = left;
        this.rightNode = right;
    }
    return Node;
}());
var NodeBox = /** @class */ (function () {
    function NodeBox() {
        this.nodes = [];
    }
    NodeBox.prototype.add = function (node) {
        this.nodes.push(node);
    };
    NodeBox.prototype.getNode = function (name) {
        // console.log(this.nodes)
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            // console.log(node.name + " - " + name)
            if (node.name == name) {
                return node;
            }
        }
        return undefined;
    };
    NodeBox.prototype.getAllStartNodes = function () {
        var outputNodes = [];
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.name.substring(2) == "A") {
                outputNodes.push(node);
            }
        }
        return outputNodes;
    };
    return NodeBox;
}());
function getLcm(a, b) {
    return (a / calculateGcd(a, b)) * b;
}
function calculateGcd(smaller, larger) {
    if (larger < smaller) {
        var temp = larger;
        larger = smaller;
        smaller = temp;
    }
    while (true) {
        var remainder = larger % smaller;
        if (remainder == 0) {
            return smaller;
        }
        larger = smaller;
        smaller = remainder;
    }
}
// solve1();
solve2();
