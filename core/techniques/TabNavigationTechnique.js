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
        deferred = that.webdriver.promise.defer(),
        webElement,
        action_to_be_performed = that.driver.actions().sendKeys(that.webdriver.Key.TAB);

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


    var helperFunction = function (domElement) {
        return action_to_be_performed.perform()
            .then(function () {
                if(webElement === undefined){
                    webElement = that.driver.switchTo().activeElement();
                }else{
                    that.webdriver.WebElement.equals(webElement,that.driver.switchTo().activeElement()).then(function (eq) {
                        if(eq){
                         //   throw new ElementNotFoundError("Element not Found!");
                          //  var _errorText = 'Element with ' +domElement.getSearchAttributeName()+' = '+domElement.getSearchAttributeValue()+' cloud not be found or reached!';
                            return deferred.reject(new Error(new ElementNotFoundError("ElementNotFoundError")));
                        }

                    });

                }
                return that.driver.switchTo().activeElement();
            })
            .then(function (activeElement) {

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
                            .then(function (text) {
                                return (text === domElement.getSearchAttributeValue()) ? activeElement : helperFunction(domElement);
                            });

                    } else {
                        return helperFunction(domElement);
                    }

                }
            })
    };
    return helperFunction(domElement);

};