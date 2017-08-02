import { Given, When, Then } from '../../cucumber/step-definitions/index';
import { Before } from "../../cucumber/hooks/before";

Before(() => {
    console.log('BEFORE HOOK CALLED');
});

Given(/^I search for the term cucumber$/, function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('GOOGLE: I search for the term cucumber');
            resolve();
        }, 3000);
    });
});

Then(/^I expect to see google search results$/, function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('GOOGLE: I expect to see google search results');
            resolve();
        }, 3000);
    });
});

Given(/^I search form cukes-js$/, function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('GITHUB: I search form cukes-js');
            resolve();
        }, 3000);
    });
});

Then(/^I expect to find this library$/, function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('GITHUB: I expect to find this library');
            resolve();
        }, 3000);
    });
});