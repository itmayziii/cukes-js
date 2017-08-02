"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber = require("cucumber");
function AfterAll(hookCode) {
    cucumber.defineSupportCode(function ({ AfterAll }) {
        AfterAll(hookCode);
    });
}
exports.AfterAll = AfterAll;
