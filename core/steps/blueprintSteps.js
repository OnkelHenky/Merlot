/**
 * Created by Henka on 18.06.14.
 */

/**
 * @description
 * Provides all the needed blueprint steps
 * @type {blueprintSteps}
 */
module.exports = blueprintSteps = function () {

    /*
     * Set the actor, tell the browser to run with a specifc actor
     */
    this.Given(/^Actor is "([^"]*)"$/, function (thisActor, callback) {
        this.browser.runWithThatActor(thisActor);
        callback();
    });

   require('./interaction').call(this);
   require('./navigation').call(this);
};

