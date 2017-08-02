#!/usr/bin/env node

import cli = require('commander');
import { CucumberExecuter } from './cucumber-executer';
import * as path from 'path';
import { readJsonFile } from "../../utils/utils";
import { PackageJson } from "../../models/package-json";

const packageJsonPath = path.resolve(__dirname, '../../../package.json');
readJsonFile(packageJsonPath).then(startCli);

function getOption(val: string): string {
    return val;
}

function startCli(packageJson: PackageJson): void {
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
}