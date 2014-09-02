/**
 * Created by Alexander Henka on 12.08.14.
 * Copyright by Alexander Henka
 */

var ElementNotFoundError = require('../auxilium/MerlotErrors').ElementNotFoundError;
/**
 *
 * @type {tabNavigationTechnique}
 */
module.exports.keyboardInteractionTechnique = function (webElement,domElement) {
    var that = this,
        _firstWebElement = void 0,
        _lastActiveElement = void 0,
        _deferred = that.webdriver.promise.defer(),
        _presSpace = that.driver.actions().sendKeys(that.webdriver.Key.SPACE),
        _presKeyDown = that.driver.actions().sendKeys(that.webdriver.Key.ARROW_DOWN),
        _presKeyUP = that.driver.actions().sendKeys(that.webdriver.Key.ARROW_UP);

    /**
     * Helper function to check if a attribute is present
     * @param webElement
     * @param attribute
     * @returns {boolean}
     */
    var isAttributePresent = function(webElement , attribute) {
        var _result;
        try {

            _result = webElement.getAttribute(attribute);
            if (_result !== null){
                return _result;
            }

        } catch (exception) {
            console.error('Error from "isAttributePresent": '+exception);
        }
        return false;
    };

    /**
     * Helper function to check if a web element hast a text node
     * @param webElement
     * @returns {boolean}
     */
    var hasTextNode = function(webElement) {
        var _result = false;
        try {
            _result = webElement.getText();
            if (_result !== null){
                _result = true;
            }
        } catch (exception) {
            console.error('Error from "hasTextNode": '+exception);
        }
        return _result;
    };

/*
 var findRadioButton = function (activeElement, domElement) {
 console.dir(domElement.getNameAttribute());
 var _attribute = isAttributePresent(activeElement, domElement.getSearchAttributeName());
 if(_attribute){
    return _attribute.
        then(function checkIfThisIsTheElementWereLookingFor(attributeValue){
            if(attributeValue === domElement.getSearchAttributeValue()){
                return activeElement
            }else{
                _presKeyDown.perform().
                    then(function getTheNextRadioButton() {
                        return findRadioButton(that.driver.switchTo().activeElement(),domElement);
                    });
            }
        });
}else{
    _presKeyDown.perform().
        then(function getTheNextRadioButton() {
            return findRadioButton(that.driver.switchTo().activeElement(),domElement);
        });
}
};


*/

    /* Recursive 'helper' function to retrieve
     * the element defined in 'domElement' */
     var findRadioButton = function (activeElement, domElement) {
        activeElement.
            then(function () {
                if (undefined === _firstWebElement) {
                    _firstWebElement = activeElement;
                } else {
                    that.webdriver.WebElement.equals(_firstWebElement, activeElement)
                        .then(function (eq) {
                            if (eq) {
                                /* Reject the promise if we have a loop (triggered in Firefox)*/
                                return _deferred.reject(new ElementNotFoundError(domElement));
                            }
                        }).then(function () {
                            if (undefined !== _lastActiveElement) {
                                /* Reject the promise if we are still on the same element (triggered in Chrome & Safari)*/
                                that.webdriver.WebElement.equals(_lastActiveElement, activeElement).then(function (eq) {
                                    if (eq) {
                                        return _deferred.reject(new ElementNotFoundError(domElement));
                                    }
                                });
                            }
                            return  _lastActiveElement = activeElement;
                        })
                }
                return activeElement;
        }).
        then(function () {
         var _attribute = isAttributePresent(activeElement, domElement.getSearchAttributeName());
            if(_attribute){
                /* Return the active element if the this is the element with
                 * the attribute we are looking for. */
                return _attribute.
                    then(function checkIfThisIsTheElementWereLookingFor(attributeValue){
                        if(attributeValue === domElement.getSearchAttributeValue()){
                          //  return activeElement
                            _deferred.fulfill(activeElement);
                        }else{
                            _presKeyDown.perform().
                                then(function getTheNextRadioButton() {
                                    return findRadioButton(that.driver.switchTo().activeElement(),domElement);
                                });
                        }
                    });
            }else{
                /* Call the function recursively if this
                 * this is not the element */
                _presKeyDown.perform().
                    then(function getTheNextRadioButton() {
                        return findRadioButton(that.driver.switchTo().activeElement(),domElement);
                });
            }
          });
    };

  // return findRadioButton(webElement, domElement);
    findRadioButton(webElement, domElement);
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
module.exports.keyboardcSelectOption = function (selectionElement,domElement) {
    var that = this,
        _by = that.webdriver.By,
        _deferred = that.webdriver.promise.defer();

    selectionElement.findElements(_by.tagName("option")).
        then(function (options) {
//TODO exchange the 'some' function.
             options.some(function lookForTheRightElement(option, index, options) {
                option.getText()
                    .then(function(optionText){
                        if( optionText === domElement.getSearchAttributeValue()){
                            option.click();
                            _deferred.fulfill(option);
                        }
                    });
             });
    });

    return _deferred.promise;
};
