/**
 * Created by Alexander Henka on 01.07.14.
 * Copyright by Alexander Henka
 */


var webdriver = require('selenium-webdriver'),
    path = require('path'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    BlueprintRunner = require('../BlueprintRunner').BlueprintRunner;

/*
    path = require('path'),

    _pathToSeleniumJar = path.join(__dirname, '../bin/selenium-server-standalone-2.42.0.jar'),
    _server = new SeleniumServer(_pathToSeleniumJar, {
        port: 4444
    });

// Start the selenium server
_server.start();


var driver = new webdriver.Builder().
    usingServer(_server.address()).
    withCapabilities(webdriver.Capabilities.chrome()).
    build();


// New blue runner to test a user scenario blueprint.
var blueRunner = new BlueprintRunner(driver,webdriver);

*/
/**
 *
 * @type {World}
 */
var MerlotWorld = exports.MerlotWorld = function (worldConfig) {

    this.config  = {
        'seleniumPath': '../../bin/selenium-server-standalone-2.42.0.jar',
        'port' : '4444',
        'browser' : 'chrome'

    };

    if(worldConfig){
        if (worldConfig.seleniumPath && worldConfig.port && worldConfig.browser) {
          this.config = worldConfig;
        }
    }
    /*
    this.browser = blueRunner; // this.browser will be available in step definitions

    this.visit = function(url, callback) {
        this.browser.goTo(url, callback);
    };

    this.theActorShellBe = function (actor) {
        this.browser.runWithThatActor(actor);
    };

    callback();

    */
};

/**
 *
 * @param config
 */
MerlotWorld.prototype.getWorld = function () {

   var  _pathToSeleniumJar = this.config.seleniumPath;//path.join(__dirname, this.config.seleniumPath),
        _server = new SeleniumServer(_pathToSeleniumJar, {
            port: this.config.port

        });

    console.log(_pathToSeleniumJar);

// Start the selenium server
    _server.start();

    var _serverCapabilities = webdriver.Capabilities.chrome(); //default
    switch(this.config.browser){
        case 'chrome':
             _serverCapabilities = webdriver.Capabilities.chrome();
            break;
        case 'firefox':
             _serverCapabilities = webdriver.Capabilities.firefox();
            break;
        case 'safari':
            _serverCapabilities = webdriver.Capabilities.safari();
            break;
        case 'ie':
            break;
        default :
             _serverCapabilities = webdriver.Capabilities.chrome();
    }
    /*
     * Selenium  config.
     */
    var driver = new webdriver.Builder().
        usingServer(_server.address()).
        withCapabilities(_serverCapabilities).
        build();

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                  Actor configuration  - START           *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// New blue runner to test a user scenario blueprint.
    var blueRunner = new BlueprintRunner(driver,webdriver);

    return  function (callback) {

        this.browser = blueRunner; // this.browser will be available in step definitions

        this.visit = function(url, callback) {
            this.browser.goTo(url, callback);
        };

        this.theActorShellBe = function (actor) {
            this.browser.runWithThatActor(actor);
        };

        callback();
    }

};
