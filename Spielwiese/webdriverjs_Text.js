/**
 * Created by Henka on 02.06.14.
 */


var selenium = require('selenium-standalone');
var webdriverjs = require('webdriverjs');

var spawnOptions = { stdio: 'pipe' };

// options to pass to `java -jar selenium-server-standalone-X.XX.X.jar`
var seleniumArgs = [
    '-debug'
];

var server = selenium(spawnOptions, seleniumArgs);
// or, var server = selenium();
// returns ChildProcess instance
// http://nodejs.org/api/child_process.html#child_process_class_childprocess

// spawnOptions defaults to `{ stdio: 'inherit' }`
// seleniumArgs defaults to `[]`

server.stdout.on('data', function(output) {
    console.log(output);
});


var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

webdriverjs
    .remote(options)
    .init()
    .url('http://www.Amazon.com')
    .title(function(err, res) {
        console.log('Title was: ' + res.value);
    })
    .end();

/*
var webdriverjs = require("webdriverjs");
var wdjsSeleniumBundle = require("webdriverjs-selenium-bundle");

var client = webdriverjs.remote({ desiredCapabilities: { browserName: 'chrome' } });

// autostop makes sure that the selenium server is stopped after
// calling end().
client.use(wdjsSeleniumBundle({autostop: true}));

client
    .init()
    .url("https://github.com/")
    .getTitle(function(err, title) {
        console.log();
        console.log("GITHUB TITLE: %s", title);
        console.log();
    })
    .end();
  /*
var webdriverjs = require("webdriverjs"),
    PathLogger =  require('../core/pathLogger').PathLogger,
  //  SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    path = require('path');
var spawn = require('child_process').spawn;

var selenium = require('selenium-standalone');

var _pathToSeleniumJar = path.join(__dirname,'../lib/selenium-server-standalone-2.42.0.jar');
var _pathChromeDriver = path.join(__dirname,'../lib/chromedriver');
*/
/*
var server = new SeleniumServer(_pathToSeleniumJar, {
    port: 4444
});
 server.start();
*/

/*
var spawnOptions = { stdio: 'pipe' };

// options to pass to `java -jar selenium-server-standalone-X.XX.X.jar`
var seleniumArgs = [
    '-debug'
];

var server = selenium(spawnOptions, seleniumArgs);
// or, var server = selenium();
// returns ChildProcess instance
// http://nodejs.org/api/child_process.html#child_process_class_childprocess

// spawnOptions defaults to `{ stdio: 'inherit' }`
// seleniumArgs defaults to `[]`

server.stdout.on('data', function(output) {
    console.log(output);
});
*/

//java -jar ./selenium-server-standalone-2.35.0.jar - Dwebdriver.chrome.driver='/opt/drivers/chromedriver' -role webdriver -hub  http://192.168.1.10:4444/grid/register -port 5566 -browser browserName=chrome,maxInstances=5,platform=LINUX &


/*var args = [
    '-jar',
     _pathToSeleniumJar,
     '- Dwebdriver.chrome.driver="' + _pathChromeDriver +'"'
];



var selenium = spawn('java', args);
selenium.stdout.on('data', function(output) {
    console.log(output);
});
selenium.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});


var options = {
    desiredCapabilities: {
        browserName: 'chrome',
        platform: 'MAC'
    }
};




 webdriverjs
     .remote(options)
     .init()
     .url('http://www.google.com')
     .title(function(err, res) {
           console.log('Title was: ' + res.value);
         })
     .end()*/