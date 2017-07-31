#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli = require("commander");
const fs = require("fs");
const cucumber_executer_1 = require("./cucumber-executer");
const packageJson = JSON.parse(fs.readFileSync('../../package.json', { encoding: 'UTF8' }));
const packageName = packageJson.name;
const packageVersion = packageJson.version;
const packageAuthor = packageJson.author;
console.log(`Starting ${packageName} | Version ${packageVersion} | By ${packageAuthor}`);
cli
    .version(packageVersion)
    .option('-b --browser [selectedBrowser]', 'Browser to run tests against.', getOption)
    .parse(process.argv);
new cucumber_executer_1.CucumberExecuter().execute(cli);
function getOption(val) {
    return val;
}
//# sourceMappingURL=cli.js.map