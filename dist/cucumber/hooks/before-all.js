"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber = require("cucumber");
function BeforeAll(hookCode) {
    cucumber.defineSupportCode(function ({ BeforeAll }) {
        BeforeAll(hookCode);
    });
}
exports.BeforeAll = BeforeAll;
//# sourceMappingURL=before-all.js.map