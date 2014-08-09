/**
 * Created by Henka on 19.06.14.
 *
 * Contains all function to navigate to an given domElement using
 * the 'TAB' navigation technique
 */

var ElementNotFoundError = require('../auxilium/MerlotErrors').ElementNotFoundError;

/**
 * @description
 * 'TAB' navigation technique to find the element, defined as 'domElement'.
 * @type {navigation}
 */
module.exports = tabNavigationTechnique = function (domElement) {
    var that = this,
        _deferred = that.webdriver.promise.defer(),
        _firstWebElement,
        _presTAB = that.driver.actions().sendKeys(that.webdriver.Key.TAB);

    /**
     * Helper function to check if a attribute is present
     * @param webElement
     * @param attribute
     * @returns {boolean}
     */
    var isAttributePresent = function(webElement , attribute) {
        var _result = false;
        try {
            _result = webElement.getAttribute(attribute);
            if (_result != null){
                _result = true;
            }
        } catch (exception) {
            console.error('Error from "isAttributePresent": '+exception);
        }
        return _result;
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
            if (_result != null){
                _result = true;
            }
        } catch (exception) {
            console.error('Error from "hasTextNode": '+exception);
        }
        return _result;
    };


 /* Recursive 'helper' function to retrieve the element defined in 'domElement' */
    var helperFunction = function (domElement) {
     return _presTAB.perform()
            .then(function switchToActiveElement() {
                if(undefined === _firstWebElement){
                     /*Save the first element*/
                    _firstWebElement = that.driver.switchTo().activeElement();
                }else{
                    /* Check if have the first element again.
                     * If the answer is true, we run into a loop and therefore cant reach the
                     * element by using tab navigation.
                     */
                    that.webdriver.WebElement.equals(_firstWebElement,that.driver.switchTo().activeElement()).then(function (eq) {
                        if(eq){
                            //Reject the promise of we have a loop
                            return _deferred.reject(new Error(new ElementNotFoundError()));
                        }
                    });
                }
                 /*If we don't have a loop, return the active element*/
                return that.driver.switchTo().activeElement();
            })
            .then(function checkTheActiveElement(activeElement) {

                if (domElement.getSearchAttributeValue() === 'text'){
                    if (hasTextNode(activeElement)) {
                        return activeElement.getText()
                            .then(function (text) {
                                return (text === domElement.getSearchAttributeValue()) ? activeElement : helperFunction(domElement);
                            });
                    } else {
                        return helperFunction(domElement);
                    }

                }else{
                    if (isAttributePresent(activeElement, domElement.getSearchAttributeName())) {
                        return activeElement.getAttribute(domElement.getSearchAttributeName())
                            .then(function (attributeValue) {
                                return (attributeValue === domElement.getSearchAttributeValue()) ? activeElement : helperFunction(domElement);
                            });

                    } else {
                        return helperFunction(domElement);
                    }

                }
            })
     };
    return helperFunction(domElement);
};