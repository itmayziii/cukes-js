import { CommanderStatic } from 'commander';
import { DriverBuilder } from './driver-builder';
import * as childProcess from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { PathLike } from "fs";

export class CucumberExecuter {
    private featureDirectory: PathLike;
    private browser: string;

    public constructor(cli: CommanderStatic) {
        this.featureDirectory = (cli.features || './features');
        this.browser = (cli.browser || 'chrome');
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
        featureFiles.forEach((file) => {
            const cucumberExecutable = path.resolve(__dirname, '../../../node_modules/.bin/cucumberjs');
            const featureFilePath = path.resolve(this.featureDirectory, file);

            console.log('CUCUMBER EXECUTABLE', cucumberExecutable);
            console.log('FEATURE FILE PATH', featureFilePath);

            childProcess.fork(cucumberExecutable, [featureFilePath]);
        });
    }
}