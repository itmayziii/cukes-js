"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class CucumberReporter {
    constructor(generator) {
        this.generator = generator;
        this.defaultOutputPath = path.resolve(__dirname, '../cucumber-output');
        this._options = {
            theme: 'bootstrap',
            jsonDir: this.defaultOutputPath,
            output: path.resolve(this.defaultOutputPath, 'cucumber_report.html'),
            reportSuiteAsScenarios: true,
            launchReport: true,
            metadata: {
                "Generated By:": "cukes-js"
            }
        };
    }
    generate() {
        this.generator.generate(this.options);
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = Object.assign(this.options, value);
    }
}
exports.CucumberReporter = CucumberReporter;
