#!/usr/bin/env node

import cli = require('commander');
import { CucumberExecuter } from './cucumber-executer';
import * as path from 'path';
import { readJsonFile } from "./utils/fs-utils";
import { PackageJson } from "./models/package-json";

class CukesJsCli {
    public start(packageJson: PackageJson): void {
        const packageName = packageJson.name;
        const packageVersion = packageJson.version;

        console.log(`Starting ${packageName} | Version ${packageVersion} | By Tommy May III`);
        console.log(this.getOption);

        cli
            .version(packageVersion)
            .option('-f --features [featureDirectory]', 'Path to look for .feature files', this.getOption)
            .option('-p --processes [maxProcesses]', 'Maximum number of processes to run features against', this.getOption)
            .parse(process.argv);

        new CucumberExecuter(cli).execute();
    }

    public getOption(val: string): string {
        return val;
    }
}

const packageJsonPath = path.resolve(__dirname, '../package.json');
const cukesJsCli = new CukesJsCli();
readJsonFile(packageJsonPath).then(cukesJsCli.start);