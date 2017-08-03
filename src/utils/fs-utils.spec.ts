import * as fsUtils from './fs-utils';
import { PathLike } from "fs";
import * as path from "path";

describe('fs-utils', () => {

    describe('readJsonFile()', () => {

        it('should parse a json file into a JSON object', () => {
            const packageJsonPath: PathLike = path.resolve(__dirname, '../../package.json');
            console.log(packageJsonPath);
            fsUtils.readJsonFile(packageJsonPath)
                .then((packageJson) => {
                    expect(packageJson.name).toBe('cukes-js');
                })
                .catch(() => {
                    fail('the function should not throw an error');
                })
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

        it('should return only files ending with .feature given a directory', () => {
            fsUtils.listFeatureFiles(__dirname)
                .then((files) => {
                    expect(files).toEqual(['feature-file.feature']);
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

});
