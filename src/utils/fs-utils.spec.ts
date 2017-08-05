import * as fsUtils from './fs-utils';
import { PathLike } from "fs";
import * as path from "path";
import * as fs from "fs";

describe('fs-utils', () => {

    describe('readJsonFile()', () => {

        it('should parse a json file into a JSON object', () => {
            const packageJsonPath: PathLike = path.resolve(__dirname, '../../package.json');
            fsUtils.readJsonFile(packageJsonPath)
                .then((packageJson) => {
                    expect(packageJson.name).toBe('cukes-js');
                })
                .catch(() => {
                    fail('the function should not throw an error');
                });
        });

        it('should reject a promise with an error if the file does not exist', () => {
            fsUtils.readJsonFile('file-that-does-not-exist.json')
                .then(() => {
                    fail('the function did not reject the promise if it did not find the file');
                })
                .catch((error) => {
                    expect(error.code).toBe('ENOENT');
                });
        });

        it('should reject a promise if the file is not able to be parsed into json', () => {
            const fsUtilsPath = path.resolve(__dirname, 'fs-utils.js');
            fsUtils.readJsonFile(fsUtilsPath)
                .then(() => {
                    fail('the function did not reject the promise if JSON.parse fails');
                })
                .catch((error) => {
                    expect(error.name).toBe('SyntaxError');
                });
        });

    });

    describe('listFeatureFiles()', () => {
        const featureFileLocation = path.resolve(__dirname, 'features');

        beforeAll(() => {
            createFeatureFiles(featureFileLocation);
        });

        it('should return only files ending with .feature given a directory', () => {
            fsUtils.listFeatureFiles(featureFileLocation)
                .then((files) => {
                    expect(files).toEqual(['first.feature', 'second.feature', 'third.feature']);
                })
                .catch(() => {
                    fail('the function should not be throwing an error');
                });
        });

        it('should reject a promise if the directory does not exist', () => {
            fsUtils.listFeatureFiles('/nonsense-dir-itmayziii')
                .then(() => {
                    fail('the function did not reject the promise if the directory does not exist');
                })
                .catch((error) => {
                    expect(error.code).toBe('ENOENT');
                });
        });

    });

    describe('deleteFile()', () => {
        const featureFileLocation = path.resolve(__dirname, 'features');

        beforeAll(() => {
            createFeatureFiles(featureFileLocation)
        });

        it('should fulfill a promise if the file was successfully deleted', () => {
            const existingFile = path.resolve(featureFileLocation, 'first.feature');
            fsUtils.deleteFile(existingFile)
                .then(() => {
                    const featureFiles = fs.readdirSync(featureFileLocation);
                    expect(featureFiles.length).toBe(2);
                })
                .catch(() => {
                    fail('the function should not reject the promise on successful deletion of a file');
                });
        });

        it('should reject a promise if the file was not deleted', () => {
            fsUtils.deleteFile('this-file-will-never-exist-hopefully.js')
                .then(() => {
                    fail('the function did not reject the promise if the file was not deleted');
                })
                .catch(() => {
                    expect(true).toBe(true);
                });
        });

    });


    describe('clearOutputDirectory()', () => {
        const featureFileLocation = path.resolve(__dirname, 'features');

        beforeAll(() => {
            createFeatureFiles(featureFileLocation);
        });

        it('should fulfill a promise if the files were deleted successfully', () => {
            fsUtils.clearOutputDirectory(featureFileLocation)
                .then(() => {
                    const featureFiles = fs.readdirSync(featureFileLocation);
                    expect(featureFiles.length).toBe(0);
                })
                .catch(() => {
                    fail('the function should not reject the promise on successful deletion of files');
                })
        });

        it('should reject a promise if the path does not exist', () => {
            fsUtils.clearOutputDirectory('itmayziii/this-directory-should-not-exist')
                .then(() => {
                    fail('the function should not successfully find this directory');
                })
                .catch(() => {
                    expect(true).toBe(true);
                });
        });

    });

});

function createFeatureFiles(featureFilePath: PathLike): void {
    const featureFiles = ['first.feature', 'second.feature', 'third.feature'];

    if (!fs.existsSync(featureFilePath)) {
        fs.mkdirSync(featureFilePath);
    }


    featureFiles.forEach((fileName) => {
        const fileLocation = path.resolve(featureFilePath, fileName);
        fs.writeFileSync(fileLocation, fileName)
    });
}
