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
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    mu = require('mu2');

/*
 * +----------------------------+
 * |   Require Merlot stuff     |
 * +----------------------------+
 */
var BlueprintRunner,
    ActorProvider = require('./actors/actorProvider').ActorProvider,
    DOMElement = require('./auxilium/DOMElement'),
    TagNameDictionary = require('./auxilium/tagNameDictionary'),
    MerlotErros = require('./auxilium/MerlotErrors'),
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
    this.logger              = new Logger({'logLevel': 0});
    this.driver              = {};
    this.webdriver           = webdriver;
    this.actor               = new ActorProvider.Actors["Paul"]; //Default actor
    this.acessibilityRuleset = this.actor.getName()+'A';

    this.isssuesMsgs         = []; // Array with all found accessibility issues
    this.reportDirectory             = ""; // Path where the accessibility issue report shall be stored.

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

/**
 * @description
 * Set the WCAG conformance level for this blueprint evaluation
 * @param conformanceLevel
 */
BlueprintRunner.prototype.setConformanceLevel = function(conformanceLevel){
   if(["A","AA","AAA"].indexOf(conformanceLevel) !== -1){
       this.acessibilityRuleset = this.actor.getName() + conformanceLevel;
       this.logger.info("Checking for "+ this.actor.getName() + "'s "+conformanceLevel+" level conformance");
   }else{
       this.acessibilityRuleset = this.actor.getName() + 'A';
       this.logger.info(conformanceLevel+" is not a valid WCAG conformance level, please use 'A', 'AA' or 'AAA'");
       this.logger.info("Using default WCAG conformance level: 'A'");
   }
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
 *
 * @param issue
 */
BlueprintRunner.prototype.addAccessibilityIssue = function(issue){
    console.dir(issue);
    console.dir(issue.isssues[0].msgs);
    this.isssuesMsgs.push(issue);
};


/**
 * @description
 * Get the path to the directory where the reports should be stored
 * @returns {string}
 */
BlueprintRunner.prototype.getReportDirectory = function(){
    return this.reportDirectory;
};

/**
 *
 * @returns {object}
 */
BlueprintRunner.prototype.getAccessibilityIssuesBuffer = function(ScenarioName, issues, cb){
    var self    = this,
        _buffer ='';

    /*
     _issuesType.type   = erros.type;
     _issuesType.issue  = error;
     */
    mu.root = __dirname + '/reports';
    var data =  issues.map(function(x){
                                return {
                                    stepDescr: x.stepDescr,
                                    issues: x.isssues.map(function(i){
                                        return {type: i.type,
                                                msg: i.msgs.map(function(msg){
                                                    console.dir(msg);
                                                    return {
                                                            m: msg.msg
                                                    }
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
        on('error', function (error) {console.log(error);});
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
    _logger.log("Writing report for =" + scenario.getName());
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
 * Print a evaluation report
 * @param scenario
 * @param callback
 */
BlueprintRunner.prototype.printEvaluationReport = function(scenario,callback){
    var self       = this,
        _logger    = this.logger,
        _fs        = self.utile._fs_,
        _reportDIR = self.getReportDirectory(),
        _issues    = self.getArrayWithAccessibilityIssues();

    _logger.info('Print evaluation report');

    _fs.exists(_reportDIR, function (exists) {
        if (!exists) {
            _fs.mkdir(_reportDIR, function (err) {
                if (err) {
                    _logger.error('Error during creation of the reports directory' +err);
                    callback(err);
                }else{
                    self.getAccessibilityIssuesBuffer(scenario.getName(), _issues, function(buffer){
                        self.printIssuesBuffer(buffer,scenario,callback);
                    });
                }
            });
        } else {
            self.getAccessibilityIssuesBuffer(scenario.getName(), _issues, function(buffer){
                 self.printIssuesBuffer(buffer,scenario,callback);
            });
        }
    });
};

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
    var _resolvedIdentifiedBy = void 0;  //undefined

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

    if(config.reportsDir){
        this.reportDirectory = config.reportsDir;
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
                  timeouts.implicitlyWait(30000); //wait 3 seconds for every element to retrieve
            //  timeouts.pageLoadTimeout(10000); //set timer to wait for pages to be loaded
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
 * Handling any errors
 * @param error
 * @param _domElement
 * @param callback
 */
BlueprintRunner.prototype.errorHandler = function(error, _domElement,_stepDescr,callback){
    var self = this;
    console.log("the error is a "+error);
      //  errorType = error.getType();
    // [ { type: 'NOTICE', msgs: [Object] } ] }
      if("ElementNotFound" === error){
          var obj = {};
          obj.stepDescr = _stepDescr;
          obj.isssues = [{ type: 'ERROR', msgs:[{
              msg: self.actor.name+" can't reach the element"+_domElement+" by using keyboard navigation. Tip: Try to set the tabindex attribute, e.g., 'tabindex='1' '",
              typeCode: 1,
              code: 'Conformance Level:A - Principle: Operable 2.1.1 Keyboard Accessible: Make all functionality available from a keyboard.',
              wcagConf: 'AnnaA',
              wcagGuideline: '2.1.1',
              wcagPrinciple: 'Operable',
              wcagTechnique: ''
              }]
          }];


          self.driver.executeAsyncScript(function(_domElement) {
              window.Gamay.isValidElement(_domElement,arguments[arguments.length - 1]);
          }, _domElement.getCSSSelector()).then(function(validStatus){
              self.logger.info("Valid Element STATUS = "+validStatus);
              if(!validStatus){ //not valid
                  callback.fail(new MerlotErros.ElementNotFoundError("Element " + _domElement + " does not exit check for typos").message);
              }else{ //valid
                  self.addAccessibilityIssue(obj); //
                  self.driver.executeAsyncScript(function(_domElement,issues) {
                      window.Gamay.markElement(_domElement,issues,arguments[arguments.length - 1]);
                  }, _domElement.getCSSSelector(), obj.isssues[0].msgs).then(function(ok){
                      callback.fail(new MerlotErros.ElementNotFoundError("Cant find element with " + error + " with DOMElement: " + _domElement).message);
                  });
              }
          });


          /*
              className: 'drinks',
              code: 'AnnaA.Principle3.Guideline3_2.3_2_1.G107',
              element: { driver_: [Object], id_: [Object] },
          id: 'cars',
              msg: 'Check that a change of context does not occur when this input field receives focus.',
              nodeName: 'select',
              toString: {},
          type: 'NOTICE',
              typeCode: 3,
              wcagConf: 'AnnaA',
              wcagGuideline: 'Principle3',
              wcagPrinciple: 'Guideline3_2.3_2_1',
              wcagTechnique: 'G107' }
              */

    //[{type: "ERROR", msg:["All Elements must be accasable by keyboard interaction"]}];
         // self.addAccessibilityIssue(obj);

      }else{
          callback.fail(new Error("Merlot reported an error! " + err + " with DOMElement: " + _domElement).message);
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
BlueprintRunner.prototype.evalAccessibility = function (webElement, domElement) {
    var self = this,
        _accessibilityRuleset = self.actor.getAcessibilityRuleset(),
        _deferred = self.webdriver.promise.defer(),
        _issues = [];

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
            self.driver.executeAsyncScript(function(ruleset,html,domElement) {
                window.Gamay.accessibilityEvaluationHTMLCS(ruleset,html,domElement,arguments[arguments.length - 1]);
            }, _accessibilityRuleset, ''+outerHtml,domElement.getCSSSelector())
                .then(function checkResult(errors) {

                    var _notice    = [],
                        _warning   = [],
                        _error     = [],
                        _def       = [];

                    errors.forEach(function(error){
                       switch(error.type){
                           case 'NOTICE':
                               _notice.push(error);
                               break;
                           case 'WARNING':
                               _warning.push(error);
                               break;
                           case 'ERROR':
                               _error.push(error);
                               break;
                           default:
                               _def.push(error);
                               break;
                       }
                    });

                    if(_notice.length > 0){
                        _issues.push({
                            type: 'NOTICE',
                            msgs: _notice
                        });
                    }
                    if(_warning.length > 0){
                        _issues.push({
                            type: 'WARNING',
                            msgs: _warning
                        });
                    }
                    if(_error.length > 0){
                        _issues.push({
                            type: 'ERROR',
                            msgs: _error
                        });
                    }
                    if(_def.length > 0){
                        _issues.push({
                            type: 'UNKOWN ISSUE',
                            msgs: _def
                        });
                    }

                });
        }).
        then(function onOK() {
            _deferred.fulfill(_issues);
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
    }).
         then(function injectToolTips() {
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
                     _htmlcsScriptTag.src = "http://localhost:3000/javascripts/jquery.tooltipster.min.js";
                     document.head.appendChild(_htmlcsScriptTag);
                 }
             });

         }).
         then(function injectToolTipsCSS() {
             return  self.driver.executeScript(function () {
                 if (!window.HTMLCS) {
                     var _htmlcsScriptTag = document.createElement("link");
                     _htmlcsScriptTag.type = "text/css";
                     _htmlcsScriptTag.rel = "stylesheet";

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
                     _htmlcsScriptTag.href = "http://localhost:3000/stylesheets/tooltipster.css";
                     document.head.appendChild(_htmlcsScriptTag);
                 }
             });

         }).

         then(function injectHTMLCS() {
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

        /* then(function injectQUAIL() {
             return  self.driver.executeScript(function () {
                 if (!window.quail) {
                     var _quailScriptTag = document.createElement("script");
                     _quailScriptTag.type = "text/javascript";

                     if (_quailScriptTag.readyState) {  //IE
                         _quailScriptTag.onreadystatechange = function () {
                             if (_quailScriptTag.readyState == "loaded" ||
                                 _quailScriptTag.readyState == "complete") {
                                 _quailScriptTag.onreadystatechange = null;
                                 //  cb("jquery loaded");
                             }
                         };
                     } else {  //Others
                         _quailScriptTag.onload = function () {
                             //   cb("jquery loaded");
                         };
                     }
                     _quailScriptTag.src = "http://localhost:3000/javascripts/quail/quail.jquery.min.js";
                     document.head.appendChild(_quailScriptTag);
                 }
             });

         }). */
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