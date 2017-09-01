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
const webdriver = require('selenium-webdriver'),
    path = require('path'),
    Logger = require('./auxilium/logger').Logger,
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    mu = require('mu2'),
    AccessibilityIssue = require('./auxilium/AccessibilityIssue').AccessibilityIssue;
const {promise,logging} = require('selenium-webdriver');

// async/await do not work well when the promise manager is enabled.
// See https://github.com/SeleniumHQ/selenium/issues/3037
//
// 3037 does not impact these specific examples, but it is still recommended
// that you disable the promise manager when using async/await.
promise.USE_PROMISE_MANAGER = false;

/*
 * +----------------------------+
 * |   Require Merlot stuff     |
 * +----------------------------+
 */
var BlueprintRunner,
    genericActor = require('./actors/genericActor').GenericActor,
    DOMElement = require('./auxilium/DOMElement'),
    TagNameDictionary = require('./auxilium/tagNameDictionary'),
    MerlotErrors = require('./auxilium/MerlotErrors'),
    Merlot = require('./Merlot').Merlot,
    Pinot = require('./pinot/pinot').Pinot,
    Evaluator = require('./evaluator').Evaluator;

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


    this.config = {     // Default config, used if no config is provided
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
    this.aux                 = this.utile._aux_; // 'short cut' properties from Merlot object
    this.logger              = new Logger({'logLevel': 3});
    this.driver              = {};
    this.webdriver           = webdriver;
    this.isssuesMsgs         = []; // Array with all found accessibility issues
    this.reportDirectory     = ""; // Path where the accessibility issue report shall be stored.
    this.vinFiles            = ""; // Path where the vin files (actor rulesets) can be found.
    this.currentBlueprint    = ""; // The name of the current blueprint - aka: "The Scenario" in terms of cucumber
    this.evaluator           = new Evaluator(); // Evaluator object that hold all the evaluation functions

    if (config && (config.seleniumPath && config.port && config.browser)) {
        this.addConfiguration(config);
    }else {
        this.logger.info("Not proper blueprint config, please provide at least path to selenium, the port number and the desired browser'"
                         + "Example config:" +
                         +" {'seleniumPath': require('path').join(__dirname, '../../bin/selenium-server-standalone-2.42.0.jar'),"
                         +" 'port' : '4444',"
                         +" 'browser' : 'chrome'}");
        this.addConfiguration(this.config);
    }

    /*
     * +----------------------------+
     * |         PINOT SERVER       |
     * +----------------------------+
     *  Used to inject GAMAY (and jQuery) into the client's
     *  web application.
     */
     this.pinotServer = new Pinot();
     this.pinotServer.start();

};

/**
 * @description
 * Get all the stuff from Merlot prototype
 * @type {Merlot}
 */
BlueprintRunner.prototype = new Merlot();

