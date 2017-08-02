import cucumber = require('cucumber');
import { StepDefinitionCode } from "cucumber";

export function Then(regex: RegExp, stepDefinitionCode: StepDefinitionCode): void {
    cucumber.defineSupportCode(function ({Then}) {
        Then(regex, stepDefinitionCode);
    });
}