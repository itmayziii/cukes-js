import * as fsUtils from "./fs-utils";
import * as fs from "fs";
import { PathLike } from "fs";
import * as path from "path";
import { clearFeatureFiles, createFeatureFiles } from "../tests/test-utilities";

describe('fs-utils', () => {
    const featureFileLocation = path.resolve(__dirname, 'features');

    describe('readJsonFile()', () => {

        it('should parse a json file into a JSON object', (done) => {
            const packageJsonPath: PathLike = path.resolve(__dirname, '../../package.json');
            fsUtils.readJsonFile(packageJsonPath)
                .then((packageJson) => {
                    expect(packageJson.name).toBe('cukes-js');
                    done();
                })
                .catch(() => {
                    fail('the function should not throw an error');
                    done();
                });
        });

        it('should reject a promise with an error if the file does not exist', (done) => {
            fsUtils.readJsonFile('file-that-does-not-exist.json')
                .then(() => {
                    fail('the function did not reject the promise if it did not find the file');
                    done();
                })
                .catch((error) => {
                    expect(error.code).toBe('ENOENT');
                    done();
                });
        });

        it('should reject a promise if the file is not able to be parsed into json', (done) => {
            const fsUtilsPath = path.resolve(__dirname, 'fs-utils.js');
            fsUtils.readJsonFile(fsUtilsPath)
                .then(() => {
                    fail('the function did not reject the promise if JSON.parse fails');
                    done();
                })
                .catch((error) => {
                    expect(error.name).toBe('SyntaxError');
                    done();
                });
        });

    });

    describe('listFeatureFiles()', () => {

        beforeAll((done) => {
            createFeatureFiles(featureFileLocation).then(() => {
                done();
            });
        });

        afterAll((done) => {
            clearFeatureFiles(featureFileLocation).then(() => {
                done();
            });
        });

        it('should return only files ending with .feature given a directory', (done) => {
            fsUtils.listFeatureFiles(featureFileLocation)
                .then((files) => {
                    expect(files).toEqual(['first.feature', 'second.feature', 'third.feature']);
                    done();
                })
                .catch(() => {
                    fail('the function should not be throwing an error');
                    done();
                });
        });

        it('should reject a promise if the directory does not exist', (done) => {
            fsUtils.listFeatureFiles('/nonsense-dir-itmayziii')
                .then(() => {
                    fail('the function did not reject the promise if the directory does not exist');
                    done();
                })
                .catch((error) => {
                    expect(error.code).toBe('ENOENT');
                    done();
                });
        });

    });

    describe('deleteFile()', () => {

        beforeAll((done) => {
            createFeatureFiles(featureFileLocation).then(() => {
                done();
            });
        });

        afterAll((done) => {
            clearFeatureFiles(featureFileLocation).then(() => {
                done();
            });
        });

        it('should fulfill a promise if the file was successfully deleted', (done) => {
            const existingFile = path.resolve(featureFileLocation, 'first.feature');
            fsUtils.deleteFile(existingFile)
                .then(() => {
                    const featureFiles = fs.readdirSync(featureFileLocation);
                    expect(featureFiles.length).toBe(2);
                    done();
                })
                .catch(() => {
                    fail('the function should not reject the promise on successful deletion of a file');
                    done();
                });
        });

        it('should reject a promise if the file was not deleted', (done) => {
            fsUtils.deleteFile('this-file-will-never-exist-hopefully.js')
                .then(() => {
                    fail('the function did not reject the promise if the file was not deleted');
                    done();
                })
                .catch(() => {
                    expect(true).toBe(true);
                    done();
                });
        });

    });


    describe('clearOutputDirectory()', () => {

        beforeAll((done) => {
            createFeatureFiles(featureFileLocation).then(() => {
                done();
            })
        });

        afterAll((done) => {
            clearFeatureFiles(featureFileLocation).then(() => {
                done();
            });
        });

        it('should fulfill a promise if the files were deleted successfully', (done) => {
            fsUtils.clearOutputDirectory(featureFileLocation)
                .then(() => {
                    const featureFiles = fs.readdirSync(featureFileLocation);
                    expect(featureFiles.length).toBe(0);
                    done();
                })
                .catch(() => {
                    fail('the function should not reject the promise on successful deletion of files');
                    done();
                })
        });

        it('should reject a promise if the path does not exist', (done) => {
            fsUtils.clearOutputDirectory('itmayziii/this-directory-should-not-exist')
                .then(() => {
                    fail('the function should not successfully find this directory');
                    done();
                })
                .catch(() => {
                    expect(true).toBe(true);
                    done();
                });
        });

    });

});