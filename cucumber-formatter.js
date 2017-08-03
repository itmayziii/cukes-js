var reporter = require('cucumber-html-reporter');
var path = require('path');

var jsonDir = path.resolve(__dirname, 'cucumber-output');
var output = path.resolve(__dirname, 'cucumber-output/cucumber_report.html');

var options = {
    theme: 'bootstrap',
    jsonDir: jsonDir,
    output: output,
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version": "0.3.2",
        "Test Environment": "STAGING",
        "Browser": "Chrome  54.0.2840.98",
        "Platform": "Mac",
        "Parallel": "Scenarios",
        "Executed": "Local"
    }
};

reporter.generate(options);