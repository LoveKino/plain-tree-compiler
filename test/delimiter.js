'use strict';

let {
    parse,
    toJsonObject
} = require('..');
let assert = require('assert');

describe('delimiter', () => {
    it('base', () => {
        assert.deepEqual(toJsonObject(parse('#1\n###4', {
            delimiter: '*'
        })), {
            data: '#1\n###4',
            depth: 0,
            children: []
        });
    });
});
