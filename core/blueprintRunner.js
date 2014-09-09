/**
 * Created by Henka on 07.06.14.
 */
/** @module blueprintRunner */
/*
 * Require selenium stuff
 */
var webdriver = require('selenium-webdriver'),
    path = require('path'),
    Logger = require('./auxilium/logger').Logger,
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
        'browser' : 'chrome',
        'pageTimeout' : 5000,
        'elementTimeout' : 5000,
        'debug' : true

    };

    /*'short cut' properties*/
    this.aux = this.utile._aux_; //From Merlot object

    /*Properties*/
    this.logger = new Logger({'logLevel' : 0});
    this.driver = {};
    this.webdriver = webdriver;
    this.actor = new ActorProvider.Actors["Paul"]; //Default actor


    if(config && (config.seleniumPath && config.port && config.browser)) {
        this.addConfiguration(config);
    } else {
        this.addConfiguration(this.config);
        //throw new Error("You must provide a blueprint configuration in the format: " + "{'seleniumPath': '/path/to/selenium.jar','port' : '4444','browser' : 'chrome'}");
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
        case "@css":
        case "@style":
            _resolvedIdentifiedBy =  identifiedBy.split("@")[1]; /* Cutting of the '@' */
            break;
        case ">text":
            _resolvedIdentifiedBy = "textNode"; //identifiedBy.split(">")[1]; /* Cutting of the '>' */
            break;
        default:
            throw new Error('"'+identifiedBy+'" is not valid identifier! e.g.; "@id", "@name", "@value" or ">text", to get the text node value');
            break;
    }

    return _resolvedIdentifiedBy;

};

/**
 * @description
 * Adding the configuration for a new BlueprintRunner object.
 * Example config object in JSON format.
 * {
 *   'seleniumPath': require('path').join(__dirname, '../../bin/selenium-server-standalone-2.42.0.jar'),
 *   'port' : '4444',
 *   'browser' : 'chrome',
 *   'logLevel' : 3
 *  };
 * @param {{a: number, b: string}} config
 */
BlueprintRunner.prototype.addConfiguration = function (config) {
    var self = this;


    /*
     * Enable Merlot debug logger if the config contains the property
     * 'config.logLevel' with a valid 'numeric' value.
     *  1 = Only Logs; 2 = Logs and Info; 3 =  Logs, Info and Errors
     */
    if(config.logLevel !== undefined && this.aux.isNumber(config.logLevel)){
        this.logger = new Logger({'logLevel' :config.logLevel});
    }

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

            this.logger.info("Using selenium from: " + _pathToSeleniumJar);
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
                    this.logger.info('Internet Explorer is not yet supported, using Chrome instead');
                default :
                    this.logger.info(self.config.browser +' is not defined, using Chrome instead');
                    _serverCapabilities = webdriver.Capabilities.chrome();
            }

            self.driver = _serverBuilder(_serverCapabilities,_server,self.config.browser).build();


        var timeouts =  new  self.webdriver.WebDriver.Timeouts(self.driver);
             timeouts.pageLoadTimeout(5000); //set timer to wait for pages to be loaded
             timeouts.implicitlyWait(3000); //wait 3 seconds for every element to retrieve

        }
    } catch (ex) {
        this.logger.dir(ex);
        this.logger.log('Selenium JAR not found at ' + ex['path']);
        this.logger.log('HINT: Check for typos');
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
  var that = this,
      _aux = that.utile._aux_;

    if(_aux.isString(actor)){

        if(ActorProvider.Actors[actor]){
            that.actor = new ActorProvider.Actors[actor];
            this.logger.info('Using "'+that.actor+'" as actor');
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
                    break;
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
BlueprintRunner.prototype.interactWithRadioButton = function (webElement,domElement) {
    var _actor = this.actor;
    return _actor.interactWithRadioButton.call(this,webElement,domElement);
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
 * @returns {*}  a promise
 */
BlueprintRunner.prototype.getPageTitle = function () {
    return  this.driver.getTitle();
};

/**
 * @description
 * Get the handle of the current window
 * @returns {*}  a promise
 */
BlueprintRunner.prototype.getCurrentWindowHandle = function () {
    return  this.driver.getWindowHandle();
};

/**
 * @description
 * Get all handles of all windows, or tabs
 * @returns {*} a promise
 */
BlueprintRunner.prototype.getAllWindowHandles = function () {
    return this.driver.getAllWindowHandles();
};

/**
 * @description
 * Switch to the window with the goven handle
 * @param handle the handle
 * @returns {*} a promise
 */
BlueprintRunner.prototype.switchToNewHandle = function (handle) {
    // this.driver.close(); /*closing old handle*/
   return this.driver.switchTo().window(handle);
};

/**
 * @description
 * Waiting for an element to be present or ready .
 * @param locator the locator used to find the element
 * @param TIMEOUT the time in milliseconds to wait for the element
 * @returns {*}  a promise
 */
BlueprintRunner.prototype.waitForElementToBeReady = function (locator,TIMEOUT) {
    var  _driver = this.driver;
    return _driver.wait(function() {  //wait until ...
            return _driver.isElementPresent(locator);
    }, TIMEOUT,"Element was not ready after "+TIMEOUT+" milliseconds");
};

/**
 * @description
 * Wait for a page to be ready when document.readyState is 'complete'
 * @param TIMEOUT the time in milliseconds to wait for the page to be ready
 * @returns {*} a promise
 */
BlueprintRunner.prototype.waitForPageToBeReady = function (TIMEOUT) {
   var  _driver = this.driver,
         that = this;

   function isPageReady(){
      return _driver.executeScript("return document.readyState").
             then(function (state) {
                 return ('complete' === state);
             });
   }

    return  _driver.wait(function() { //wait until ...
               return isPageReady();
    }, TIMEOUT,"Element is not ready after "+TIMEOUT+" milliseconds");
};


/**
 * @description
 * Close the driver instance, which closes also the browser process.
 */
BlueprintRunner.prototype.closeDriver = function () {
      this.driver.close();
};