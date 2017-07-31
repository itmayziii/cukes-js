"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_builder_1 = require("./browser-builder");
class CucumberExecuter {
    execute(cli) {
        const browser = browser_builder_1.BrowserBuilder.build(cli);
        console.log(browser);
    }
}
exports.CucumberExecuter = CucumberExecuter;
//# sourceMappingURL=cucumber-executer.js.map