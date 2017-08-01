"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../cucumber/step-definitions/index");
const before_1 = require("../../cucumber/hooks/before");
before_1.Before(() => {
    console.log('BEFORE HOOK CALLED');
});
index_1.Given(/^I search for the term cucumber$/, function () {
    setTimeout(() => {
        return console.log('GOOGLE: I search for the term cucumber');
    }, 3000);
});
index_1.Then(/^I expect to see google search results$/, function () {
    setTimeout(() => {
        return console.log('GOOGLE: I expect to see google search results');
    }, 4000);
});
index_1.Given(/^I search form cukes-js$/, function () {
    setTimeout(() => {
        return console.log('GITHUB: I search form cukes-js');
    }, 3500);
});
index_1.Then(/^I expect to find this library$/, function () {
    setTimeout(() => {
        return console.log('GITHUB: I expect to find this library');
    }, 2000);
});
//# sourceMappingURL=google.steps.js.map