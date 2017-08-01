#!/usr/bin/env node

import cli = require('commander');
import * as fs from 'fs';
import { CucumberExecuter } from './cucumber-executer';
import * as path from 'path';

const packageJsonPath = path.resolve(__dirname, '../../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, {encoding: 'UTF8'}));
const packageName = packageJson.name;
const packageVersion = packageJson.version;
const packageAuthor = packageJson.author;

console.log(`Starting ${packageName} | Version ${packageVersion} | By ${packageAuthor}`);

cli
    .version(packageVersion)
    .option('-b --browser [selectedBrowser]', 'Browser to run tests against.', getOption)
    .option('-f --features [featureDirectory]', 'Path to look for .feature files', getOption)
    .parse(process.argv);

new CucumberExecuter(cli).execute();

function getOption(val: string) {
    return val;
}