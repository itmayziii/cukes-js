"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../cucumber/step-definitions/index");
const before_1 = require("../../cucumber/hooks/before");
before_1.Before(() => {
    console.log('BEFORE HOOK CALLED');
});
index_1.Given(/^I search for the term cucumber$/, function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('GOOGLE: I search for the term cucumber');
            resolve();
        }, 3000);
    });
});
index_1.Then(/^I expect to see google search results$/, function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('GOOGLE: I expect to see google search results');
            resolve();
        }, 3000);
    });
});
index_1.Given(/^I search form cukes-js$/, function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('GITHUB: I search form cukes-js');
            resolve();
        }, 3000);
    });
});
index_1.Then(/^I expect to find this library$/, function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('GITHUB: I expect to find this library');
            resolve();
        }, 3000);
    });
});
