/**
 * Created by Henka on 03.06.14.
 */

/*
 * includes
 */
var webdriver = require('selenium-webdriver'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    ActorBuilder = require('../core/actorBuilder').ActorBuilder,
    BlueprintRunner = require('../core/blueprintRunner').BlueprintRunner,
    path = require('path');

var by = webdriver.By,
    _pathToSeleniumJar = path.join(__dirname, '../lib/selenium-server-standalone-2.42.0.jar'),
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

// New blue runner to test a user scenario blueprint.
var blueRunner = new BlueprintRunner(driver,webdriver),
    actorBuilder = new ActorBuilder();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                  Actor configuration  - START           *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var annaProperties = {
    name: 'Anna',
    navigationPattern: {
        navStyle : 'TAB'
    }
};

var paulProperties= {
    name: 'Paul',
    navigationPattern: {
        navStyle : 'POINT_AND_CLICK'
    }
};

var anna = actorBuilder.getActorWithProperties(annaProperties),
    paul = actorBuilder.getActorWithProperties(paulProperties);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                  /Actor configuration  - END            *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/* Start the test run */
blueRunner.runWithActor(paul);


