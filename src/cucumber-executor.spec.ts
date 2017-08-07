import cli = require('commander');
import * as path from "path";
import * as childProcess from "child_process";
import { CucumberExecutor } from "./cucumber-executor";
import { clearFeatureFiles, createFeatureFiles } from "./tests/test-utilities";
import createSpyObj = jasmine.createSpyObj;

describe('cucumber-executor', () => {

    describe('execute', () => {
        const featureFilePath = path.resolve(__dirname, 'features');

        beforeAll((done) => {
            createFeatureFiles(featureFilePath).then(() => {
                done();
            });
        });

        afterAll((done) => {
            clearFeatureFiles(featureFilePath).then(() => {
                done();
            });
        });

        it('should call fork 3 times', (done) => {
            cli.features = featureFilePath;
            const cucumberExecutor = new CucumberExecutor();

            const processSpy = createSpyObj('processSpy', ['on']);
            spyOn(childProcess, 'fork').and.callFake(() => {
                return processSpy;
            });

            cucumberExecutor.execute(cli)
                .then(() => {
                    expect(childProcess.fork).toHaveBeenCalledTimes(3);
                    expect(processSpy.on).toHaveBeenCalledTimes(3);
                    done();
                })
                .catch((error) => {
                    console.log('there was an error');
                    console.log(error);
                })
        });

    });

});