import { CommanderStatic } from 'commander';
import * as childProcess from 'child_process';
import * as path from 'path';
import { PathLike } from "fs";
import { listFeatureFiles, clearOutputDirectory } from './utils/fs-utils';
import { CucumberReporter } from './cucumber-reporter';

export class CucumberExecutor {
    private featureDirectory: PathLike;
    private outputDirectory: PathLike = path.resolve(__dirname, '../cucumber-output');
    private maxProcesses: number;

    public execute(cli: CommanderStatic): void {
        this.featureDirectory = (cli.features || './features');
        this.maxProcesses = (cli.processes || 5);

        listFeatureFiles(this.featureDirectory).then((featureFiles) => {
            this.startCucumber(featureFiles);
        });
    }

    private startCucumber(featureFiles: PathLike[]): void {
        clearOutputDirectory(this.outputDirectory).then(() => {
            this.forkCucumberProcesses(featureFiles);
        });
    }

    private forkCucumberProcesses(featureFiles: PathLike[]): void {
        const numberOfFiles: number = featureFiles.length;
        let executionsFinished: number = 0;

        const cucumberExecutable = path.resolve(__dirname, '../../.bin/cucumberjs');
        featureFiles.forEach((file) => {
            const featureFilePath = path.resolve(this.featureDirectory, file);
            const outputFilePath = path.resolve(this.outputDirectory, file + '.json');
            const process = childProcess.fork(cucumberExecutable, ['-f', `json:${outputFilePath}`, featureFilePath]);

            process.on('close', () => {
                executionsFinished++;
                if (numberOfFiles === executionsFinished) {
                    new CucumberReporter().generate();
                }
            });
        });
    }
}