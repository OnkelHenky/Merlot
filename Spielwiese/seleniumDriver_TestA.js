/**
 * Created by Henka on 26.05.14.
 */

var webdriver = require('selenium-webdriver'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    PathLogger =  require('../core/pathLogger').PathLogger,
    assert = require('assert'),
    path = require('path');



var by = webdriver.By;
var logger = new PathLogger();
var _pathToSeleniumJar = path.join(__dirname, '../lib/selenium-server-standalone-2.42.0.jar');
var server = new SeleniumServer(_pathToSeleniumJar, {
    port: 4444
});

server.start();

var driver = new webdriver.Builder().
    usingServer(server.address()).
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

driver.get('http://www.amazon.de').
    then(function() {
        var element = driver.findElement(by.name('field-keywords'));
        element.getTagName().
            then(logger.log);
        return element;
    }).
    then(function(q) {
        q.sendKeys("Askir");
        return q;
    }).
    then(function(q) {
        return q.sendKeys(webdriver.Key.RETURN);

    });
driver.getTitle().then(function(title) {
    console.log('title = '+ title);
    assert.equal("Suchergebnis auf Amazon.de für: Askir", title);
});

driver.quit();