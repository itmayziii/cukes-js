import { Given, When, Then } from '../../cucumber/step-definitions/index';
import { Before } from "../../cucumber/hooks/before";
import { BeforeAll } from "../../cucumber/hooks/before-all";

Before(() => {
    console.log('BEFORE HOOK CALLED');
});

Given(/^I search for the term cucumber$/, function () {
    setTimeout(() => {
        return console.log('GOOGLE: I search for the term cucumber');
    }, 3000);
});

Then(/^I expect to see google search results$/, function () {
    setTimeout(() => {
        return console.log('GOOGLE: I expect to see google search results');
    }, 4000);
});

Given(/^I search form cukes-js$/, function () {
    setTimeout(() => {
        return console.log('GITHUB: I search form cukes-js');
    }, 3500);
});

Then(/^I expect to find this library$/, function () {
    setTimeout(() => {
        return console.log('GITHUB: I expect to find this library');
    }, 2000);
});