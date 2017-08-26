/**
 * Created by Alexander Henka on 01.08.14.
 * Copyright by Alexander Henka
 */


/**
 * Utility steps are steps that are used for defining the framework for the scenario to be tested.
 * Like the actor that is used or user name and password.
 * @type {utility_Steps}
 */

module.exports = function({Given}) {
    /**
     * Set the actor, tell the browser to run with a specific actor
     */
    Given(/^Actor is "([^"]*)"$/, function (thisActor, callback) {
        this.driver.runWithThatActor(thisActor);
        callback();
    });

    /**
     * Setting the user name used in a scenario 'globally'
     */
    Given(/^Username is "([^"]*)"$/, function (username, callback) {
        this.driver.setLoginCredentialsForActor('username', username);
        callback();
    });

    /**
     * Setting the password used in a scenario 'globally'
     */
    Given(/^Password is "([^"]*)"$/, function (password, callback) {
        this.driver.setLoginCredentialsForActor('password', password);
        callback();
    });

    /**
     * Set the WCAG conformance level (A, AA or AAA)
     */
    Given(/^The WCAG conformance level shall be "([^"]*)"$/, function (conformanceLevel, callback) {
        this.driver.setConformanceLevel(conformanceLevel);
        callback();
    });
};