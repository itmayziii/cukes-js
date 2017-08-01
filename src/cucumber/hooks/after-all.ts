import cucumber = require('cucumber');
import { HookCode } from "cucumber";

export function AfterAll(hookCode: HookCode) {
    cucumber.defineSupportCode(function ({AfterAll}) { // TODO add to @types/cucumber
        AfterAll(hookCode);
    });
}