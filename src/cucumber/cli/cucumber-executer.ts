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
        this.listFeatureFiles().then((featureFiles) => {
            this.startCucumber(featureFiles);
        });
    }

    private listFeatureFiles(): Promise<PathLike[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(this.featureDirectory, (error, files) => {
                if (error) {
                    reject(error);
                } else {
                    const featureFiles = files.filter((file) => {
                        return file.endsWith('.feature');
                    });
                    console.log(featureFiles);
                    resolve(featureFiles)
                }
            })
        });
    }

    private startCucumber(featureFiles: PathLike[]) {
        const globals = path.resolve(__dirname, '../../../globals.js');
        console.log(globals);


        const cucumberExecutable = path.resolve(__dirname, '../../../node_modules/.bin/cucumberjs');
        featureFiles.forEach((file) => {
            const featureFilePath = path.resolve(this.featureDirectory, file);
            childProcess.fork(cucumberExecutable, [featureFilePath]);
        });
    }
}