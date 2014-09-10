/**
 * Created by Alexander Henka on 01.08.14.
 * Copyright by Alexander Henka
 */


/**
 * Utility steps are steps that are used for defining the framework for the scenario to be tested.
 * Like the actor that is used or user name and password.
 * @type {utility_Steps}
 */
module.exports = utility_Steps = function () {

    /**
     * Set the actor, tell the browser to run with a specific actor
     */
    this.Given(/^Actor is "([^"]*)"$/, function (thisActor, callback) {
        this.browser.runWithThatActor(thisActor);
        callback();
    });

    /**
     * Setting the user name, used in a scenario, 'globally'
     */
    this.Given(/^Username is "([^"]*)"$/, function (username, callback) {
        this.browser.setLoginCredentialsForActor('username', username);
        callback();
    });

    /**
     * Setting the password, used in a scenario, 'globally'
     */
    this.Given(/^Password is "([^"]*)"$/, function (password, callback) {
        this.browser.setLoginCredentialsForActor('password', password);
        callback();
    });


};