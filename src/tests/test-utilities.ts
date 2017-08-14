import * as fs from "fs";
import { PathLike } from "fs";
import * as path from "path";

// TODO make this function more async, do not feel like dealing with fs.exists being deprecated right now.
export function createFeatureFiles(featureFilePath: PathLike, amount: number = 3): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(featureFilePath)) {
                fs.mkdirSync(featureFilePath);
            }

            for (let i = 0; i < amount; i++) {
                const fileName = `file-${i}.feature`;
                const fileLocation = path.resolve(featureFilePath, fileName);
                fs.writeFileSync(fileLocation, fileName);
            }

            resolve();
        } catch (error) {
            console.error('TESTS SHOULD BE FAILING, createFeatureFiles() was unable to do its job: ', error);
            reject(error);
        }
    });
}

// TODO make this function more async, do not feel like dealing with fs.exists being deprecated right now.
export function clearFeatureFiles(featureFilePath: PathLike): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(featureFilePath)) {
                fs.readdir(featureFilePath, {encoding: 'UTF8'}, (error, featureFiles) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    featureFiles.forEach((featureFile) => {
                        const pathToFile = path.resolve(featureFilePath, featureFile);
                        fs.unlinkSync(pathToFile);
                    });

                    fs.rmdirSync(featureFilePath);
                    resolve();
                })
            } else {
                resolve();
            }
        } catch (error) {
            console.error('TESTS SHOULD BE FAILING, clearFeatureFiles() was unable to do its job: ', error);
            reject(error);
        }
    });
}

export function fakeAsync(min: number, max: number, callback: Function): void {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(() => {
        callback();
    }, randomTime)
}