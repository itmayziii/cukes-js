"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
class BrowserBuilder {
    static build(commander) {
        const browser = BrowserBuilder.getBrowser(commander);
        const capabilities = BrowserBuilder.getCapabilities(browser);
        return new selenium_webdriver_1.Builder().forBrowser(browser).withCapabilities(capabilities).build();
    }
    static getBrowser(commander) {
        return (commander.browser) ? commander.browser : 'chrome';
    }
    static getCapabilities(browser) {
        let capabilities;
        switch (browser) {
            case 'firefox':
                capabilities = selenium_webdriver_1.Capabilities.firefox();
                break;
            case 'phantomjs':
                capabilities = selenium_webdriver_1.Capabilities.phantomjs();
                break;
            case 'chrome':
                capabilities = selenium_webdriver_1.Capabilities.chrome();
                break;
            case 'edge':
                capabilities = selenium_webdriver_1.Capabilities.edge();
                break;
            case 'ie':
                capabilities = selenium_webdriver_1.Capabilities.ie();
                break;
            default:
                capabilities = selenium_webdriver_1.Capabilities.chrome();
        }
        return capabilities;
    }
}
exports.BrowserBuilder = BrowserBuilder;
//# sourceMappingURL=browser-builder.js.map