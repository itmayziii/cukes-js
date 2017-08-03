#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli = require("commander");
const cucumber_executer_1 = require("./cucumber-executer");
const path = require("path");
const fs_utils_1 = require("./utils/fs-utils");
class CukesJsCli {
    start(packageJson) {
        const packageName = packageJson.name;
        const packageVersion = packageJson.version;
        console.log(`Starting ${packageName} | Version ${packageVersion} | By Tommy May III`);
        cli
            .version(packageVersion)
            .option('-f --features [featureDirectory]', 'Path to look for .feature files', this.getOption)
            .option('-p --processes [maxProcesses]', 'Maximum number of processes to run features against', this.getOption)
            .parse(process.argv);
        new cucumber_executer_1.CucumberExecuter(cli).execute();
    }
    getOption(val) {
        return val;
    }
}
const packageJsonPath = path.resolve(__dirname, '../package.json');
const cukesJsCli = new CukesJsCli();
fs_utils_1.readJsonFile(packageJsonPath).then((packageJson) => {
    cukesJsCli.start(packageJson);
});
