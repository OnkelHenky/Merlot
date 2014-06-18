/**
 * Created by Henka on 13.06.14.
 */


var webdriver = require('selenium-webdriver'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    BlueprintRunner = require('../../../../core/blueprintRunner').BlueprintRunner,
    path = require('path'),

    _pathToSeleniumJar = path.join(__dirname, '../../../../bin/selenium-server-standalone-2.42.0.jar'),
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


var World = function World(callback) {
    this.browser = blueRunner; // this.browser will be available in step definitions

    this.visit = function(url, callback) {
        this.browser.goTo(url, callback);
    };

    this.theActorShellBe = function (actor) {
        this.browser.runWithThatActor(actor);
    };

    callback();
};

exports.World = World;