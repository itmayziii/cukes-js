"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber = require("cucumber");
function After(hookCode) {
    cucumber.defineSupportCode(function ({ After }) {
        After(hookCode);
    });
}
exports.After = After;
