/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

import Jasmine = require('jasmine');
import * as path from "path";

const jasmine = new Jasmine([]);
const jasmineConfigFile = path.resolve(__dirname, 'jasmine.json');

jasmine.loadConfigFile(jasmineConfigFile);
jasmine.configureDefaultReporter({
    showColors: true
});

jasmine.execute([], '');