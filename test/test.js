/**
 * Copyright (C) 2016 yanni4night.com
 * test.js
 *
 * changelog
 * 2016-07-02[10:02:09]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';

const trans = require('../');
const fs = require('fs');

describe('transpiler-require-name', () => {
    it('should modified', () => {
        const code = trans(fs.readFileSync(__dirname + '/fixtures/fixture.js', 'utf8'), name => {
            return `foo:${name}`;
        });
        //console.log(code);
    });
});