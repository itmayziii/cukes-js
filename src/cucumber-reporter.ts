import { PathLike } from "fs";
import { CucumberReportOptions } from "./models/cucumber-report-options";
import * as path from "path";
const reporter = require('cucumber-html-reporter');

export class CucumberReporter {
    private _outputPath: PathLike = path.resolve(__dirname, '../cucumber-output');
    private _options: CucumberReportOptions = {
        theme: 'bootstrap',
        jsonDir: this.outputPath,
        output: path.resolve(this.outputPath, 'cucumber_report.html'),
        reportSuiteAsScenarios: true,
        launchReport: true,
        metadata: {
            "Generated By:": "Cukes-JS"
        }
    };

    public generate() {
        reporter.generate(this.options)
    }

    public get outputPath(): PathLike {
        return this._outputPath;
    }

    public set outputPath(value: PathLike) {
        this._outputPath = value;
    }

    public get options(): CucumberReportOptions {
        return this._options;
    }

    public set options(value: CucumberReportOptions) {
        this._options = value;
    }
}