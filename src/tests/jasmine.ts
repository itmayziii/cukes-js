/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

import Jasmine = require('jasmine');
import * as path from "path";

const j = new Jasmine([]);
const jasmineConfigFile = path.resolve('src/tests/jasmine.json');

j.loadConfigFile(jasmineConfigFile);
j.configureDefaultReporter({
    showColors: true
});

j.execute([], '');