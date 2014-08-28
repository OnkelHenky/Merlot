/**
 * Created by Alexander Henka on 12.08.14.
 * Copyright by Alexander Henka
 */


/**
 *
 * @type {tabNavigationTechnique}
 */
module.exports.keyboardInteractionTechnique = function (webElement,domElement) {
    var that = this,
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

    var interactFunctions = {};
        interactFunctions.radioButton =  function (activeElement, domElement) {
            console.dir(domElement.getNameAttribute());
            var _attribute = isAttributePresent(activeElement, domElement.getSearchAttributeName());
            if(_attribute){
                /* Return the active element if the this is the element with
                 * the attribute we are looking for. */
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
                /* Call the function recursively if this
                 * this is not the element */
                _presKeyDown.perform().
                    then(function getTheNextRadioButton() {
                        return findRadioButton(that.driver.switchTo().activeElement(),domElement);
                    });
            }
        };


        interactFunctions.selection = function (activeElement, domElement) {
            console.dir(domElement.getNameAttribute());
            var _attribute = isAttributePresent(activeElement, domElement.getSearchAttributeName());
            if(_attribute){
                /* Return the active element if the this is the element with
                 * the attribute we are looking for. */
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
                /* Call the function recursively if this
                 * this is not the element */
                _presKeyDown.perform().
                    then(function getTheNextRadioButton() {
                        return findRadioButton(that.driver.switchTo().activeElement(),domElement);
                    });
            }
        };

    /* Recursive 'helper' function to retrieve
     * the element defined in 'domElement' */
    var findRadioButton = function (activeElement, domElement) {
        console.dir(domElement.getNameAttribute());
        var _attribute = isAttributePresent(activeElement, domElement.getSearchAttributeName());
            if(_attribute){
                /* Return the active element if the this is the element with
                 * the attribute we are looking for. */
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
                /* Call the function recursively if this
                 * this is not the element */
                _presKeyDown.perform().
                    then(function getTheNextRadioButton() {
                        return findRadioButton(that.driver.switchTo().activeElement(),domElement);
                });
            }
    };

    return findRadioButton(webElement, domElement);



};

/**
 *
 * @param selectionElement
 * @param domElement
 * @returns {promise}
 */
module.exports.keyboardcSelectOption = function (selectionElement,domElement) {
    var that = this,
        _by = that.webdriver.By;
    var _deferred = that.webdriver.promise.defer();

    selectionElement.findElements(_by.tagName("option")).
        then(function (options) {

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

    /*

     options.forEach(function (option) {

     //   option.sendKeys(_keyDown);
     option.click();
     //   option.sendKeys("");
     //   driver.executeScript("arguments[0].focus();",option);
     //   driver.executeScript("arguments[0].focus();",option);

     });

     */
    return _deferred.promise;
};
