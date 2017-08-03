#!/usr/bin/env node

import cli = require('commander');
import { CucumberExecuter } from './cucumber-executer';
import * as path from 'path';
import { readJsonFile } from "./utils/fs-utils";
import { PackageJson } from "./models/package-json";

export class CukesJsCli {
    public constructor(private cucumberExecuter: CucumberExecuter) {
    }

    public start(packageJson: PackageJson): void {
        const packageName = packageJson.name;
        const packageVersion = packageJson.version;

        console.log(`Starting ${packageName} | Version ${packageVersion} | By Tommy May III`);

        cli
            .version(packageVersion)
            .option('-f --features [featureDirectory]', 'Path to look for .feature files', this.getOption)
            .option('-p --processes [maxProcesses]', 'Maximum number of processes to run features against', this.getOption)
            .parse(process.argv);

        this.cucumberExecuter.execute(cli);
    }

    private getOption(val: string): string {
        return val;
    }
}

const packageJsonPath = path.resolve(__dirname, '../package.json');
const cukesJsCli = new CukesJsCli(new CucumberExecuter());

readJsonFile(packageJsonPath).then((packageJson) => {
    cukesJsCli.start(packageJson);
});