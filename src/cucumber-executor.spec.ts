import cli = require('commander');
import * as path from "path";
import * as childProcess from "child_process";
import { CucumberExecutor } from "./cucumber-executor";
import { clearFeatureFiles, createFeatureFiles, fakeAsync } from "./tests/test-utilities";
import createSpyObj = jasmine.createSpyObj;
import { CucumberReporter } from './cucumber-reporter';
import Spy = jasmine.Spy;

describe('cucumber-executor', () => {

    describe('execute()', () => {
        const featureFilePath = path.resolve(__dirname, 'features');
        let processSpy: any, cucumberExecutor: CucumberExecutor;

        beforeEach((done) => {
            processSpy = createSpyObj('process', ['on']);
            processSpy.on.and.callFake((aString: string, aCallback: Function) => {
                fakeAsync(1000, 3000, aCallback);
            });

            spyOn(childProcess, 'fork').and.returnValue(processSpy);
            spyOn(CucumberReporter.prototype, 'generate');
            processSpy.on.and.callFake((aString: string, aCallback: Function) => {
                fakeAsync(1000, 3000, aCallback);
            });

            cucumberExecutor = new CucumberExecutor();

            done();
        });

        beforeAll((done) => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            createFeatureFiles(featureFilePath, 5).then(() => {
                done();
            });
        });

        afterAll((done) => {
            clearFeatureFiles(featureFilePath).then(() => {
                done();
            });
        });

        afterEach(() => {
            cli.features = null;
            cli.concurrency = null;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        });

        it('should create a process per feature file, and generate a report (number of feature files greater than max processes)', (done) => {
            cli.features = featureFilePath;
            cli.concurrency = 2;
            cucumberExecutor.execute(cli)
                .then(() => {
                    expect(childProcess.fork).toHaveBeenCalledTimes(5);
                    expect(processSpy.on).toHaveBeenCalledTimes(5);
                    expect(CucumberReporter.prototype.generate).toHaveBeenCalledTimes(1);
                    done();
                })
                .catch((error) => {
                    console.error('Error in test, could not run cucumberExecutor.execute() ', error);
                });
        });

        it('should create a process per feature file, and generate a report (number of feature files smaller than max processes)', (done) => {
            cli.features = featureFilePath;
            cli.concurrency = 7;
            cucumberExecutor.execute(cli)
                .then(() => {
                    expect(childProcess.fork).toHaveBeenCalledTimes(5);
                    expect(processSpy.on).toHaveBeenCalledTimes(5);
                    expect(CucumberReporter.prototype.generate).toHaveBeenCalledTimes(1);
                    done();
                })
                .catch((error) => {
                    console.error('Error in test, could not run cucumberExecutor.execute() ', error);
                });
        });

    });

});