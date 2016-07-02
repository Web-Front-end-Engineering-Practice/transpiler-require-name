/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-07-02[09:59:03]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';
const babylon = require('babylon');
module.exports = (code, transform) => {
    const ast = babylon.parse(code);

    const requires = [];

    JSON.stringify(ast, (key, value) => {
        if (value && 'CallExpression' === value.type && value.callee && 'require' === value.callee.name &&
            Array.isArray(value.arguments)) {
            if (value.arguments.length === 1 && 'StringLiteral' === value.arguments[0].type) {
                requires.push(value.arguments[0]);
            }
        }

        return value;
    });

    for (let i = requires.length - 1; i > -1; --i) {
        code = code.slice(0, requires[i].start) + transform(requires[i].value) + code.slice(requires[i]
            .end);
    }
    return code;
};