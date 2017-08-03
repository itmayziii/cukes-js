import * as fs from "fs";
import { PathLike } from "fs";
import * as path from "path";

export function readJsonFile(jsonFilePath: PathLike): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonFilePath, {encoding: 'UTF8'}, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

export function listFeatureFiles(featureDirectory: PathLike): Promise<PathLike[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(featureDirectory, (error, files) => {
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

export function clearOutputDirectory(outputDirectory: PathLike): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.readdir(outputDirectory, (error, files) => {
            files = files.filter((file) => {
                return (file !== '.gitkeep');
            });

            if (error) {
                reject(error);
            }

            const promiseToDelete: Promise<boolean>[] = [];
            files.forEach((file) => {
                const fullFilePath = path.resolve(outputDirectory, file);
                promiseToDelete.push(deleteFile(fullFilePath));
            });

            Promise.all(promiseToDelete).then(() => {
                resolve(true);
            });
        });
    });
}

export function deleteFile(path: PathLike): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (error) => {
            if (error) {
                reject(error);
            }

            resolve(true);
        });
    });
}