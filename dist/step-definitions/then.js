"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber = require("cucumber");
function Then(regex, stepDefinitionCode) {
    cucumber.defineSupportCode(function ({ Then }) {
        Then(regex, stepDefinitionCode);
    });
}
exports.Then = Then;
//# sourceMappingURL=then.js.map