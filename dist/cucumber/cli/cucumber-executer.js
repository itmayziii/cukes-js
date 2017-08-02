"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const path = require("path");
const fs = require("fs");
class CucumberExecuter {
    constructor(cli) {
        this.outputDirectory = path.resolve(__dirname, '../../../cucumber-output');
        this.featureDirectory = (cli.features || './features');
        this.maxProcesses = (cli.processes || 5);
    }
    execute() {
        this.listFeatureFiles().then((featureFiles) => {
            this.startCucumber(featureFiles);
        });
    }
    listFeatureFiles() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.featureDirectory, (error, files) => {
                if (error) {
                    reject(error);
                }
                const featureFiles = files.filter((file) => {
                    return file.endsWith('.feature');
                });
                resolve(featureFiles);
            });
        });
    }
    startCucumber(featureFiles) {
        this.clearOutputDirectory().then(() => {
            const cucumberExecutable = path.resolve(__dirname, '../../../node_modules/.bin/cucumberjs');
            featureFiles.forEach((file) => {
                const featureFilePath = path.resolve(this.featureDirectory, file);
                const outputFilePath = path.resolve(this.outputDirectory, file + '.json');
                childProcess.fork(cucumberExecutable, ['-f', `json:${outputFilePath}`, featureFilePath]);
            });
        });
    }
    clearOutputDirectory() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.outputDirectory, (error, files) => {
                files = files.filter((file) => {
                    return (file !== '.gitkeep');
                });
                if (error) {
                    reject(error);
                }
                files.forEach((file) => {
                    const fullFilePath = path.resolve(this.outputDirectory, file);
                    fs.unlinkSync(fullFilePath);
                });
                resolve(true);
            });
        });
    }
}
exports.CucumberExecuter = CucumberExecuter;