/*
 * +========= - START - ========+
 * |                            |
 * |    Object Configuration    |
 * |                            |
 * +============================+
 */

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
    let self = this;

    /*
     * Check if the property 'vinFlies' is specified.
     * The property should contain a valid path to the directory where
     * the vin files ares stored.
     */
    if (config.vinFiles !== undefined && self.aux.isString(config.vinFiles)) {
        if(self.utile._fs_.existsSync(config.vinFiles)){
            self.vinFiles = config.vinFiles;
            self.logger.debug('Vin Files are here: '+ self.vinFiles);
        }else{
            throw new Error(config.vinFiles+ ' is not a valid directory!!');
        }
    }

    /*
     * Enable Merlot debug logger if the config contains the property
     * 'config.logLevel' with a valid 'numeric' value.
     *  1 = Only Logs; 2 = Logs and Info; 3 =  Logs, Info and Errors
     */
    if (config.logLevel !== undefined && this.aux.isNumber(config.logLevel)) {
        this.logger = new Logger({'logLevel': config.logLevel});
    }

    if(config.reportsDir){
        this.reportDirectory = config.reportsDir;
    }

    try {
        let _stats = self.utile._fs_.statSync(config.seleniumPath);
        /*
         * Check if the given path to the selenium jar is pointing to an actual file.
         * This throws an exception if the path is not pointing to a file
         */
        if (_stats.isFile()) {
            self.config = config;
            let _pathToSeleniumJar = self.config.seleniumPath,
                _server = new SeleniumServer(_pathToSeleniumJar, {
                    port: self.config.port
                });

            this.logger.debug("Using selenium stand alone from: " + _pathToSeleniumJar);
            _server.start();

            /*
             * Build the driver.
             * NOTE: Only chrome is supported!
             */
            // self.driver = driverBuilder(self.config.browser).build();
            self.driver = driverBuilder('using_google_chrome').build();
            /*
             * Sets the timeouts for the driver. Here:
             * script: wait 10 sec. for external scripts to be loaded
             * page: wait 10sec. for teh page to be loaded
             * implicit: wait 3 seconds for for every element to be retrieved before throwing an error.
             */
            self.driver.manage().setTimeouts({script: 10 * 1000, page: 10 * 1000, implicit: 3 * 1000});
            //let logging = self.driver.getLogger()
            //console.log("==========> LOGGER OBJECT")
            // console.dir(logging);
            logging.installConsoleHandler();
            logging.getLogger('promise.ControlFlow').setLevel(logging.Level.ALL);
            self.driver.manage().logs().get(logging.Type.BROWSER)
                .then(function(entries) {
                    entries.forEach(function(entry) {
                        console.log('[%s] %s', entry.level.name, entry.message);
                    });
                });
        }

    } catch (ex) {
        this.logger.dir(ex);
        self.driver.quit(); // quiting the driver, since we have an error.
        throw new Error('Error during web driver setup');
    }


    /*
     * Helper function for making an instance of the webdriver
     * If the the browser is 'chrome', special options for are passed
     * to the webdriver, to avoid any errors in the browser.
     */
    function driverBuilder(browser) {

        if ('using_google_chrome' === browser) {
            /*Adding chrome options to avoid error massages*/
            var ChromeOptions = require('selenium-webdriver/chrome').Options;
            var _chromeOpt = new ChromeOptions().addArguments("test-type");

            /* New in selenium-webdriver >= 2.43.x
             * See: http://www.joecolantonio.com/2014/09/09/selenium-webdriver-version-2-43-0-released/*/
            return new webdriver.Builder().forBrowser('chrome').setChromeOptions(_chromeOpt);
        }

    }
};


/**
 * @description
 * Set the name of the current blueprint.
 * The name is the name of the cucumber scenario that is defined in the feature description.
 * @param name_of_the_scenario {string}
 */
BlueprintRunner.prototype.setCurrentBlueprint = function (name_of_the_scenario){
    if(name_of_the_scenario !== undefined && this.aux.isString(name_of_the_scenario)){
        this.currentBlueprint = name_of_the_scenario;
        this.logger.debug("Current Scenario = " + name_of_the_scenario);
    }else{
        this.logger.error("No scenario name found! Name is empty, please set a proper name in your Blueprint description.");
    }
};

/**
 * @description
 * Get the name of the Blueprin that us currently under evaluation.
 * @returns {string|*} The name of the blueprint
 */
BlueprintRunner.prototype.getCurrentBlueprint = function (){
    if(this.currentBlueprint !== undefined && this.currentBlueprint !== ""){
        return this.currentBlueprint
    }
    return "";
};

/**
 * @description
 * Define the actor, that shall be used during the blueprint spielwiese.
 * @param actor {string} the name of the actor.
 */
BlueprintRunner.prototype.runWithThatActor = function (actor) {
    let that = this,
        _aux = that.utile._aux_;

    if (_aux.isString(actor)) {
        try {
            that.actor = new genericActor(that.logger);
            that.actor.loadPreferenceSet(that.vinFiles,actor,that.getCurrentBlueprint());
            that.actor.setName(actor);
            this.logger.info('Actor is ' +  that.actor.getName());
        } catch(ex){
            throw new ReferenceError('Actor with name "' + actor + '" not found');
        }
    } else {
        throw new TypeError('Actor with name "' + actor + '" is not a valid string, use letters only');
    }
};

