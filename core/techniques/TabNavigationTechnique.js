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
        /* executes a single Tab */
        _presTAB = that.driver.actions().sendKeys(that.webdriver.Key.TAB);

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

    /* Recursive 'helper' function to retrieve
     * the element defined in 'domElement' */
    var helperFunction = function (domElement) {
     return _presTAB.perform().
            then(function switchToActiveElement() {
                if(undefined === _firstWebElement){
                     /*Save the first element*/
                    _firstWebElement = that.driver.switchTo().activeElement();
                }else{
                    /* Check if have the first element again.
                     * If the answer is true, we run into a loop and therefore cant reach the
                     * element by using tab navigation.*/
                    that.webdriver.WebElement.equals(_firstWebElement,that.driver.switchTo().activeElement()).then(function (eq) {
                        if(eq){
                            /* Reject the promise of we have a loop */
                            return _deferred.reject(new Error(new ElementNotFoundError()));
                        }
                    });
                }
                 /*If we don't have a loop, return the active element*/
                return that.driver.switchTo().activeElement();
            }).
            /* Check the active element after switching to it
             * The active element 'activeElement' is provided as a promise
             * from "switchToActiveElement()".
             */
            then(function checkTheActiveElement(activeElement) {
             return activeElement.getTagName().
                 /* Check if we have an element with the tag name,
                  * that we are looking for.
                  */
                then(function checkTheTagNameFirst(activeElementTagName) {
                    if(activeElementTagName === domElement.getTagName()){
                        /* Return the active element if the active element
                         * has the same tag name as 'domElement.getTagName()' */
                        return activeElement;
                    }else{
                        /*Call the function recursively if '
                         * !activeElementTagName === domElement.getTagName()' */
                        return helperFunction(domElement);
                    }
                }).
                /* Check the attributes of the tag names match */
                then(function checkTheAttributes (activeElement) {
                     // TODO: Later refactoring here! Maybe a more generic name to reflect all select elements
                     if(domElement.isRadioButton()){
                         var _nameAttribute = isAttributePresent(activeElement, 'name');
                         if(_nameAttribute){
                             /* Return the active element if the this is the element with
                              * the attribute we are looking for. */
                             return _nameAttribute.
                                 then(function checkIfThisIsTheElementWereLookingFor(attributeValue){
                                     return (domElement.isRadioButtonInGroup(attributeValue)) ? activeElement : helperFunction(domElement)
                                 });
                         }else{
                             /* Call the function recursively if this
                              * this is not the element */
                              return helperFunction(domElement);
                         }
                     /*
                      * If the attribute that we are looking for is not
                      * an attribute but the text node of the element
                      * use the following code, this is necessary because
                      * the function to get the text node differs from the
                      * function to get ab elements attribute
                      */
                    } else if (domElement.getSearchAttributeName() === 'textNode'){
                        if (hasTextNode(activeElement)) {
                            return activeElement.getText().
                                 then(function checkIfThisIsTheElementWereLookingFor(text) {
                                    /* Return the active element if the this is the element with
                                     * the text node we are looking for. */
                                    return (text === domElement.getSearchAttributeValue()) ? activeElement : helperFunction(domElement);
                                });
                        } else {
                            /* Call the function recursively if this
                             * this is not the element */
                            return helperFunction(domElement);
                        }
                    }else{
                        /* If it is an attribute, check if the current active element
                         * has this attribute.
                         * NOTE: the function isAttributePresent returns the attribute
                         * of the active element has the attribute and false if not. */
                        var _attribute = isAttributePresent(activeElement, domElement.getSearchAttributeName());
                        if(_attribute){
                            /* Return the active element if the this is the element with
                             * the attribute we are looking for. */
                             return _attribute.
                                    then(function checkIfThisIsTheElementWereLookingFor(attributeValue){
                                         return (attributeValue === domElement.getSearchAttributeValue()) ? activeElement : helperFunction(domElement)
                                     });
                        }else{
                            /* Call the function recursively if this
                             * this is not the element */
                             return helperFunction(domElement);
                        }
                    }
                })
            });
     };

    console.log('FIND ELEMENT helperFunction ***++**++****+ = '+domElement);

    return helperFunction(domElement);
};