#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli = require("commander");
const cucumber_executer_1 = require("./cucumber-executer");
const path = require("path");
const utils_1 = require("../../utils/utils");
const packageJsonPath = path.resolve(__dirname, '../../../package.json');
utils_1.readJsonFile(packageJsonPath).then(startCli);
function getOption(val) {
    return val;
}
function startCli(packageJson) {
    const packageName = packageJson.name;
    const packageVersion = packageJson.version;
    const packageAuthor = packageJson.author;
    console.log(`Starting ${packageName} | Version ${packageVersion} | By ${packageAuthor}`);
    cli
        .version(packageVersion)
        .option('-b --browser [selectedBrowser]', 'Browser to run tests against.', getOption)
        .option('-f --features [featureDirectory]', 'Path to look for .feature files', getOption)
        .parse(process.argv);
    new cucumber_executer_1.CucumberExecuter(cli).execute();
}
