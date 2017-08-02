import cucumber = require('cucumber');

export function setWorldConstructor(constructor: Function): void {
    cucumber.defineSupportCode(function ({setWorldConstructor}) {
        setWorldConstructor(constructor);
    });
}
