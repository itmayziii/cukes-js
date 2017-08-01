import cucumber = require('cucumber');
import { HookCode } from "cucumber";

export function Before(hookCode: HookCode) {
    cucumber.defineSupportCode(function ({Before}) {
        Before(hookCode);
    });
}