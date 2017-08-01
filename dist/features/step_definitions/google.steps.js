"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../cucumber/step-definitions/index");
const before_1 = require("../../cucumber/hooks/before");
before_1.Before(() => {
    console.log('BEFORE HOOK CALLED');
});
index_1.Given(/^I search for the term cucumber$/, function () {
    return console.log('I searched for cucumber');
});
index_1.Then(/^I expect to see google search results$/, function () {
    return console.log('I expect search results');
});
//# sourceMappingURL=google.steps.js.map