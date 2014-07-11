/**
 * Created by Henka on 18.06.14.
 */

var auxilia = require('../auxilium/auxiliaFunctions');

module.exports = interaction = function () {

    this.Given(/^Username is "([^"]*)"$/, function (username, callback) {
        callback.pending();
    });

    this.Given(/^Password is "([^"]*)"$/, function (password, callback) {
        callback.pending();
    });

    this.When(/^Enter "([^"]*)" into textfield with id "([^"]*)"$/, function(text, elementID ,callback) {
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
                console.error("Merlot reported an error! " + err);
            });
        //input[contains(@id,'suchbegriff') and type='text']

    });


    this.When(/^Enter that text "([^"]*)"$/, function(text,callback) {
        var deferred = that.browser.webdriver.promise.defer();
        that.browser.enterText(webElement, text, function (webElement) {

        }).
        then(function () {
            callback();
        }).
        then(null, function(err) {
                console.error("Merlot reported an error! " + err);
        });


    });

};

