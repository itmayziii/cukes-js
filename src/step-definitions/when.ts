import cucumber = require('cucumber');
import { StepDefinitionCode } from "cucumber";

export function When(regex: RegExp, stepDefinitionCode: StepDefinitionCode) {
    cucumber.defineSupportCode(function ({When}) {

        When(regex, stepDefinitionCode);

    });
}