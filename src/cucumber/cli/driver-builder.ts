import { Builder, Capabilities, ThenableWebDriver } from "selenium-webdriver";
import { CommanderStatic } from "commander";

export class DriverBuilder {

    public static build(commander: CommanderStatic): ThenableWebDriver {
        const browser = DriverBuilder.getBrowser(commander);
        const capabilities = DriverBuilder.getCapabilities(browser);

        return new Builder().forBrowser(browser).withCapabilities(capabilities).build();
    }

    private static getBrowser(commander: CommanderStatic): string {
        return (commander.browser) ? commander.browser : 'chrome';
    }

    private static getCapabilities(browser: string): Capabilities {
        let capabilities: Capabilities;
        switch (browser) {
            case 'firefox':
                capabilities = Capabilities.firefox();
                break;
            case 'phantomjs':
                capabilities = Capabilities.phantomjs();
                break;
            case 'chrome':
                capabilities = Capabilities.chrome();
                break;
            case 'edge':
                capabilities = Capabilities.edge();
                break;
            case 'ie':
                capabilities = Capabilities.ie();
                break;
            default:
                capabilities = Capabilities.chrome();
        }

        return capabilities;
    }
}