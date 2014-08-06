/**
 * Created by Alexander Henka on 01.08.14.
 * Copyright by Alexander Henka
 */


var auxilia = require('../auxilium/auxiliaFunctions');

module.exports = forms_and_input_Steps = function () {

    this.When(/^The actor enters "([^"]*)" into textfield with id "([^"]*)"$/, function(text, elementID ,callback) {
        var that = this,
            _domElement = this.browser.createDOMElement({
                'tagName' : 'input',
                'searchAttribute' : {
                    "name":  'id',
                    'value': elementID
                }
            });

        this.browser.actorTryToFindThisElement(_domElement).
            then(function (webElement) {
                return auxilia.inputText.call(that,text,webElement);
            }).
            then(function (prm) {
                callback();
            }).
            then(null, function(err) {
                callback.fail(new Error("Merlot reported an error! " + err +" with DOMElement: "+_domElement).message);
            });
        //input[contains(@id,'suchbegriff') and type='text']

    });

    this.When(/^The actor clicks on the img with id "([^"]*)"$/, function(elementID ,callback) {
        var that = this,
            _domElement = this.browser.createDOMElement({
                'tagName' : 'img',
                'searchAttribute' : {
                    "name":  'id',
                    'value': elementID
                }
            });

        this.browser.actorTryToFindThisElement(_domElement).
            then(function (webElement) {
                var deferred = that.browser.webdriver.promise.defer();
                that.browser.applyCriteria(webElement, function (webElement) {
                    deferred.fulfill(webElement);
                });
                return deferred.promise;
            }).
            then(function (webElement) {
                return that.browser.click(webElement,that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function(err) {
                callback.fail(new Error("Merlot reported an error! " + err +" with DOMElement: "+_domElement).message);
            });

    });
};