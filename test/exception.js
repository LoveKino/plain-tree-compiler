'use strict';

let {
    parse
} = require('..');
let assert = require('assert');

describe('exception', () => {
    it('depth', (done) => {
        try {
            parse('#1\n###4');
        } catch (err) {
            assert(err.toString().indexOf('Depth can only be increased step by step') !== -1);
            done();
        }
    });

    it('max depth', (done) => {
        parse('#1\n##4', {
            maxDepth: 2
        });

        try {
            parse('#1\n##4', {
                maxDepth: 1
            });
        } catch (err) {
            assert(err.toString().indexOf('The delimiter length is over than the max depth') !== -1);
            done();
        }
    });
});
