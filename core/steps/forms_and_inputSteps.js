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
                console.error("Merlot reported an error! " + err);
            });
        //input[contains(@id,'suchbegriff') and type='text']

    });


};

