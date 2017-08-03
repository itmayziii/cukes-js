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
            const numberOfFiles = featureFiles.length;
            let executionsFinished = 0;
            const cucumberExecutable = path.resolve(__dirname, '../../.bin/cucumberjs');
            console.log('EXEC FILE PATH: ', cucumberExecutable);
            featureFiles.forEach((file) => {
                const featureFilePath = path.resolve(this.featureDirectory, file);
                const outputFilePath = path.resolve(this.outputDirectory, file + '.json');
                const process = childProcess.fork(cucumberExecutable, ['-f', `json:${outputFilePath}`, featureFilePath]);
                process.on('close', (code, signal) => {
                    executionsFinished++;
                    if (numberOfFiles === executionsFinished) {
                        console.log('I AM FINISHED');
                        const formatterExecutable = path.resolve(__dirname, '../../../cucumber-formatter.js');
                        childProcess.fork(formatterExecutable);
                    }
                });
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
                const promiseToDelete = [];
                files.forEach((file) => {
                    const fullFilePath = path.resolve(this.outputDirectory, file);
                    promiseToDelete.push(this.deleteFile(fullFilePath));
                });
                Promise.all(promiseToDelete).then(() => {
                    resolve(true);
                });
            });
        });
    }
    deleteFile(path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (error) => {
                if (error) {
                    reject(error);
                }
                resolve(true);
            });
        });
    }
}
exports.CucumberExecuter = CucumberExecuter;
