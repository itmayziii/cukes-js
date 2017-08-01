import cucumber = require('cucumber');
import { HookCode } from "cucumber";

export function After(hookCode: HookCode) {
    cucumber.defineSupportCode(function ({After}) {
        After(hookCode);
    });
}