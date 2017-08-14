import { CommanderStatic } from "commander";
import * as childProcess from "child_process";
import * as path from "path";
import { PathLike } from "fs";
import { clearOutputDirectory, listFeatureFiles } from "./utils/fs-utils";
import { CucumberReporter } from "./cucumber-reporter";
const reportGenerator = require('cucumber-html-reporter');

export class CucumberExecutor {
    private featureDirectory: PathLike;
    private outputDirectory: PathLike = path.resolve(__dirname, '../cucumber-output');
    private _concurrency: number;
    private featureCount: number = 0;
    private featuresExecutedCount: number = 0;
    private featureFiles: PathLike[] = [];

    public execute(cli: CommanderStatic): Promise<any> {
        this.featureDirectory = (cli.features || './features');
        this.concurrency = (cli.concurrency || 5);

        return new Promise((resolve) => {
            Promise.all([listFeatureFiles(this.featureDirectory), clearOutputDirectory(this.outputDirectory)]).then((results) => {
                this.featureFiles = results[0];
                this.featureCount = this.featureFiles.length;

                this.processFeatureFiles(this.featureFiles).then(() => {
                    resolve();
                });
            });
        });
    }

    private processFeatureFiles(featureFiles: PathLike[]): Promise<any> {
        return new Promise((resolve) => {
            const filesToFork = featureFiles.slice(0, this.concurrency);
            const cucumberExecutable = path.resolve(__dirname, '../../.bin/cucumberjs');

            filesToFork.forEach((file) => {
                this.executeFeature(file, cucumberExecutable).then(() => {
                    this.featuresExecutedCount++;
                    if (this.featureCount === this.featuresExecutedCount) {
                        resolve();
                        new CucumberReporter(reportGenerator).generate();
                    } else {
                        const nextFileToExecute = this.featureFiles[this.concurrency + this.featuresExecutedCount - 1];
                        if (nextFileToExecute) {
                            this.processFeatureFiles([nextFileToExecute]).then(() => {
                                resolve();
                            });
                        }

                    }
                });

            });
        });
    }

    private executeFeature(featureFile: PathLike, cucumberExecutable: string): Promise<any> {
        return new Promise((resolve) => {
            const featureFilePath = path.resolve(this.featureDirectory, featureFile);
            const outputFilePath = path.resolve(this.outputDirectory, featureFile + '.json');
            const process = childProcess.fork(cucumberExecutable, ['-f', `json:${outputFilePath}`, featureFilePath]);

            process.on('close', () => {
                resolve();
            });
        });
    }

    get concurrency(): number {
        return this._concurrency;
    }

    set concurrency(value: number) {
        this._concurrency = value;
    }
}