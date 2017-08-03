import { CommanderStatic } from 'commander';
import * as childProcess from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { PathLike } from "fs";


export class CucumberExecuter {
    private featureDirectory: PathLike;
    private outputDirectory: PathLike = path.resolve(__dirname, '../../../cucumber-output');
    private maxProcesses: number;

    public constructor(cli: CommanderStatic) {
        this.featureDirectory = (cli.features || './features');
        this.maxProcesses = (cli.processes || 5);
    }

    public execute(): void {
        this.listFeatureFiles().then((featureFiles) => {
            this.startCucumber(featureFiles);
        });
    }

    private listFeatureFiles(): Promise<PathLike[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(this.featureDirectory, (error, files) => {
                if (error) {
                    reject(error);
                }

                const featureFiles = files.filter((file) => {
                    return file.endsWith('.feature');
                });
                resolve(featureFiles);
            })
        });
    }

    private startCucumber(featureFiles: PathLike[]): void {
        this.clearOutputDirectory().then(() => {
            const numberOfFiles: number = featureFiles.length;
            let executionsFinished: number = 0;

            const cucumberExecutable = path.resolve(__dirname, '../../../../.bin/cucumberjs');
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
                })
            });
        });
    }

    private clearOutputDirectory(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.readdir(this.outputDirectory, (error, files) => {
                files = files.filter((file) => {
                    return (file !== '.gitkeep');
                });

                if (error) {
                    reject(error);
                }

                const promiseToDelete: Promise<boolean>[] = [];
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

    private deleteFile(path: PathLike): Promise<boolean> {
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