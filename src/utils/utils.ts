import * as fs from "fs";
import { PathLike } from "fs";

export function readJsonFile(jsonFilePath: PathLike): Promise<object> {
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
