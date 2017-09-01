/**
 *  evaluator.js is part of Merlot
 *  Copyright (c) by Alexander Henka, 26.08.17.
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
 * +-------------------------------------------------------------+
 * |                            EVALUATOR                        |
 * |                         ================                    |
 * |    Object that encapsulate all the evaluation functionality |
 * +-------------------------------------------------------------+
 */

/*
 * +----------------------------+
 * |   Require selenium stuff   |
 * +----------------------------+
 */
var Evaluator,
    Merlot = require('./Merlot').Merlot,
    MerlotErrors = require('./auxilium/MerlotErrors');

module.exports.Evaluator = Evaluator = function () {

    /*
     * +----------------------------+
     * |        Information         |
     * +----------------------------+
     */
    this._type_ = "Evaluator Object"; //Name of the object

};


/**
 * @description
 * Get all the stuff from Merlot prototype
 * @type {Merlot}
 */
//Evaluator.prototype = new Merlot();

/**
 * @description
 * Perform an accessibility evaluation on the provided element
 * @param {object} webElement the element to tes
 * @returns {webdriver.promise.Deferred.promise|*} a promise that will be resolved when the evaluation is completed
 */
Evaluator.prototype.evalAccessibility = function (webElement, domElement,_stepDescr) {
    var self = this,
        _actorName = self.actor.getName(),//self.actor.getAcessibilityRuleset(),
        _deferred = self.webdriver.promise.defer(),
        _issues = [];

    webElement.getOuterHtml().
    then(function(outerHtml){
        return outerHtml;
    }).
    /*
    then(function injectPinot(outerHtml) {
         return self.injectAcessibilityTestScripts().
                then(function(){
                    return outerHtml;
                });
    }). */
    then(function(outerHtml){
        self.driver.executeAsyncScript(function(ruleset,html,domElement) {
            window.Gamay.accessibilityEvaluationHTMLCS(ruleset,html,domElement,arguments[arguments.length - 1]);
        }, _actorName, ''+outerHtml,domElement.getCSSSelector())
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
                    var obj = {};
                    obj.stepDescr = _stepDescr;
                    obj.isssues = _issues;
                    self.addAccessibilityIssue(obj);
                    _deferred.reject();
                    //throw new MerlotErrors.AbortEvaluationError("ErrorFound");
                }
                if(_def.length > 0){
                    _issues.push({
                        type: 'UNKNOWN ISSUE',
                        msgs: _def
                    });
                }

            });
    }).
    then(function onOK() {
        _deferred.resolve(_issues);
    });

    return _deferred.promise;

};

/**
 * @description
 * Perform an accessibility evaluation on the provided element
 * @param {object} webElement the element to tes
 * @returns {webdriver.promise.Deferred.promise|*} a promise that will be resolved when the evaluation is completed
 */
Evaluator.prototype.evalAccessibilityWithSemantic = function (webElement, domElement,_stepDescr,semantics) {
    var self = this,
        _actorInfo = self.actor.getActorInformation_AsJSON(),//self.actor.getAcessibilityRuleset(),
        _deferred = self.webdriver.promise.defer(),
        _semantics = semantics;
    _issues = [];

    /*  webElement.getOuterHtml().
          then(function(outerHtml){
              return outerHtml;
          }). */

    webElement.getAttribute('outerHTML').
    then(function(outerHtml){
        return outerHtml;
    }).
    /*
     then(function injectPinot(outerHtml) {
     return self.injectAcessibilityTestScripts().
     then(function(){
     return outerHtml;
     });
     }). */
    then(function(outerHtml){
        self.driver.executeAsyncScript(function(_actorInfo,html,domElement,_semantics) {
            window.Gamay.accessibilityEvaluationHTMLCS_WITHSEMANTICS(_actorInfo,html,domElement,_semantics,arguments[arguments.length - 1]);
        }, _actorInfo, ''+outerHtml,domElement.getCSSSelector(),_semantics)
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
                    var obj = {};
                    obj.stepDescr = _stepDescr;
                    obj.isssues = _issues;
                    self.addAccessibilityIssue(obj);
                   // _deferred.reject();
                    throw new MerlotErrors.AbortEvaluationError("ErrorFound");
                }
                if(_def.length > 0){
                    _issues.push({
                        type: 'UNKNOWN ISSUE',
                        msgs: _def
                    });
                }

            });
    }).
    then(function onOK() {
        _deferred.resolve(_issues);
    });

    return _deferred.promise;

};