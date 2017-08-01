import cucumber = require('cucumber');
import { HookCode } from "cucumber";

export function BeforeAll(hookCode: HookCode) {
    cucumber.defineSupportCode(function ({BeforeAll}) { // TODO add to @types/cucumber
        BeforeAll(hookCode);
    });
}