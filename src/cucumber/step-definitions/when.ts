import cucumber = require('cucumber');
import { StepDefinitionCode } from "cucumber";

export function When(regex: RegExp, stepDefinitionCode: StepDefinitionCode): void {
    cucumber.defineSupportCode(function ({When}) {
        When(regex, stepDefinitionCode);
    });
}