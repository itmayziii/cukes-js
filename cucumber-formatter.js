var reporter = require('cucumber-html-reporter');


var options = {
    theme: 'bootstrap',
    jsonDir: './cucumber-output',
    output: './cucumber-output/cucumber_report.html',
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