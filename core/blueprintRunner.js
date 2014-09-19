/**
 *  blueprintRunner.js is part of Merlot
 *  Copyright (c) by Alexander Henka, 07.06.14.
 *  Project URL: https://github.com/OnkelHenky/Merlot
 *
 * +--------------------------------------------------------------------------+
 * | LICENSE INFORMATION                                                      |
 * | ===================                                                      |
 * |                                                                          |
 * | Licensed under the Apache License, Version 2.0 (the "License");          |
 * | you may not use this file except in compliance with the License.         |
 * | You may obtain a copy of the License at                                  |
 * |                                                                          |
 * | http://www.apache.org/licenses/LICENSE-2.0                               |
 * |                                                                          |
 * | Unless required by applicable law or agreed to in writing, software      |
 * | distributed under the License is distributed on an "AS IS" BASIS,        |
 * | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 * | See the License for the specific language governing permissions and      |
 * | limitations under the License.                                           |
 * +--------------------------------------------------------------------------+
 */

/*
 * +----------------------------+
 * |      Blueprint Runner      |
 * |      ================      |
 * +----------------------------+
 */

/*
 * +----------------------------+
 * |   Require selenium stuff   |
 * +----------------------------+
 */
var webdriver = require('selenium-webdriver'),
    path = require('path'),
    Logger = require('./auxilium/logger').Logger,
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

/*
 * +----------------------------+
 * |   Require Merlot stuff     |
 * +----------------------------+
 */
var BlueprintRunner,
    ActorProvider = require('./actors/actorProvider').ActorProvider,
    DOMElement = require('./auxilium/DOMElement'),
    TagNameDictionary = require('./auxilium/tagNameDictionary'),
    Merlot = require('./Merlot').Merlot;
    Pinot = require('./pinot/pinot').Pinot;

/**
 * @description
 * The export function for the user scenario blueprint runner.
 * The blueprint runner is the core component in Merlot.
 * It is responsible for conducting the actual acceptance test
 * and the management of the test workflow.
 * @type {BlueprintRunner}
 * @param config the configuration for the test setup
 * @constructor
 */
