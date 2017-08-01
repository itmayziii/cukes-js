import { CommanderStatic } from 'commander';
import { DriverBuilder } from './driver-builder';
import * as childProcess from 'child_process';

export class CucumberExecuter {

    public execute(cli: CommanderStatic) {
        const driver = DriverBuilder.build(cli);
    }
}