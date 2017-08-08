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
});
