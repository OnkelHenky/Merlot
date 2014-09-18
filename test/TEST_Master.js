/**
 * Created by Alexander Henka on 01.08.14.
 * Copyright by Alexander Henka
 */

/**
 * Created by Henka on 07.06.14.
 */

/*
 * Require selenium stuff
 */
var webdriver = require('selenium-webdriver'),
    path = require('path'),
    fs = require('fs'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

/*
 * Require Merlot stuff
 */
var TestMaster;
  //  ActorProvider = require('./actors/actorProvider').ActorProvider,
  //  DOMElement = require('./auxilium/DOMElement').DOMElement;


/**
 * @description
 * The export function for the user scenario blue print runner.
 * @type {ActorBuilder}
 */
 module.exports = TestMaster= function(config) {

    /*Information*/
    this._type_    = "TestMaster Object"; //Name of the object

    this.config  = {
        'seleniumPath': '',
        'port' : '4444',
        'browser' : 'chrome'

    };

    this.driver = {};
    this.webdriver = webdriver;
   // this.actor = new ActorProvider.Actors["Paul"]; //Default actor

    var self = this;

    if(config && (config.seleniumPath && config.port && config.browser)) {
        this.addConfiguration(config);
    } else {
        throw new Error("You must provide a blueprint configuration in the format: " + "{'seleniumPath': '/path/to/selenium.jar','port' : '4444','_browser' : 'chrome'}");
    }

};


TestMaster.prototype.closeDriver = function () {

       this.driver.close();

};


/**
 * Adding the configuration for a new TestMaster
 * @param config
 */
TestMaster.prototype.addConfiguration = function (config) {
    var self = this;
    console.dir(config);
    try {
        var _stats = fs.statSync(config.seleniumPath);

        if (_stats.isFile()) {
            console.log('_stats +' +_stats);
            self.config = config;
            var _pathToSeleniumJar = self.config.seleniumPath,
                _server = new SeleniumServer(_pathToSeleniumJar, {
                    port: self.config.port

            });

            console.log("Using selenium from: " + _pathToSeleniumJar);
            _server.start();

            var _serverCapabilities = webdriver.Capabilities.chrome(); //default
            switch (self.config.browser) {
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
                    console.log('Internet Explorer is not yet supported, using Chrome instead');
                default :
                    console.log(self.config.browser +' is not defined, using Chrome instead');
                    _serverCapabilities = webdriver.Capabilities.chrome();
            }

            self.driver =  new webdriver.Builder().
                forBrowser('chrome').
                build();

        }
    } catch (ex) {
        console.error('Selenium JAR not found at ' + config.seleniumPath);
        console.error('HINT: Check for typos');
        throw new Error('Unable to find selenium.jar');
    }

};

