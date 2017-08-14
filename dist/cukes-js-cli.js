#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli = require("commander");
const cucumber_executor_1 = require("./cucumber-executor");
const path = require("path");
const fs_utils_1 = require("./utils/fs-utils");
class CukesJsCli {
    constructor(cucumberExecutor) {
        this.cucumberExecutor = cucumberExecutor;
    }
    start(packageJson) {
        const packageName = packageJson.name;
        const packageVersion = packageJson.version;
        console.log(`Starting ${packageName} | Version ${packageVersion} | By Tommy May III`);
        cli
            .version(packageVersion)
            .option('-f --features [featureDirectory]', 'Path to look for .feature files', this.getOption)
            .option('-c --concurrency [concurrency]', 'Maximum number of processes to run features against', this.getOption)
            .parse(process.argv);
        this.cucumberExecutor.execute(cli);
    }
    getOption(val) {
        return val;
    }
}
exports.CukesJsCli = CukesJsCli;
const packageJsonPath = path.resolve(__dirname, '../package.json');
const cukesJsCli = new CukesJsCli(new cucumber_executor_1.CucumberExecutor());
fs_utils_1.readJsonFile(packageJsonPath).then((packageJson) => {
    cukesJsCli.start(packageJson);
});
