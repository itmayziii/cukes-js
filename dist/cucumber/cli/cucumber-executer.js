"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const path = require("path");
const fs = require("fs");
class CucumberExecuter {
    constructor(cli) {
        this.featureDirectory = (cli.features || './features');
        this.browser = (cli.browser || 'chrome');
    }
    execute() {
        const featureFiles = this.listFeatureFiles();
        this.startCucumber(featureFiles);
    }
    listFeatureFiles() {
        return fs.readdirSync(this.featureDirectory).filter((file) => {
            return file.endsWith('.feature');
        });
    }
    startCucumber(featureFiles) {
        featureFiles.forEach((file) => {
            const cucumberExecutable = path.resolve(__dirname, '../../../node_modules/.bin/cucumberjs');
            const featureFilePath = path.resolve(this.featureDirectory, file);
            console.log('CUCUMBER EXECUTABLE', cucumberExecutable);
            console.log('FEATURE FILE PATH', featureFilePath);
            childProcess.fork(cucumberExecutable, [featureFilePath]);
        });
    }
}
exports.CucumberExecuter = CucumberExecuter;
//# sourceMappingURL=cucumber-executer.js.map