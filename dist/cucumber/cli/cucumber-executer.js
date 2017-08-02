"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const driver_builder_1 = require("./driver-builder");
const childProcess = require("child_process");
const path = require("path");
const fs = require("fs");
class CucumberExecuter {
    constructor(cli) {
        this.featureDirectory = (cli.features || './features');
        this.browser = (cli.browser || 'chrome');
        this.maxProcesses = (cli.maxProcesses || 5);
    }
    execute() {
        const driver = driver_builder_1.DriverBuilder.build(this.browser);
        const featureFiles = this.listFeatureFiles();
        this.startCucumber(featureFiles);
    }
    listFeatureFiles() {
        return fs.readdirSync(this.featureDirectory).filter((file) => {
            return file.endsWith('.feature');
        });
    }
    startCucumber(featureFiles) {
        const globals = path.resolve(__dirname, '../../../globals.js');
        console.log(globals);
        const cucumberExecutable = path.resolve(__dirname, '../../../node_modules/.bin/cucumberjs');
        featureFiles.forEach((file) => {
            const featureFilePath = path.resolve(this.featureDirectory, file);
            childProcess.fork(cucumberExecutable, [], { execArgv: ['-r', globals, featureFilePath] });
        });
    }
}
exports.CucumberExecuter = CucumberExecuter;
