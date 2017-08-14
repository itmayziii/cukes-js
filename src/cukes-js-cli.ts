#!/usr/bin/env node

import cli = require('commander');
import { CucumberExecutor } from './cucumber-executor';
import * as path from 'path';
import { readJsonFile } from "./utils/fs-utils";
import { PackageJson } from "./models/package-json";

export class CukesJsCli {
    public constructor(private cucumberExecutor: CucumberExecutor) {
    }

    public start(packageJson: PackageJson): void {
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

    private getOption(val: string): string {
        return val;
    }
}

const packageJsonPath = path.resolve(__dirname, '../package.json');
const cukesJsCli = new CukesJsCli(new CucumberExecutor());
readJsonFile(packageJsonPath).then((packageJson) => {
    cukesJsCli.start(packageJson);
});