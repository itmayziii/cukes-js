"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber = require("cucumber");
function When(regex, stepDefinitionCode) {
    cucumber.defineSupportCode(function ({ When }) {
        When(regex, stepDefinitionCode);
    });
}
exports.When = When;
