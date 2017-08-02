"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const path = require("path");
const fs = require("fs");
class CucumberExecuter {
    constructor(cli) {
        this.featureDirectory = (cli.features || './features');
        this.browser = (cli.browser || 'chrome');
        this.maxProcesses = (cli.maxProcesses || 5);
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
                else {
                    const featureFiles = files.filter((file) => {
                        return file.endsWith('.feature');
                    });
                    console.log(featureFiles);
                    resolve(featureFiles);
                }
            });
        });
    }
    startCucumber(featureFiles) {
        const globals = path.resolve(__dirname, '../../../globals.js');
        console.log(globals);
        const cucumberExecutable = path.resolve(__dirname, '../../../node_modules/.bin/cucumberjs');
        featureFiles.forEach((file) => {
            const featureFilePath = path.resolve(this.featureDirectory, file);
            childProcess.fork(cucumberExecutable, [featureFilePath]);
        });
    }
}
exports.CucumberExecuter = CucumberExecuter;