/**
 * @description
 * Set the WCAG conformance level for this blueprint evaluation
 * @param conformanceLevel
 */
BlueprintRunner.prototype.setConformanceLevel = function(conformanceLevel){
    if(["A","AA","AAA"].indexOf(conformanceLevel) !== -1){
        this.acessibilityRuleset = this.actor.getName() + conformanceLevel;
        //this.logger.info("Checking for "+ this.actor.getName() + "'s "+conformanceLevel+" level conformance");
    }else{
        this.logger.info(conformanceLevel+" is not a valid WCAG conformance level, use 'A', 'AA' or 'AAA'");
        this.logger.info("Using default WCAG conformance level: 'A'");
        this.acessibilityRuleset = this.actor.getName() + 'A';
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
        throw new TypeError("No actor defined! Hence, you cant set any login credentials.");
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
        _resolvedAttributeName = this.aux.resolveAttributeName(properties.identifiedBy);

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

/*
 * +========== - END - =========+
 * |                            |
 * |    Object Configuration    |
 * |                            |
 * +============================+
 */

/*
 * +========= - START - ========+
 * |                            |
 * |    Blueprint Commands      |
 * |                            |
 * +============================+
 */

/**
* @description
* Got the the URL location, defined by the parameter 'where'
* @param where , the URL
*/
BlueprintRunner.prototype.goTo = function (where) {
     var self = this;
     return this.driver.get(where).
        then(function injectPinot() {
             return self.injectAcessibilityTestScripts();
        })
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
* @throws  {MerlotError} If no radio button with given format defined in 'domElement' can be found with in the radio group.
* @param   {Object} webElement
* @param   {Object} domElement
* @returns {Object} A promise with the radio button.
*/
BlueprintRunner.prototype.interactWithRadioButton = function (webElement, domElement) {
    var _actor = this.actor;
    return _actor.interactWithRadioButton.call(this, webElement, domElement);
};

/**
* @param webElement
* @param domElement
* @returns {*}
*/
BlueprintRunner.prototype.interactWithSelection = function (webElement, domElement) {
   return this.actor.interactWithSelection.call(this, webElement, domElement);
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
    return _driver.wait( () => {  //wait until ...
            return _driver.isElementPresent(locator);
    }, TIMEOUT, "Element was not ready after " + TIMEOUT + " milliseconds");
};


/*
 * +========= - END - ==========+
 * |                            |
 * |    Blueprint Commands      |
 * |                            |
 * +============================+
 */



/*
 * +========= - START - ==========+
 * |                              |
 * |   Accessibility Evaluation   |
 * |                              |
 * +==============================+
 */

/**
 * @description
 * Perform an accessibility evaluation on the provided element
 * @param webElement {object}, the web element to be tested
 * @param domElement {object}, the web element's representation as domElement
 * @param _stepDescr String, the current step description
 * @param semantics , the semantics of the current actor
 * @returns {webdriver.promise.Deferred.promise|*} a promise that will be resolved when the evaluation is completed
 */
BlueprintRunner.prototype.evalAccessibilityWithSemantic = function (webElement, domElement,_stepDescr,semantics)  {
    return this.evaluator.evalAccessibilityWithSemantic.call(this, webElement, domElement,_stepDescr,semantics);
};

/**
 * @description
 * Perform an accessibility evaluation on the provided element
 * @param {object} webElement the element to test
 * @param {object} domElement the web element's representation as domElement
 * @param {String} _stepDescr, the current step description
 * @returns {webdriver.promise.Deferred.promise|*} a promise that will be resolved when the evaluation is completed
 */
BlueprintRunner.prototype.evalAccessibility = function (webElement, domElement,_stepDescr) {
    return this.evaluator.evalAccessibility.call(this,webElement,domElement,_stepDescr);

};

/**
 * @description
 * Applying a semantic requirement statement on the web application, which is being evaluated in the current Blueprint.
 * The semantic requirement statement is shown to the tester in form of a pop-up.
 * @param _domElement the element on the web application for which the semantic requirement applies to.
 * @param callback the callback for cucumber
 * @param semanticRequirementStatement semantic requirement statement - Array
 */
BlueprintRunner.prototype.applySemanticRequirementStatement = function(_domElement,semanticRequirementStatement,callback){
    let self = this;

    self.driver.executeAsyncScript(function checkIfElementExistsOnThePage(_domElement) {
        window.Gamay.isValidElement(_domElement,arguments[arguments.length - 1]);

    }, _domElement.getCSSSelector()).then(function outlineError(validStatus){
        if(!validStatus){ //not valid, maybe it a typo.
            callback.fail(new MerlotErrors.ElementNotFoundError("Element " + _domElement + " does not exit check for typos").message);
        }else{ //valid
            //self.addAccessibilityIssue(obj);
            self.driver.executeAsyncScript(function(_domElement,semanticRequirementStatement) {
                window.Gamay.markSemanticRequirement(_domElement,semanticRequirementStatement,arguments[arguments.length - 1]);
            }, _domElement.getCSSSelector(), semanticRequirementStatement).then(function(ok){
                callback.fail(new MerlotErrors.AbortEvaluationError(self.actor.getName()+" can't continue with the scenario due to an error."
                    + " \n See the Error report, or the highlighted section on your web page for more details.").message);
            });
        }
    });

};


/**
 * @description
 * Get all the array with the found accessibility issues
 * @returns {Array}
 */
BlueprintRunner.prototype.getArrayWithAccessibilityIssues = function(){
    return this.isssuesMsgs
};

/**
 * @description
 * Adds an accessibility issue an the issue stack
 * @param issue
 */
BlueprintRunner.prototype.addAccessibilityIssue = function(issue){
    this.isssuesMsgs.push(issue);
};

/**
 *
 * @returns {object}
 */
BlueprintRunner.prototype.getAccessibilityIssuesBuffer = function(ScenarioName, issues, cb){
    var self    = this,
        _buffer ='';
    this.logger.dir(self);
    /*
     * MU Template:
     *
     * {{#msgs}}
     *  STEP: {{stepDescr}}
     *        {{#issues}}
     *            ###### {{type}}
     *            {{#msg}}
     *                * {{m}}
     *            {{/msg}}
     *        {{/issues}}
     * {{/msgs}}
     */
    mu.root = __dirname + '/reports';
    var data =  issues.map(function(step){
        return {
            stepDescr: step.stepDescr,
            issues: step.isssues.map(function(issue){
                return {
                    type: issue.type,
                    msg : issue.msgs.map(function(issuesDescription){
                        return { m: issuesDescription.msg }
                    })
                }
            })
        };
    });
    var time = new Date();
    var context = {
        scenario: ScenarioName,
        currentDate : time.toLocaleDateString() + " " + time.getHours()+":"+time.getMinutes()+":"+time.getSeconds(),
        msgs: data,
        actor : self.actor.getName()
    };
    mu.compileAndRender('report.md.mu', context).
    on('data', function (data) { _buffer += data;}).
    on('end', function () { cb(_buffer);}).
    on('error', function (error) {self.logger.log(error);});
};

/*
 * +========= - END - ============+
 * |                              |
 * |   Accessibility Evaluation   |
 * |                              |
 * +==============================+
 */

/*
 * +========= - START - ==========+
 * |                              |
 * |          REPORTING           |
 * |                              |
 * +==============================+
 */

/**
 * @description
 * Get the path to the directory where the reports should be stored
 * @returns {string}
 */
BlueprintRunner.prototype.getReportDirectory = function(){
    return this.reportDirectory;
};

/**
 * @description
 * Print a given buffer
 * @param buffer
 * @param callback
 * @param scenario
 */
BlueprintRunner.prototype.printIssuesBuffer = function(buffer,scenario,callback){
    var self       = this,
        _logger    = this.logger,
        _fs        = self.utile._fs_,
        _path      = self.utile._path_,
        _reportDIR = self.getReportDirectory(),
        _issues    = self.getArrayWithAccessibilityIssues();

    _logger.log('Buffer = ' +buffer);
    _logger.log("Writing report for =" + scenario.scenario.name);
    var issuePath = _path.join(_reportDIR, '/report.md');

    _fs.writeFile(issuePath, buffer, function (err) {
        if (err) {
            _logger.error('Error during the writing of the report' +err);
            callback(err);
        }

        if (_issues.length > 0) {
            _logger.info("Found accessibility issues:");
            _issues.forEach(function (issue) {
                _logger.info(issue.stepDescr);
                issue.isssues.forEach(function(error){
                    _logger.info(  error.type + '|'
                        + error.code + '|'
                        + error.wcagConf + '|'
                        + error.wcagGuideline + '|'
                        + error.wcagPrinciple + '|'
                        + error.wcagTechnique + '|'
                        + error.msg + '|'
                        + error.nodeName + '|'
                        + error.className + '|'
                        + error.id +'\b');
                })

            });
        } else {
            _logger.info("No accessibility issues found");
        }
        callback();
    });
};

/**
 * @description
 * Print the evaluation report
 * @param scenario
 * @param callback
 */
BlueprintRunner.prototype.printEvaluationReport = function(scenario,callback){
    var self       = this,
        _logger    = this.logger,
        _fs        = self.utile._fs_,
        _reportDIR = self.getReportDirectory(),
        _issues    = self.getArrayWithAccessibilityIssues();

    _logger.info("Generating evaluation report");
    callback();

    _fs.exists(_reportDIR, function (exists) {
        if (!exists) {
            _fs.mkdir(_reportDIR, function (err) {
                if (err) {
                    _logger.error("Error during creation of the reports directory" +err);
                    callback(err);
                }else{
                    self.getAccessibilityIssuesBuffer(scenario.scenario.name, _issues, function(buffer){
                        self.printIssuesBuffer(buffer,scenario,callback);
                    });
                }
            });
        } else {
            self.getAccessibilityIssuesBuffer(scenario.scenario.name, _issues, function(buffer){
                self.printIssuesBuffer(buffer,scenario,callback);
            });
        }
    });

};


/*
 * +========== - END - ===========+
 * |                              |
 * |          REPORTING           |
 * |                              |
 * +==============================+
 */


/*
 * +========= - START - ==========+
 * |                              |
 * |        Error Handling        |
 * |              &               |
 * |         Communication        |
 * |                              |
 * +==============================+
 */

/**
 * @description
 * Handling any errors
 * @param error, the Error
 * @param _domElement the element on the web application that caused the error
 * @param callback the callback for cucumber, should be called after the error handling is done.
 * @param _stepDescription the description of the current step in the blueprint description.
 */
BlueprintRunner.prototype.errorHandler = function(error, _domElement,_stepDescription,callback){
    var self = this;

    //self.logger.info('++++++++++++++IN ERROR HANDLER ++++++++++++++++++');
    //console.dir(error);

    /*TODO: This should be somewhat actor-specific*/
    if(MerlotErrors.ERROR_ISSUES_FOUND === error.getMsg()){
        self.logger.error(new MerlotErrors.AbortEvaluationError(self.actor.getName()+" can't continue with the scenario due to an error."
        + " \n See the Error report, or the highlighted section on your web page for more details.").message);
       // self.logger.dir(error)
        callback({});
       /* callback(new MerlotErrors.AbortEvaluationError(self.actor.getName()+" can't continue with the scenario due to an error."
            + " \n See the Error report, or the highlighted section on your web page for more details.").message); */

    } else if(MerlotErrors.LOOP_ERROR === error.getMsg()){
        /*
         * LOOP ERROR FOUND
         * If an element cant be reached using keyboard navigation than we will see
         * the start element twice; hence, we are having a loop
         *
         * NOTE:
         * This is du to the "simple" implementation of the keyboard navigation feature
         * where we use just the "TAB" key to navigate around the web page.
         * Better to uses "proper" web tactic to simulate the behavior of keyboard navigation better
         */
        var obj = {};
        obj.stepDescr = _stepDescription;

        /*
                  var LoopIssue = new AccessibilityIssue({
                      type: "ERROR",
                      typeCode: 1,
                      code: 'Conformance Level:A - Principle: Operable 2.1.1 Keyboard Accessible: Make all functionality available from a keyboard.',
                      wcagConf: 'AnnaA',
                      wcagGuideline: '2.1.1',
                      wcagPrinciple: 'Operable',
                      wcagTechnique: '',
                      msg: self.actor.name+" can't reach the element "+_domElement+" by using keyboard navigation. Tip: Try to set the tabindex attribute, e.g., 'tabindex='0' '"
                  });
                    obj.isssues = [{ type: 'ERROR', msgs:[
                        LoopIssue
                        ]
                    }];
                  console.dir( obj.isssues[0].msgs);
        */

        // Building an accessibility issues for the case if an element can't be reached using keyboard navigation
        obj.isssues = [{ type: 'ERROR', msgs:[{
            msg: self.actor.name+" can't reach the element "+_domElement+" by using keyboard navigation. Tip: Try to set the tabindex attribute, e.g., 'tabindex='0' '",
            typeCode: 1,
            type: "ERROR",
            code: 'Conformance Level:A - Principle: Operable 2.1.1 Keyboard Accessible: Make all functionality available from a keyboard.',
            wcagConf: 'AnnaA',
            wcagGuideline: '"Guideline 2.1 Success Criterion 2.1.1',
            wcagPrinciple: 'Principle 2 - Operable',
            wcagTechnique: ''
        }]
        }];
       // self.logger.dir( obj.isssues[0].msgs);
        self.driver.executeAsyncScript(function checkIfElementExistsOnThePage(_domElement) {
            window.Gamay.isValidElement(_domElement,arguments[arguments.length - 1]);

        }, _domElement.getCSSSelector()).then(function outlineError(validStatus){
            if(!validStatus){ //not valid, maybe it's a typo.
                callback.fail(new MerlotErrors.ElementNotFoundError("Element " + _domElement + " does not exit check for typos").message);
            }else{ //valid
                self.addAccessibilityIssue(obj);
                self.driver.executeAsyncScript(function(_domElement,issues) {
                    window.Gamay.markElement(_domElement,issues,arguments[arguments.length - 1]);
                }, _domElement.getCSSSelector(), obj.isssues[0].msgs).then(function(ok){
                    callback(false);
                    //callback.fail(new MerlotErrors.AbortEvaluationError(self.actor.getName()+" can't continue with the scenario due to an error."
                    //  + " \n See the Error report, or the highlighted section on your web page for more details.").message);
                });
            }
        });

    }else{
        callback.fail(new Error("Merlot reported an error! " + error + " with DOMElement: " + _domElement).message);
    }
};

/**
 * @description
 * Inject all the files and scripts that are need on the client side
 * when running a blueprint test.
 * Currently the following files are used and injected:
 *
 * - jQuery.js
 * - tooltipster.js
 * - gamay.js
 * - HTMLCS.js
 * - tooltipster.css
 *
 *  TODO: Check if any of the files can be merged into one to decrease the amount of requests
 *
 *  Selenium's 'executeAsyncScript' feature is used to inject and sermonize the injection.
 *
 *  @returns {webdriver.promise.Deferred.promise|*}
 */
BlueprintRunner.prototype.injectAcessibilityTestScripts = function () {
    var self = this,
        _deferred =  self.webdriver.promise.defer();

    self.driver.executeAsyncScript(function () {
        if (!window.jQuery) {
            var _jqueryScriptTag = document.createElement("script");
            _jqueryScriptTag.type = "text/javascript";

            document.head.appendChild(_jqueryScriptTag);

            /*
                //Old or alternative implementation for triggering the Selenium callback
                jqueryScriptTag.onload = function () {
                    cb(); // NOTE: 'cb' should by pointing to: arguments[arguments.length - 1]
                };
            */

            /*
             * Set the callback function to inform Merlot that the jQurey Script has been
             * loaded and injected into the target's page
             * NOTE:
             * arguments[arguments.length - 1] is the callback function, which is automatically injected by selenium
             * if 'executeAsyncScript' is used.
             */
            _jqueryScriptTag.onload = arguments[arguments.length - 1];
            _jqueryScriptTag.src = "http://localhost:3000/javascripts/jquery-1.11.1.min.js";
        }
    }).
    then(function injectToolTips() {
        self.driver.executeAsyncScript(function () {
            if (!window.HTMLCS) {
                var _tooltipsterScriptTag = document.createElement("script");
                _tooltipsterScriptTag.type = "text/javascript";

                document.head.appendChild(_tooltipsterScriptTag);

                _tooltipsterScriptTag.onload = arguments[arguments.length - 1];
                _tooltipsterScriptTag.src = "http://localhost:3000/javascripts/jquery.tooltipster.min.js";
            }
        });
    }).
    then(function injectToolTipsCSS() {
        self.driver.executeAsyncScript(function () {
            if (!window.HTMLCS) {
                var _tooltipsterCSSTag = document.createElement("link");
                _tooltipsterCSSTag.type = "text/css";
                _tooltipsterCSSTag.rel = "stylesheet";

                document.head.appendChild(_tooltipsterCSSTag);

                _tooltipsterCSSTag.onload = arguments[arguments.length - 1];
                _tooltipsterCSSTag.href = "http://localhost:3000/stylesheets/tooltipster.css";
            }
        });
    }).
    then(function injectHTMLCS() {
        self.driver.executeAsyncScript(function () {
            if (!window.HTMLCS) {
                var _htmlcsScriptTag = document.createElement("script");
                _htmlcsScriptTag.type = "text/javascript";

                document.head.appendChild(_htmlcsScriptTag);

                _htmlcsScriptTag.onload = arguments[arguments.length - 1];
                _htmlcsScriptTag.src = "http://localhost:3000/javascripts/HTML_CodeSniffer/HTMLCS.js";
            }
        });
    }).

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                                                                             *
     * NOTE:                                                                       *
     * ------                                                                      *
     * Malbec extension. If the actor is JohnDoe, then the                         *
     * the rule set set is taken from 'JohnDoe.vin.json' - aka: the preference set *
     * and included as a JavaScript object into the web page.                      *
     *                                                                             *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    then(function placeRuleSetonTheWebpage() {
        var _injectObjct = {};
        _injectObjct.name =  self.actor.getName();
        _injectObjct.ruleset =  self.actor.getRuleSet();
        return self.driver.executeScript(function (obj) {
            window.window["HTMLCS_"+obj.name] = obj.ruleset;
        }, _injectObjct);
    }).
    then(function injectGamay() {
        self.driver.executeAsyncScript(function () {
            if (!window.Gamay) {
                var _gamayScriptTag = document.createElement("script");
                _gamayScriptTag.type = "text/javascript";

                document.head.appendChild(_gamayScriptTag);

                _gamayScriptTag.onload = arguments[arguments.length - 1];
                _gamayScriptTag.src = "http://localhost:3000/javascripts/gamay.js";
            }
        });
    }).
    then(function onOk() {
        _deferred.resolve();
    }).
    then(null, function onError(err) {
        _deferred.reject(err);
    });

    return _deferred.promise;
};


/**
 * @description
 * Close the driver instance, which closes also the browser process.
 */
BlueprintRunner.prototype.closeDriver = function () {
    this.driver.close();
};

/*
 * +========== - END - ===========+
 * |                              |
 * |        Error Handling        |
 * |              &               |
 * |         Communication        |
 * |                              |
 * +==============================+
 */