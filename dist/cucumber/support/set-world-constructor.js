"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber = require("cucumber");
function setWorldConstructor(constructor) {
    cucumber.defineSupportCode(function ({ setWorldConstructor }) {
        setWorldConstructor(constructor);
    });
}
exports.setWorldConstructor = setWorldConstructor;
