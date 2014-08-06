/**
 * Created by Alexander Henka on 11.07.14.
 * Copyright by Alexander Henka
 */


var exports = module.exports;

/**
 * Should be called like: inputText.call(this,text,webElement)
 * To define the scope context of 'this'
 * @param text
 * @param webElement
 * @returns {*}
 */
module.exports.inputText = function(text,webElement) {
    var deferred = this.browser.webdriver.promise.defer();
    this.browser.enterText(webElement, text, function (webElement) {
        deferred.fulfill(webElement);
    });
    return deferred.promise;
};