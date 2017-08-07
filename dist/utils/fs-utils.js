"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
function readJsonFile(jsonFilePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonFilePath, { encoding: 'UTF8' }, (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            try {
                resolve(JSON.parse(data));
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.readJsonFile = readJsonFile;
function listFeatureFiles(featureDirectory) {
    return new Promise((resolve, reject) => {
        fs.readdir(featureDirectory, (error, files) => {
            if (error) {
                reject(error);
                return;
            }
            const featureFiles = files.filter((file) => {
                return file.endsWith('.feature');
            });
            resolve(featureFiles);
        });
    });
}
exports.listFeatureFiles = listFeatureFiles;
function clearOutputDirectory(outputDirectory) {
    return new Promise((resolve, reject) => {
        fs.readdir(outputDirectory, (error, files) => {
            if (error) {
                reject(error);
                return;
            }
            files = files.filter((file) => {
                return (file !== '.gitkeep');
            });
            const promiseToDelete = [];
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
exports.clearOutputDirectory = clearOutputDirectory;
function deleteFile(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(true);
        });
    });
}
exports.deleteFile = deleteFile;
