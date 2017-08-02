"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber = require("cucumber");
function Given(regex, stepDefinitionCode) {
    cucumber.defineSupportCode(function ({ Given }) {
        Given(regex, stepDefinitionCode);
    });
}
exports.Given = Given;
