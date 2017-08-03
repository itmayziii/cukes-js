import { PathLike } from "fs";

export interface CucumberReportOptions {
    theme: string,
    jsonDir?: PathLike,
    jsonFile?: PathLike,
    output?: PathLike,
    reportSuiteAsScenarios?: boolean,
    launchReport?: boolean,
    metadata?: object
}