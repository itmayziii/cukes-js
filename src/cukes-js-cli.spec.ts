import { CukesJsCli } from "./cukes-js-cli";
import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;
let cli = require('commander');
import { CucumberExecuter } from "./cucumber-executer";

describe('CukesJsCli', () => {
    let cukesJsCli: CukesJsCli;
    const cucumerExecuter = new CucumberExecuter();

    beforeEach(() => {
        cukesJsCli = new CukesJsCli(cucumerExecuter);
    });

    it('start() should call commander the appropriate number of times', () => {
        const parseSpy = createSpy('parseSpy');
        const optionSpy = createSpy('optionSpy').and.returnValue({
            parse: () => {
                return parseSpy();
            },
            option: () => {
                return optionSpy();
            }
        });

        spyOn(cli, 'version').and.returnValue({
            option: () => {
                return optionSpy();
            }
        });

        spyOn(cucumerExecuter, 'execute');


        cukesJsCli.start({name: 'Cukes-JS', version: '0.0.1', author: 'Tommy May III'});
        expect(cli.version).toHaveBeenCalledTimes(1);
        expect(optionSpy).toHaveBeenCalledTimes(2);
        expect(parseSpy).toHaveBeenCalledTimes(1);
        expect(cucumerExecuter.execute).toHaveBeenCalledTimes(1);
    });

});