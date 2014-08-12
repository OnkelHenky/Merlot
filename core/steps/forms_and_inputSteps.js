/**
 * Created by Alexander Henka on 01.08.14.
 * Copyright by Alexander Henka
 */


var auxilia = require('../auxilium/auxiliaFunctions'),
    tagNameDictionary = require('../auxilium/tagNameDictionary');

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

    });

    this.When(/^The actor selects a option from the radiogroup "([^"]*)"  whose ([^"]*) is "([^"]*)"$/, function(radiogroupName,identifiedBy,value,callback) {
        var that = this,
            _tagName = "",
            _type = "",
            _radiogroupName = radiogroupName,
            _identifiedBy = "";

        if(tagNameDictionary.hasOwnProperty("radiobutton")){
            _tagName = tagNameDictionary["radiobutton"].eleName;
            _type = tagNameDictionary["radiobutton"].type;
            console.log('tag name = '+_tagName);
        }else{
            callback.fail(new Error('"'+elementName+'" is not a valid tag name'));
        }

        switch (identifiedBy){
            case "@id":
            case "@name":
            case "@href":
            case "@value":
            case "@label":
                _identifiedBy = identifiedBy.split("@")[1]; /* Cutting of the '@' */
                break;
            case "textNode":
                _identifiedBy = identifiedBy;
                break;
            default:
                callback.fail(new Error('"'+identifiedBy+'" is not valid identifier - use "id", "text", "name" or "href" instead'));
                break;
        }

        var _domElement = this.browser.createDOMElement({
            'tagName' : _tagName,
            'name' : _radiogroupName,
            'type' : _type,
            'searchAttribute' : {
                "name":  _identifiedBy,
                'value': value
            }
        });

        this.browser.actorTryToFindThisElement(_domElement).
            then(function findTheRadioButtonInTheRadioGroup(webElement){
                /*Here we have the first element in the radio group*/
                 return that.browser.findRadioButton(webElement,_domElement);
            }).
            /*   then(function (webElement) {
                Here we have the first element in the radio group
                var deferred = that.browser.webdriver.promise.defer();
                that.browser.applyCriteria(webElement, function (webElement) {
                    deferred.fulfill(webElement);
                });
                return deferred.promise;

            }). */
            then(function (webElement) {
                /*Here we have the first element in the radio group*/
                console.log('webElement = '+webElement);
                return "";//that.browser.click(webElement,that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function(err) {
                callback.fail(new Error("Merlot reported an error! " + err +" with DOMElement: "+_domElement).message);
            });
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