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
    private maxProcesses: number;

    public execute(cli: CommanderStatic): Promise<any> {
        this.featureDirectory = (cli.features || './features');
        this.maxProcesses = (cli.processes || 5);

        return new Promise((resolve, reject) => {
            Promise.all([listFeatureFiles(this.featureDirectory), clearOutputDirectory(this.outputDirectory)]).then((results) => {
                const featureFiles = results[0];
                this.forkCucumberProcesses(featureFiles);
                resolve();
            });
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
                    new CucumberReporter(reportGenerator).generate();
                }
            });
        });
    }
}