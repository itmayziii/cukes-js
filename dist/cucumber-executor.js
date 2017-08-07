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
    }
    execute(cli) {
        this.featureDirectory = (cli.features || './features');
        this.maxProcesses = (cli.processes || 5);
        return new Promise((resolve, reject) => {
            Promise.all([fs_utils_1.listFeatureFiles(this.featureDirectory), fs_utils_1.clearOutputDirectory(this.outputDirectory)]).then((results) => {
                const featureFiles = results[0];
                this.forkCucumberProcesses(featureFiles);
                resolve();
            });
        });
    }
    forkCucumberProcesses(featureFiles) {
        const numberOfFiles = featureFiles.length;
        let executionsFinished = 0;
        const cucumberExecutable = path.resolve(__dirname, '../../.bin/cucumberjs');
        featureFiles.forEach((file) => {
            const featureFilePath = path.resolve(this.featureDirectory, file);
            const outputFilePath = path.resolve(this.outputDirectory, file + '.json');
            const process = childProcess.fork(cucumberExecutable, ['-f', `json:${outputFilePath}`, featureFilePath]);
            process.on('close', () => {
                executionsFinished++;
                if (numberOfFiles === executionsFinished) {
                    new cucumber_reporter_1.CucumberReporter(reportGenerator).generate();
                }
            });
        });
    }
}
exports.CucumberExecutor = CucumberExecutor;
