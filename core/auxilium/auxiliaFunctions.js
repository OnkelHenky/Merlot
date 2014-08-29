/**
 * Created by Alexander Henka on 11.07.14.
 * Copyright by Alexander Henka
 */


var exports = module.exports;

/**
 * @description
 * Should be called like: inputText.call(this,text,webElement)
 * To define the scope context of 'this'
 * @param text
 * @param webElement
 * @returns {*}
 */
module.exports.inputText = function(text,webElement) {
    var deferred = this.browser.webdriver.promise.defer();
    console.log('Text to enter = '+text);
    this.browser.enterText(webElement, text, function (webElement) {
        deferred.fulfill(webElement);
    });
    return deferred.promise;
};

/**
 * @description
 * Check if a property is a not undefined and a valid string
 * @param stringToTest
 * @returns {*|boolean}
 */
module.exports.isString = function(stringToTest) {
   return (stringToTest && (typeof stringToTest === 'string' || stringToTest instanceof String));
};