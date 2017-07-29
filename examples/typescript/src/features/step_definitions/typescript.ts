import { Given, When, Then } from '../../../../../src/step-definitions/index';

Given(/^I work$/, function () {
    console.log('Calling step I WORK');
});

When(/^And I like to (.*) on the weekends$/, function (exampleRegex) {
    console.log('Calling step AND I LIKE TO (.*) ON THE WEEKENDS with argument ', exampleRegex);
});

Then(/^I will do that thing$/, function () {
    console.log('calling step I WILL DO THAT THING');
});