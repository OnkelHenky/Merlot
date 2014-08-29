/**
 * Created by Henka on 07.06.14.
 */
/** @module blueprintRunner */
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
    DOMElement = require('./auxilium/DOMElement');
    Merlot = require('./Merlot').Merlot;

/**
 * @description
 * The export function for the user scenario blue print runner.
 * @type {BlueprintRunner}
 * @constructor
 */
BlueprintRunner = exports.BlueprintRunner = function(config) {

    /*Information*/
    this._type_    = "BlueprintRunner Object"; //Name of the object

    this.config  = {
        'seleniumPath': '',
        'port' : '4444',
        'browser' : 'chrome'

    };

    this.driver = {};
    this.webdriver = webdriver;
    this.actor = new ActorProvider.Actors["Paul"]; //Default actor


    if(config && (config.seleniumPath && config.port && config.browser)) {
        this.addConfiguration(config);
    } else {
        throw new Error("You must provide a blueprint configuration in the format: " + "{'seleniumPath': '/path/to/selenium.jar','port' : '4444','browser' : 'chrome'}");
    }

};

/**
 * @description
 * Get all the stuff from Merlot prototype
 * @type {Merlot}
 */
BlueprintRunner.prototype = new Merlot();

/**
 * @description
 * Resolving the identifier of an DOMElement by cutting if the '@' form the cucumber scenario steps
 * Example: if you have a step like: 'The actor chooses "Saab" from the selection whose @id is "cars"'
 * The '@' in '@id' indicates the the attribute: 'id' with the value 'cars' should be selected.
 * The '@' is just an abbreviation for attribute and must be cut of before further processing.
 * @param identifiedBy
 * @returns {*} the resolved identifier
 */
BlueprintRunner.prototype.resolveAttributeName = function (identifiedBy) {
    var self = this,
        _resolvedIdentifiedBy;

    switch (identifiedBy){
        case "@id":
        case "@name":
        case "@href":
        case "@value":
        case "@label":
            _resolvedIdentifiedBy =  identifiedBy.split("@")[1]; /* Cutting of the '@' */
            break;
        case "textNode":
            _resolvedIdentifiedBy = identifiedBy;
            break;
        default:
            throw new Error('"'+identifiedBy+'" is not valid identifier - use "id", "text", "name" or "href" instead');
            break;
    }

    return _resolvedIdentifiedBy;

};

/**
 * @description
 * Adding the configuration for a new BlueprintRunner object
 * @param {{a: number, b: string, c}} config - Tetet
 */
BlueprintRunner.prototype.addConfiguration = function (config) {
    var self = this;

    /*
     * Helper function for making an instance of the webdriver
     * If the the browser is 'chrome', special options for are passed
     * to the webdriver, to avoid any errors in the browser.
     */
    function _serverBuilder(caps,server,browser){

        var ChromeOptions =  require('selenium-webdriver/chrome').Options;
        var _chromeOpt = new ChromeOptions().addArguments("test-type");

        if('chrome' === browser){
            return new webdriver.Builder().
                usingServer(_server.address()).
                withCapabilities(caps).
                setChromeOptions(_chromeOpt);
        }else{
            return new webdriver.Builder().
                usingServer(_server.address()).
                withCapabilities(caps);
        }


    }

    try {
        var _stats = self.utile._fs_.statSync(config.seleniumPath);
        /*
         * Check if the given path to the selenium jar is pointing to an actual file.
         * This throws an exception if the path is not pointing to a file
         */
        if (_stats.isFile()) {
            self.config = config;
            var _pathToSeleniumJar = self.config.seleniumPath,
                _server = new SeleniumServer(_pathToSeleniumJar, {
                    port: self.config.port

                });

            console.log("Using selenium from: " + _pathToSeleniumJar);
            _server.start();

            var _serverCapabilities = webdriver.Capabilities.chrome();  //default
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
                    console.info('Internet Explorer is not yet supported, using Chrome instead');
                default :
                    console.log(self.config.browser +' is not defined, using Chrome instead');
                    _serverCapabilities = webdriver.Capabilities.chrome();
            }

            self.driver = _serverBuilder(_serverCapabilities,_server,self.config.browser).build();

        }
    } catch (ex) {
        console.dir(ex);
        console.log('Selenium JAR not found at ' + ex['path']);
        console.log('HINT: Check for typos');
        self.driver.quit(); // quiting the driver, since we have an error.
        throw new Error('Unable to find selenium.jar');
    }

};

/**
 * @description
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
 * Define the actor, that shall be used during the blueprint spielwiese.
 * @param actor {string} the name of the actor.
 */
BlueprintRunner.prototype.runWithThatActor = function (actor) {
  var that = this;

    if(actor && (typeof actor === 'string' || actor instanceof String)){

        if(ActorProvider.Actors[actor]){
            that.actor = new ActorProvider.Actors[actor];
            console.info('Using "'+that.actor+'" as actor');
        }else{
            throw new ReferenceError('Actor with name "'+actor+'" not found')
        }
    }else{
        throw new TypeError('Actor with name "'+actor+'" not defined');
    }
};

/**
 * @description
 * Set the login credentials, username and password, for the defined actor.
 * @param type
 * @param value
 */
BlueprintRunner.prototype.setLoginCredentialsForActor = function (type,value) {
    var that = this,
        _aux = that.utile._aux_;

    if(that.actor){
        if(_aux.isString(type) && _aux.isString(value)) {
            switch (type) {
                case 'username':
                    that.actor.setUsername(value);
                    break;
                case 'password':
                    that.actor.setPassword(value)
                    break
                default:
                    throw new TypeError("Type "+ type + " for 'setLoginCredentialsForActor is not allowed, use 'username' or 'password'");
                    break;
            }
        }
    }else{
        throw new TypeError("No actor defined in the blueprintRunner, therefor you cant set any LoginCredentials ");
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
 * Find a radio button in a radio group.
 * With webElement = The first radio button in the group.
 * And domElement = The representation of the radio button, that we are looking for.
 * @throws {ElementNotFoundError} If no radio button with given format defined in 'domElement' can be found with in the radio group.
 * @param webElement
 * @param domElement
 * @returns {*} - A promise with the radio button.
 */
BlueprintRunner.prototype.interactWithElement = function (webElement,domElement) {
    var _actor = this.actor;
    return _actor.interactWithElement.call(this,webElement,domElement);
};

/**
 *
 * @param webElement
 * @param domElement
 * @returns {*}
 */
BlueprintRunner.prototype.interactWithSelection = function (webElement,domElement) {
    var _actor = this.actor;
   return _actor.interactWithSelection.call(this,webElement,domElement);
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

/**
 * @description
 * Close the driver instance, which closes also the browser process.
 */
BlueprintRunner.prototype.closeDriver = function () {
      this.driver.close();
};

