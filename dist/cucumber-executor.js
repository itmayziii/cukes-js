"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const path = require("path");
const fs_utils_1 = require("./utils/fs-utils");
const cucumber_reporter_1 = require("./cucumber-reporter");
class CucumberExecutor {
    constructor() {
        this.outputDirectory = path.resolve(__dirname, '../cucumber-output');
    }
    execute(cli) {
        this.featureDirectory = (cli.features || './features');
        this.maxProcesses = (cli.processes || 5);
        fs_utils_1.listFeatureFiles(this.featureDirectory).then((featureFiles) => {
            this.startCucumber(featureFiles);
        });
    }
    startCucumber(featureFiles) {
        fs_utils_1.clearOutputDirectory(this.outputDirectory).then(() => {
            this.forkCucumberProcesses(featureFiles);
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
                    new cucumber_reporter_1.CucumberReporter().generate();
                }
            });
        });
    }
}
exports.CucumberExecutor = CucumberExecutor;
