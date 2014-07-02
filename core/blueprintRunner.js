/**
 * Created by Henka on 07.06.14.
 */

/*
 * Require selenium stuff
 */
var webdriver = require('selenium-webdriver'),
    path = require('path'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

/*
 * Require Merlot stuff
 */
var BlueprintRunner,
    ActorProvider = require('./actors/actorProvider').ActorProvider,
    DOMElement = require('./auxilium/DOMElement').DOMElement;
    Merlot = require('./Merlot').Merlot;


/**
 * @description
 * The export function for the user scenario blue print runner.
 * @type {ActorBuilder}
 */
BlueprintRunner = exports.BlueprintRunner = function(config) {

    /*Information*/
    this._type_    = "BlueprintRunner Object"; //Name of the object

    this.config  = {
        'seleniumPath': '../../bin/selenium-server-standalone-2.42.0.jar',
        'port' : '4444',
        'browser' : 'chrome'

    };

    this.driver = {};
    this.webdriver = webdriver;
    this.actor = new ActorProvider.Actors["Paul"]; //Default actor

    if(config){
        if (config.seleniumPath && config.port && config.browser) {
            this.config = config;
        }
    }


    var  _pathToSeleniumJar = this.config.seleniumPath;
    _server = new SeleniumServer(_pathToSeleniumJar, {
        port: this.config.port

    });

    console.log("Using selenium from: "+_pathToSeleniumJar);

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

    this.driver = new webdriver.Builder().
        usingServer(_server.address()).
        withCapabilities(_serverCapabilities).
        build();

};

/**
 * Get all the stuff from Merlot prototype
 * @type {Merlot}
 */
BlueprintRunner.prototype = new Merlot;


BlueprintRunner.prototype.addConfiguration = function (config) {

};


/**
 * Create a new DOMElement with the given properties
 * @param properties
 * @returns {DOMElement}
 */
BlueprintRunner.prototype.createDOMElement = function (properties) {
   if (properties){
     return new DOMElement(properties);
   } else{
      throw new Error("Can not create new DOMElement with empty properties!") ;
   }
};

/**
 * @description
 * Define the actor, that shall be used during the blueprint test.
 * @param actor {string} the name of the actor.
 */
BlueprintRunner.prototype.runWithThatActor = function (actor) {
  var that = this;

    if(actor && (typeof actor === 'string' || actor instanceof String)){

        if(ActorProvider.Actors[actor]){
            that.actor = new ActorProvider.Actors[actor];
            console.log('Using "'+that.actor+'" as actor');
        }else{
            console.error(new Error('Actor with name "'+actor+'" not found'));
            throw new Error('Actor with name "'+actor+'" not found')
        }
    }else{
       console.error('actor not defined in runWithThatActor');
    }
};


/**
 * @description
 * Let the actor try to find or reach the element, defined by the tag name.
 * @param domElement
 * @returns {*} a promise
 */
BlueprintRunner.prototype.actorTryToFindThisElement = function (domElement) {
      var _actor = this.actor;
  return  _actor.findElement.call(this,domElement);
};



/**
* @description
* The action builder is meant to be the foundation of the future mechanism
* to build (adhoc) different navigation patterns, used during (or in) a test run.
* @param TYPE_OF_ACTION , the type of action, like TAB navigation.
* @returns {driver.actions} action chain.
*/
BlueprintRunner.prototype.actionBuilder = function (TYPE_OF_ACTION) {
     var action_to_be_performed;
        switch (TYPE_OF_ACTION){
            case('3TAB'):
                action_to_be_performed = that.driver.actions()
                    .sendKeys(that.webdriver.Key.TAB)
                    .sendKeys(that.webdriver.Key.TAB)
                    .sendKeys(that.webdriver.Key.TAB);
                break;
            case('TAB'):
                action_to_be_performed = that.driver.actions()
                    .sendKeys(that.webdriver.Key.TAB);
                break;
            default :
                break;
        }
        return action_to_be_performed;
};



/**
 * @description
 * Let the actor perform a 'click'
 * @param webEle
 * @param type
 */
BlueprintRunner.prototype.click = function (webEle,type) {
    var _actor = this.actor;
    return _actor.click.call(this,webEle,type);
};

/**
 * @description
 * Let the actor perform accessibility checks on an WebElement.
 * This function will invoke the actors 'criteriaBundle' chain
 * and throw an error if one of the criteria is violated.
 * @param webElement
 * @param cb
 */
BlueprintRunner.prototype.applyCriteria = function (webElement,cb) {
    var _actor = this.actor;
    _actor.criteriaBundle.checkCriterion(webElement,cb);

};

/**
 * @description
 * Enter some text into the given text field, provided by the WebElement.
 * @param webElement , the reference to the text field
 * @param text , the text that should be entered into the WebElement.
 * @param callback
 */
BlueprintRunner.prototype.enterText = function (webElement,text,callback) {
     webElement.sendKeys(text)
         .then(function () {
             callback();
         });
};


/**
 * @description
 * Got the the URL location, defined by the parameter 'where'
 * @param where , the URL
 * @param callback
 */
BlueprintRunner.prototype.goTo = function (where, callback) {
    this.driver.get(where)
        .then(function () {
            callback();
        });
};

/**
 * @description
 * Get the title of the web page
 * @returns {*}
 */
BlueprintRunner.prototype.getPageTitle = function () {
    return  this.driver.getTitle();
};
