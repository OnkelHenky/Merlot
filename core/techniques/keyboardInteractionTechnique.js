/**
 *  gamay is part of Merlot
 *  Copyright (c) by Alexander Henka, 12.08.14.
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
 * |    KEYBOARD INTERACTION    |
 * |    ====================    |
 * +----------------------------+
 *
 *  Used for the Actors: Anna
 *
 */

/*
 * +----------------------------+
 * |           Requires         |
 * +----------------------------+
 */
var ElementNotFoundError = require('../auxilium/MerlotErrors').ElementNotFoundError;

/**
 * @description
 * @param webElement
 * @param domElement
 * @returns {promise}
 */
module.exports.keyboardRadioButtonInteraction = function (webElement, domElement) {
    var that = this,
        _firstWebElement = void 0,
        _lastActiveElement = void 0,
        _deferred = that.webdriver.promise.defer(),
        _presKeyDown = that.driver.actions().sendKeys(that.webdriver.Key.ARROW_DOWN);

    /**
     * @description
     * Helper function to check if a attribute is present
     * @param webElement
     * @param attribute
     * @returns {boolean}
     */
    function isAttributePresent(webElement, attribute) {
        var _result;
        try {

            _result = webElement.getAttribute(attribute);
            if (_result !== null) {
                return _result;
            }

        } catch (exception) {
            console.error('Error from "isAttributePresent": ' + exception);
        }
        return false;
    };

    /**
     * @description
     * Helper function to check if a web element hast a text node
     * @param webElement
     * @returns {boolean}
     */
    function hasTextNode(webElement) {
        var _result = false;
        try {
            _result = webElement.getText();
            if (_result !== null) {
                _result = true;
            }
        } catch (exception) {
            console.error('Error from "hasTextNode": ' + exception);
        }
        return _result;
    };

    /*
     * +-----------------------------------------+
     * | Recursive 'helper' function to retrieve |
     * | the element defined in 'domElementes'   |
     * +-----------------------------------------+
     */
    var findRadioButton = function (activeElement, domElement) {
        activeElement.
            then(function checkIfWeCantreachTheRadioButton() {
                var _noLoopPromise = that.webdriver.promise.defer();
                if (undefined === _firstWebElement) {
                    _firstWebElement = _lastActiveElement = activeElement;
                    _noLoopPromise.fulfill(_firstWebElement);
                } else {
                    /* Reject the promise if we have a loop (triggered in Firefox)*/
                    that.webdriver.WebElement.equals(_firstWebElement, activeElement).
                        then(function (eq) {
                            if (eq) {
                                _noLoopPromise.reject(new ElementNotFoundError(domElement));
                            }
                        }).
                        then(function () {
                            if (undefined !== _lastActiveElement) {
                                /* Reject the promise if we are still on the same element (triggered in Chrome & Safari)*/
                                that.webdriver.WebElement.equals(_lastActiveElement, activeElement).then(function (eq) {
                                    if (eq) {
                                        _noLoopPromise.reject(new ElementNotFoundError(domElement));
                                    }
                                });
                            }
                            _lastActiveElement = activeElement;
                            _noLoopPromise.fulfill(_lastActiveElement);
                        })
                }
                return _noLoopPromise.promise;
            }).
            then(function checkTheFoundRadioButton() {
                var _attribute = isAttributePresent(activeElement, domElement.getSearchAttributeName());
                if (_attribute) {
                    /* Return the active element if the this is the element with
                     * the attribute we are looking for. */
                    return _attribute.
                        then(function checkIfThisIsTheElementWereLookingFor(attributeValue) {
                            if (attributeValue === domElement.getSearchAttributeValue()) {
                                _deferred.fulfill(activeElement);
                            } else {
                                _presKeyDown.perform().
                                    then(function getTheNextRadioButton() {
                                        return findRadioButton(that.driver.switchTo().activeElement(), domElement);
                                    });
                            }
                        });
                } else {
                    /* Call the function recursively if this
                     * this is not the element */
                    _presKeyDown.perform().
                        then(function getTheNextRadioButton() {
                            return findRadioButton(that.driver.switchTo().activeElement(), domElement);
                        });
                }
            }).
            then(null, function onError(er) {
                /* Rejecting the blueprint step if any error occurs during the interaction with a radio button element, */
                // _deferred.reject();
                throw new ElementNotFoundError();

                /* NOTE: Usually any error gets propagated through the promise chain
                 * but to keep the overview over the code, i  prefer to catch errors thrown in the functions
                 * in the function itself and than decide what to do, even it is just rejecting or canceling the
                 * whole thing, which would have been happened in the first place, when i did not catch the error*/
            });
    };

    findRadioButton(that.driver.switchTo().activeElement(), domElement);
    return _deferred.promise;
};

/*
 * TODO: Using 'fake' interaction at the moment
 * Since is not possible to use 'key up' or 'key down' to 'navigate'
 * in an drop down menu in Safari or in Chrome (in Firefox it works)
 * I decided to implement this as a click-simulation
 * Using 'findElements' to get all options of an selection and
 * iterate over it one of the options is that one we're looking for, click on it
 */
/**
 * @description
 * Function to interact with a selection (drop down menue).
 * This means choosing a option.
 * @param selectionElement
 * @param domElement
 * @returns {promise}
 */
module.exports.keyboardcSelectOption = function (selectionElement, domElement) {
    var that = this,
        _by = that.webdriver.By,
        _deferred = that.webdriver.promise.defer();

    selectionElement.findElements(_by.tagName("option")).
        then(function (options) {
            /*TODO exchange the 'some' function.*/
            options.some(function lookForTheRightElement(option, index, options) {
                option.getText()
                    .then(function (optionText) {
                        if (optionText === domElement.getSearchAttributeValue()) {
                            option.click();
                            _deferred.fulfill(option);
                        }
                    });
            });
        });

    return _deferred.promise;
};
