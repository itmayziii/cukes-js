"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const path = require("path");
const fs_utils_1 = require("./utils/fs-utils");
const cucumber_reporter_1 = require("./cucumber-reporter");
const reportGenerator = require('cucumber-html-reporter');
class CucumberExecutor {
    constructor() {
        this.outputDirectory = path.resolve(__dirname, '../cucumber-output');
        this.featureCount = 0;
        this.featuresExecutedCount = 0;
        this.featureFiles = [];
    }
    execute(cli) {
        this.featureDirectory = (cli.features || './features');
        this.concurrency = (cli.concurrency || 5);
        return new Promise((resolve) => {
            Promise.all([fs_utils_1.listFeatureFiles(this.featureDirectory), fs_utils_1.clearOutputDirectory(this.outputDirectory)]).then((results) => {
                this.featureFiles = results[0];
                this.featureCount = this.featureFiles.length;
                this.processFeatureFiles(this.featureFiles).then(() => {
                    resolve();
                });
            });
        });
    }
    processFeatureFiles(featureFiles) {
        return new Promise((resolve) => {
            const filesToFork = featureFiles.slice(0, this.concurrency);
            const cucumberExecutable = path.resolve(__dirname, '../../.bin/cucumberjs');
            filesToFork.forEach((file) => {
                this.executeFeature(file, cucumberExecutable).then(() => {
                    this.featuresExecutedCount++;
                    if (this.featureCount === this.featuresExecutedCount) {
                        resolve();
                        new cucumber_reporter_1.CucumberReporter(reportGenerator).generate();
                    }
                    else {
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
    executeFeature(featureFile, cucumberExecutable) {
        return new Promise((resolve) => {
            const featureFilePath = path.resolve(this.featureDirectory, featureFile);
            const outputFilePath = path.resolve(this.outputDirectory, featureFile + '.json');
            const process = childProcess.fork(cucumberExecutable, ['-f', `json:${outputFilePath}`, featureFilePath]);
            process.on('close', () => {
                resolve();
            });
        });
    }
    get concurrency() {
        return this._concurrency;
    }
    set concurrency(value) {
        this._concurrency = value;
    }
}
exports.CucumberExecutor = CucumberExecutor;
