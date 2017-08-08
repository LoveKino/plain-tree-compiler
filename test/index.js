'use strict';

let {
    parse,
    toJsonObject
} = require('..');
let assert = require('assert');

let testData = {
    '#abc': {
        data: null,
        depth: 0,
        children: [{
            data: 'abc',
            depth: 1,
            children: []
        }]
    },

    '#abc\ndef': {
        data: null,
        depth: 0,
        children: [{
            data: 'abc\ndef',
            depth: 1,
            children: []
        }]
    },

    'start\n#abc': {
        data: 'start',
        depth: 0,
        children: [{
            data: 'abc',
            depth: 1,
            children: []
        }]
    },

    '#a\n##b': {
        'data': null,
        'depth': 0,
        'children': [{
            'data': 'a',
            'depth': 1,
            'children': [{
                'data': 'b',
                'depth': 2,
                'children': []
            }]
        }]
    },

    '#a\n##b\n##c': {
        'data': null,
        'depth': 0,
        'children': [{
            'data': 'a',
            'depth': 1,
            'children': [{
                'data': 'b',
                'depth': 2,
                'children': []
            }, {
                'data': 'c',
                'depth': 2,
                'children': []
            }]
        }]
    },

    '#a\n##b\n###de\n##c': {
        'data': null,
        'depth': 0,
        'children': [{
            'data': 'a',
            'depth': 1,
            'children': [{
                'data': 'b',
                'depth': 2,
                'children': [{
                    'data': 'de',
                    'depth': 3,
                    'children': []
                }]
            }, {
                'data': 'c',
                'depth': 2,
                'children': []
            }]
        }]
    }
};

describe('index', () => {
    for (let text in testData) {
        it(text, () => {
            //console.log(JSON.stringify(toJsonObject(parse(text))));
            assert.deepEqual(toJsonObject(parse(text)), testData[text]);
        });
    }
});
