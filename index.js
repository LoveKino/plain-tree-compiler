'use strict';

/**
 * a simple way to write down a tree with out indent or brackets
 *
 * node = {
 *    data: "",
 *    children: []
 * }
 */

let parse = (str) => {
    let lines = str.split('\n');

    let tokens = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        tokens.push(parseLine(line));
    }

    let tree = newNode();
    let refer = tree;

    for (let i = 0; i < tokens.length; i++) {
        let {
            wellCount,
            line
        } = tokens[i];
        if (wellCount === 0) {
            addLine(refer, line);
        } else {
            // find the parent
            // create new node
            // add the new node to parent's children
            if (wellCount <= refer.depth + 1) {
                let node = newNode(wellCount);
                let ancestor = getAncestor(refer, wellCount - 1);
                addChild(ancestor, node);
                addLine(node, line);

                // change refer
                refer = node;
            } else {
                throw new Error(`Depth can only be increased step by step. Token info: ${wellCount}, ${line}.`);
            }
        }
    }

    return tree;
};

let toJsonObject = (tree) => {
    return {
        data: tree.data,
        depth: tree.depth,
        children: tree.children.map((child) => toJsonObject(child))
    };
};

let getAncestor = (node, ancestorDepth) => {
    if (node.depth < ancestorDepth) return null;
    else if (node.depth === ancestorDepth) return node;
    else {
        return getAncestor(node.parent, ancestorDepth);
    }
};

let newNode = (depth = 0) => {
    return {
        data: null,
        children: [],
        depth,
        parent: null
    };
};

let addChild = (node1, node2) => {
    node1.children.push(node2);
    node2.parent = node1;
};

let addLine = (node, line) => {
    if (node.data === null) {
        node.data = line;
    } else {
        node.data += ('\n' + line);
    }
};

let parseLine = (line) => {
    let wellCount = 0;

    let trimedLine = line.trim();
    if (trimedLine[0] === '#') {
        line = trimedLine;
    }

    while (line[0] === '#') {
        wellCount++;
        line = line.substring(1);
    }

    return {
        line,
        wellCount
    };
};

module.exports = {
    parse,
    toJsonObject
};
