/**
 * Created by Alexander Henka on 01.07.14.
 * Copyright by Alexander Henka
 */


var webdriver = require('selenium-webdriver'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    BlueprintRunner = require('../BlueprintRunner').BlueprintRunner,
    path = require('path'),

    _pathToSeleniumJar = path.join(__dirname, '../bin/selenium-server-standalone-2.42.0.jar'),
    _server = new SeleniumServer(_pathToSeleniumJar, {
        port: 4444
    });

// Start the selenium server
_server.start();

/*
 * Selenium  config.
 */
var driver = new webdriver.Builder().
    usingServer(_server.address()).
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                  Actor configuration  - START           *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// New blue runner to test a user scenario blueprint.
var blueRunner = new BlueprintRunner(driver,webdriver);


var World = exports.World= function World(callback) {
    this.browser = blueRunner; // this.browser will be available in step definitions

    this.visit = function(url, callback) {
        this.browser.goTo(url, callback);
    };

    this.theActorShellBe = function (actor) {
        this.browser.runWithThatActor(actor);
    };

    callback();
};
