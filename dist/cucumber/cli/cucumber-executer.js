"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const driver_builder_1 = require("./driver-builder");
class CucumberExecuter {
    execute(cli) {
        const driver = driver_builder_1.DriverBuilder.build(cli);
    }
}
exports.CucumberExecuter = CucumberExecuter;
//# sourceMappingURL=cucumber-executer.js.map