BlueprintRunner = exports.BlueprintRunner = function (config) {

    /*
     * +----------------------------+
     * |        Information         |
     * +----------------------------+
     */
    this._type_ = "BlueprintRunner Object"; //Name of the object


    this.config = {                         // Default config, used of the no config is provided
        'seleniumPath': '',
        'port': '4444',
        'browser': 'chrome',
        'pageTimeout': 5000,
        'elementTimeout': 5000,
        'debug': true
    };

    /*
     * +----------------------------+
     * |        Properties          |
     * +----------------------------+
     */
    this.aux = this.utile._aux_; // 'short cut' properties from Merlot object
    this.logger = new Logger({'logLevel': 0});
    this.driver = {};
    this.webdriver = webdriver;
    this.actor = new ActorProvider.Actors["Paul"]; //Default actor
    this.acessibilityRuleset = this.actor.getAcessibilityRuleset();

    if (config && (config.seleniumPath && config.port && config.browser)) {
        this.addConfiguration(config);
    } else {
        this.addConfiguration(this.config);
        //throw new Error("You must provide a blueprint configuration in the format: " + "{'seleniumPath': '/path/to/selenium.jar','port' : '4444','browser' : 'chrome'}");
    }

     this.pinotServer = new Pinot();
     this.pinotServer.start();

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

    switch (identifiedBy) {
        case "@id":
        case "@name":
        case "@href":
        case "@value":
        case "@label":
        case "@css":
        case "@style":
            _resolvedIdentifiedBy = identifiedBy.split("@")[1];
            /* Cutting of the '@' */
            break;
        case "textNode":
        case ">text":
            _resolvedIdentifiedBy = "textNode"; //identifiedBy.split(">")[1]; /* Cutting of the '>' */
            break;
        default:
            throw new Error('"' + identifiedBy + '" is not valid identifier! e.g.; "@id", "@name", "@value" or ">text", to get the text node value');
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
    if (config.logLevel !== undefined && this.aux.isNumber(config.logLevel)) {
        this.logger = new Logger({'logLevel': config.logLevel});
    }

    /*
     * Helper function for making an instance of the webdriver
     * If the the browser is 'chrome', special options for are passed
     * to the webdriver, to avoid any errors in the browser.
     */
    function driverBuilder(caps, server, browser) {

        if ('chrome' === browser) {
            /*Adding chrome options to avoid error massages*/
            var ChromeOptions = require('selenium-webdriver/chrome').Options;
            var _chromeOpt = new ChromeOptions().addArguments("test-type");

            /* New in selenium-webdriver 2.43.x
             * See: http://www.joecolantonio.com/2014/09/09/selenium-webdriver-version-2-43-0-released/*/
            return new webdriver.Builder().
                     forBrowser('chrome').
                     setChromeOptions(_chromeOpt); //.build();

           /* Old pre 2.43.x way
           return new webdriver.Builder().
                usingServer(server.address()).
                withCapabilities(caps).
                setChromeOptions(_chromeOpt);
           */

        } else {
            return new webdriver.Builder().
                usingServer(server.address()).
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
                    _serverCapabilities = webdriver.Capabilities.chrome();
                    break;
                default :
                    this.logger.info(self.config.browser + ' is not defined, using Chrome instead');
                    _serverCapabilities = webdriver.Capabilities.chrome();
                    break;
            }

            self.driver = driverBuilder(_serverCapabilities, _server, self.config.browser).build();

              var timeouts = new self.webdriver.WebDriver.Timeouts(self.driver);
                  timeouts.setScriptTimeout(100000); //TODO: set timer to wait for pages to be loaded
            //  timeouts.pageLoadTimeout(10000); //set timer to wait for pages to be loaded
            //  timeouts.implicitlyWait(10000); //wait 3 seconds for every element to retrieve
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
 * TODO: function is deprecated
 * @description
 * Create a new DOMElement with the given properties
 * @deprecated
 * @param properties
 * @returns {DOMElement}
 */
BlueprintRunner.prototype.createDOMElementProperties = function (properties) {
    if (properties) {
        return new DOMElement(properties);
    } else {
        throw new Error("Can not create new DOMElement with empty properties!");
    }
};

/**
 * @description
 * Create a new DOMElement with the given properties
 * @param properties
 * @returns {DOMElement}
 */
BlueprintRunner.prototype.createDOMElement = function (properties) {

    var _resolvedTagName,
        _resolvedType,
        _resolvedAttributeName = this.resolveAttributeName(properties.identifiedBy);


    if (TagNameDictionary.hasOwnProperty(properties.tagName)) {

        _resolvedTagName = TagNameDictionary[properties.tagName].eleName;
        _resolvedType = TagNameDictionary[properties.tagName].type;

        var domeElementProperties = {
            'tagName': _resolvedTagName,
            'type': _resolvedType,
            'searchAttribute': {
                "name": _resolvedAttributeName,
                'value': properties.identifierValue
            }
        };

        if (properties.name) {
            domeElementProperties.name = properties.name;
        }

        return new DOMElement(domeElementProperties);

    } else {
        throw new Error('"' + properties.tagName + '" is not a valid tag name');
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

    if (_aux.isString(actor)) {

        if (ActorProvider.Actors[actor]) {
            that.actor = new ActorProvider.Actors[actor];
            this.logger.info('Using "' + that.actor + '" as actor');
        } else {
            throw new ReferenceError('Actor with name "' + actor + '" not found')
        }
    } else {
        throw new TypeError('Actor with name "' + actor + '" not defined');
    }
};

/**
 * @description
 * Set the login credentials, username and password, for the defined actor.
 * @param type
 * @param value
 */
BlueprintRunner.prototype.setLoginCredentialsForActor = function (type, value) {
    var that = this,
        _aux = that.utile._aux_;

    if (that.actor) {
        if (_aux.isString(type) && _aux.isString(value)) {
            switch (type) {
                case 'username':
                    that.actor.setUsername(value);
                    break;
                case 'password':
                    that.actor.setPassword(value);
                    break;
                default:
                    throw new TypeError("Type " + type + " for 'setLoginCredentialsForActor is not allowed, use 'username' or 'password'");
                    break;
            }
        }
    } else {
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
    return this.actor.findElement.call(this, domElement);
};


/**
 * @description
 * Let the actor perform a 'click'
 * @param webEle
 */
BlueprintRunner.prototype.click = function (webEle) {
    return this.actor.click.call(this, webEle);
};

/**
 * @description
 * Let the actor perform accessibility checks on an WebElement.
 * This function will invoke the actors 'criteriaBundle' chain
 * and throw an error if one of the criteria is violated.
 * @param webElement
 * @param cb
 */
BlueprintRunner.prototype.applyCriteria = function (webElement, cb) {
    this.actor.criteriaBundle.checkCriterion(webElement, cb);
};

/**
 * @description
 * Enter text into the given text field, provided by the WebElement.
 * @param webElement , the reference to the text field
 * @param text , the text that should be entered into the WebElement.
 */
BlueprintRunner.prototype.enterText = function (webElement, text) {
    return webElement.sendKeys(text);
};

/**
 * @description
 * Find a radio button in a radio group.
 * With webElement = The first radio button in the group.
 * And domElement = The representation of the radio button, that we are looking for.
 * @throws  {ElementNotFoundError} If no radio button with given format defined in 'domElement' can be found with in the radio group.
 * @param   {Object} webElement
 * @param   {Object} domElement
 * @returns {Object} A promise with the radio button.
 */
BlueprintRunner.prototype.interactWithRadioButton = function (webElement, domElement) {
    var _actor = this.actor;
    return _actor.interactWithRadioButton.call(this, webElement, domElement);
};

/**
 *
 * @param webElement
 * @param domElement
 * @returns {*}
 */
BlueprintRunner.prototype.interactWithSelection = function (webElement, domElement) {
    var _actor = this.actor;
    return _actor.interactWithSelection.call(this, webElement, domElement);
};

/**
 * @description
 * Perform an accessibility evaluation on the provided element
 * @param {object} webElement the element to tes
 * @returns {webdriver.promise.Deferred.promise|*} a promise that will be resolved when the evaluation is completed
 */
BlueprintRunner.prototype.evalAccessibility = function (webElement) {
    var self = this,
        _accessibilityRuleset = self.actor.getAcessibilityRuleset(),
        _deferred = self.webdriver.promise.defer();

    webElement.getOuterHtml().
        then(function(outerHtml){
            console.log('outerHtml = ' +outerHtml);
            return outerHtml;
        }).
        then(function injectPinot(outerHtml) {
             return self.injectAcessibilityTestScripts().
                    then(function(){
                        return outerHtml;
                    });
        }).
        then(function(outerHtml){
            self.driver.executeAsyncScript(function(ruleset,html) {
                window.Gamay.accessibilityEvaluationHTMLCS(ruleset,html,arguments[arguments.length - 1]);
            }, _accessibilityRuleset, ''+outerHtml)
                .then(function checkResult(erros) {
                    console.log("\b\b\b");
                    erros.forEach(function (error) {
                        console.log(error.type + '|'
                            + error.code + '|'
                            + error.wcagConf + '|'
                            + error.wcagGuideline + '|'
                            + error.wcagPrinciple + '|'
                            + error.wcagTechnique + '|'
                            + error.msg + '|'
                            + error.nodeName + '|'
                            + error.className + '|'
                            + error.id);
                        console.log("\b");
                    });

                });
        }).
        then(function onOK() {
            _deferred.fulfill(webElement);
        });

    return _deferred.promise;

};

/**
 *
 * @returns {webdriver.promise.Deferred.promise|*}
 */
BlueprintRunner.prototype.injectAcessibilityTestScripts = function () {
    var self = this,
        _deferred = self.webdriver.promise.defer();

     self.driver.executeScript(function () {
        if (!window.jQuery) {
            var jqueryScriptTag = document.createElement("script");
            jqueryScriptTag.type = "text/javascript";

            if (jqueryScriptTag.readyState) {  //IE
                jqueryScriptTag.onreadystatechange = function () {
                    if (jqueryScriptTag.readyState == "loaded" ||
                        jqueryScriptTag.readyState == "complete") {
                        jqueryScriptTag.onreadystatechange = null;
                        //  cb("jquery loaded");
                    }
                };
            } else {  //Others
                jqueryScriptTag.onload = function () {
                    //   cb("jquery loaded");
                };
            }
            jqueryScriptTag.src = "http://localhost:3000/javascripts/jquery-1.11.1.min.js";
            document.head.appendChild(jqueryScriptTag);
        }
    }). then(function injectHTMLCS() {
        return  self.driver.executeScript(function () {
            if (!window.HTMLCS) {
                var _htmlcsScriptTag = document.createElement("script");
                _htmlcsScriptTag.type = "text/javascript";

                if (_htmlcsScriptTag.readyState) {  //IE
                    _htmlcsScriptTag.onreadystatechange = function () {
                        if (_htmlcsScriptTag.readyState == "loaded" ||
                            _htmlcsScriptTag.readyState == "complete") {
                            _htmlcsScriptTag.onreadystatechange = null;
                            //  cb("jquery loaded");
                        }
                    };
                } else {  //Others
                    _htmlcsScriptTag.onload = function () {
                        //   cb("jquery loaded");
                    };
                }
                _htmlcsScriptTag.src = "http://localhost:3000/javascripts/HTML_CodeSniffer/HTMLCS.js";
                document.head.appendChild(_htmlcsScriptTag);
            }
         });

     }).
      then(function injectGamay() {
             return  self.driver.executeScript(function () {
                 if (!window.Gamay) {
                     var gamayScriptTag = document.createElement("script");
                     gamayScriptTag.type = "text/javascript";
                     if (gamayScriptTag.readyState) {  //IE
                         gamayScriptTag.onreadystatechange = function () {
                             if (gamayScriptTag.readyState == "loaded" ||
                                 gamayScriptTag.readyState == "complete") {
                                 gamayScriptTag.onreadystatechange = null;
                                 //  cb("jquery loaded");
                             }
                         };
                     } else {  //Others
                         gamayScriptTag.onload = function () {
                             //   cb("jquery loaded");
                         };
                     }
                     gamayScriptTag.src = "http://localhost:3000/javascripts/gamay.js";
                     document.head.appendChild(gamayScriptTag);
                 }

             });

         }).
         then(function onOk() {
             _deferred.fulfill();
         }).
         then(null, function onError(err) {
             _deferred.reject(err);
         });

    return _deferred.promise;

};

/**
 * @description
 * Got the the URL location, defined by the parameter 'where'
 * @param where , the URL
 * @param callback
 */
BlueprintRunner.prototype.goTo = function (where, callback) {
    var self = this;
    this.driver.get(where).
       then(function injectPinot() {
          return self.injectAcessibilityTestScripts();
        }).
        then(function onOk() {
            callback();
        }).
        then(null, function onError(err) {
            callback.fail(err);
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
 * Switch to the window with the given handle
 * and wait for a page to be ready when document.readyState is 'complete'
 * Credit for this solution to Harry and Thomas Marks
 * URl: http://www.obeythetestinggoat.com/how-to-get-selenium-to-wait-for-page-load-after-a-click.html
 * @param handle the handle
 * @returns {*} a promise
 */
BlueprintRunner.prototype.switchToNewHandle = function (handle) {
    var _driver = this.driver,
        _by = this.webdriver.By,
        _deferred = this.webdriver.promise.defer();

    function isPageStale(htmlElementOfTheOldPage) {
        return  htmlElementOfTheOldPage.findElement(_by.id("12SomeIDdoesntMatter345")).
            then(function whatWeFoundAElement() {
                return false;
            }).
            then(null, function onError(error) {
                return('StaleElementReferenceError' === error.name);
            });
    }

    _driver.findElement(_by.tagName("html")).
        then(function switchToNewHandle(htmlElementOfTheOldPage) {
            _driver.switchTo().window(handle).
                then(function waitForThePageToBeReady() {
                    _driver.wait(function untilOldPageHasGoneStale() { //wait until ...
                        return isPageStale(htmlElementOfTheOldPage);
                    }).
                        then(function pageShouldBeReadyNow() {
                            _deferred.fulfill(true);
                        });
                });
        });

    return _deferred.promise;
};

/**
 * @description
 * Waiting for an element to be present or ready .
 * @param locator the locator used to find the element
 * @param TIMEOUT the time in milliseconds to wait for the element
 * @returns {*}  a promise
 */
BlueprintRunner.prototype.waitForElementToBeReady = function (locator, TIMEOUT) {
    var _driver = this.driver;
    return _driver.wait(function () {  //wait until ...
        return _driver.isElementPresent(locator);
    }, TIMEOUT, "Element was not ready after " + TIMEOUT + " milliseconds");
};


/**
 * @description
 * Close the driver instance, which closes also the browser process.
 */
BlueprintRunner.prototype.closeDriver = function () {
    this.driver.close();
};