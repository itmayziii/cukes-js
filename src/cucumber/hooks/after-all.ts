import cucumber = require('cucumber');
import { HookCode } from "cucumber";

export function AfterAll(hookCode: HookCode) {
    cucumber.defineSupportCode(function ({AfterAll}) { // TODO waiting for feature to be published - https://github.com/cucumber/cucumber-js/pull/878
        AfterAll(hookCode);
    });
}