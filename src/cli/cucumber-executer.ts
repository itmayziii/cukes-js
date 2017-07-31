import { CommanderStatic } from 'commander';
import { BrowserBuilder } from './browser-builder';

export class CucumberExecuter {

    public execute(cli: CommanderStatic) {
        const browser = BrowserBuilder.build(cli);
        console.log(browser);
    }
}