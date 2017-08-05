import { CucumberReporter } from "./cucumber-reporter";
import Spy = jasmine.Spy;
const reportGenerator = require('cucumber-html-reporter');

describe('cucumber-reporter', () => {
    let cucumberReporter: CucumberReporter;

    beforeEach(() => {
        spyOn(reportGenerator, 'generate');
        cucumberReporter = new CucumberReporter(reportGenerator)
    });

    describe('generate()', () => {

        it('should call the generators generate method with the specified options', () => {
            cucumberReporter.options = {
                theme: 'bootstrap',
                metadata: {
                    just: 'A Test'
                }
            };
            cucumberReporter.generate();
            expect(reportGenerator.generate).toHaveBeenCalledTimes(1);
            expect(reportGenerator.generate).toHaveBeenCalledWith({
                theme: 'bootstrap',
                metadata: {
                    just: 'A Test'
                }
            })
        });

    });

});