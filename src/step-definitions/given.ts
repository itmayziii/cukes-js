import cucumber = require('cucumber');
import { StepDefinitionCode } from "cucumber";

export function Given(regex: RegExp, stepDefinitionCode: StepDefinitionCode) {
    cucumber.defineSupportCode(function ({Given}) {

        Given(regex, stepDefinitionCode);

    });
}