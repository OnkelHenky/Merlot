/**
 * Created by Alexander Henka on 05.08.14.
 * Copyright by Alexander Henka
 */

/**
 * A bunch of before and after hooks of the cucumber framework.
 * To run setup code and clean up code before and after an scenario
 * is being executed.
 * @type {hooks}
 */
module.exports = hooks = function () {
    /*
     * Close the selenium diver (browser) after all features
     * of an scenario had been executed.
     */
    this.After(function(scenario, callback) {
        console.log('After Hook');
        this.browser.closeDriver();
        /*
        if (scenario.failed) {
            console.log('FAILED');

        }
        else {
            console.log('NOT FAILED');

        }
        */
        callback();
    });

};