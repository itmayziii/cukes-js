import { CommanderStatic } from 'commander';
import { DriverBuilder } from './driver-builder';
import * as childProcess from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { PathLike } from "fs";

export class CucumberExecuter {
    private featureDirectory: PathLike;
    private browser: string;
    private maxProcesses: number;

    public constructor(cli: CommanderStatic) {
        this.featureDirectory = (cli.features || './features');
        this.browser = (cli.browser || 'chrome');
        this.maxProcesses = (cli.maxProcesses || 5);
    }

    public execute() {
        const driver = DriverBuilder.build(this.browser);
        const featureFiles = this.listFeatureFiles();
        this.startCucumber(featureFiles);
    }

    private listFeatureFiles() {
        return fs.readdirSync(this.featureDirectory).filter((file) => {
            return file.endsWith('.feature');
        });
    }

    private startCucumber(featureFiles: PathLike[]) {
        const cucumberExecutable = path.resolve(__dirname, '../../../node_modules/.bin/cucumberjs');
        featureFiles.forEach((file) => {
            const featureFilePath = path.resolve(this.featureDirectory, file);
            childProcess.fork(cucumberExecutable, [featureFilePath]);
        });
    }
}