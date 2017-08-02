"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function readJsonFile(jsonFilePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonFilePath, { encoding: 'UTF8' }, (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    });
}
exports.readJsonFile = readJsonFile;
