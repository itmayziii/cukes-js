"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber = require("cucumber");
function Before(hookCode) {
    cucumber.defineSupportCode(function ({ Before }) {
        Before(hookCode);
    });
}
exports.Before = Before;
