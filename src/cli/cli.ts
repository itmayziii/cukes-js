#!/usr/bin/env node

import cli = require('commander');
import * as fs from 'fs';
import { CucumberExecuter } from './cucumber-executer';

const packageJson = JSON.parse(fs.readFileSync('../../package.json', {encoding: 'UTF8'}));
const packageName = packageJson.name;
const packageVersion = packageJson.version;
const packageAuthor = packageJson.author;

console.log(`Starting ${packageName} | Version ${packageVersion} | By ${packageAuthor}`);

cli
    .version(packageVersion)
    .option('-b --browser [selectedBrowser]', 'Browser to run tests against.', getOption)
    .parse(process.argv);

new CucumberExecuter().execute(cli);

function getOption(val: string) {
    return val;
}