import { Given, When, Then } from '../../cucumber/step-definitions/index';
import { Before } from "../../cucumber/hooks/before";
import { BeforeAll } from "../../cucumber/hooks/before-all";

Before(() => {
    console.log('BEFORE HOOK CALLED');
});

Given(/^I search for the term cucumber$/, function () {
    return console.log('I searched for cucumber');
});

Then(/^I expect to see google search results$/, function () {
    return console.log('I expect search results');
});