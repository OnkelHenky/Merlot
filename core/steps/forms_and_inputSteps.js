/**
 * Created by Alexander Henka on 01.08.14.
 * Copyright by Alexander Henka
 */


var auxilia = require('../auxilium/auxiliaFunctions'),
    tagNameDictionary = require('../auxilium/tagNameDictionary');

module.exports = forms_and_input_Steps = function () {

    this.When(/^The actor enters "([^"]*)" into textfield whose ([^"]*) is "([^"]*)"$/, function(text, elementID ,callback) {
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

    this.When(/^The actor enters the username into textfield whose ([^"]*) is "([^"]*)"$/, function(identifiedBy, value ,callback) {
        var that = this,
            _logger = this.browser.logger,
            _username, // that.browser.actor.getUsername() || "NOPE, no userName", //callback.fail(new ReferenceError("No username defined for this actor, use 'Given Username is 'username'' in the cucumber scenario definition, to set a username ").message),
            _tagName,
            _type,
            _resolvedAttributeName = that.browser.resolveAttributeName(identifiedBy);

        if(that.browser.actor.getUsername() !== undefined){

            _username  = that.browser.actor.getUsername();
           // _logger.log('Username = ' + _username);


        if(tagNameDictionary.hasOwnProperty("textField")){
            _tagName = tagNameDictionary["textField"].eleName;
            _type = tagNameDictionary["textField"].type;
          //  _logger.info('tag name = '+_tagName);
        }else{
            callback.fail(new Error('"'+elementName+'" is not a valid tag name'));
        }

            _domElement = this.browser.createDOMElement({
                'tagName' : _tagName,
                'type': _type,
                'searchAttribute' : {
                    "name":  _resolvedAttributeName,
                    'value': value
                }
            });

        this.browser.actorTryToFindThisElement(_domElement).
            then(function (webElement) {
                return auxilia.inputText.call(that,_username,webElement);
            }).
            then(function onOk(prm) {
                callback();
            }).
            then(null, function onError(err) {
                callback.fail(new Error("Merlot reported an error! " + err +" with DOMElement: "+_domElement).message);
            });


        }else{
            callback.fail(new Error("No username defined for this actor, use 'Given Username is 'username'' in the cucumber scenario definition, to set a username ").message);
        }

    });

    this.When(/^The actor enters the password into textfield whose ([^"]*) is "([^"]*)"$/, function(identifiedBy, value ,callback) {
        var that = this,
            _password, // that.browser.actor.getPassword() || "NOPE, no PW",//callback.fail(new ReferenceError("No password defined for this actor, use 'Given Password is 'password'' in the cucumber scenario definition, to set a password ").message),
            _tagName,
            _type,
            _resolvedAttributeName = that.browser.resolveAttributeName(identifiedBy);

        if(that.browser.actor.getPassword() !== undefined){
            _password  = that.browser.actor.getPassword();

        if(tagNameDictionary.hasOwnProperty("textField")){
            _tagName = tagNameDictionary["textField"].eleName;
            _type = tagNameDictionary["textField"].type;
        }else{
            callback.fail(new Error('"'+elementName+'" is not a valid tag name'));
        }

        _domElement = this.browser.createDOMElement({
            'tagName' : _tagName,
            'type': _type,
            'searchAttribute' : {
                "name":  _resolvedAttributeName,
                'value': value
            }
        });

        this.browser.actorTryToFindThisElement(_domElement).
            then(function (webElement) {
                return auxilia.inputText.call(that,_password,webElement);
            }).
            then(function onOk(prm) {
                callback();
            }).
            then(null, function onError(err) {
                callback.fail(new Error("Merlot reported an error! " + err +" with DOMElement: "+_domElement).message);
            });

        }else{
            callback.fail(new Error("No password defined for this actor, use 'Given Password is 'password'' in the cucumber scenario definition, to set a password ").message);
        }

    });

    this.When(/^The actor selects a option from the radiogroup "([^"]*)"  whose ([^"]*) is "([^"]*)"$/, function(radiogroupName,identifiedBy,value,callback) {
        var that = this,
            _tagName = "",
            _type = "",
            _radiogroupName = radiogroupName,
            _resolvedIdentifiedBy =  that.browser.resolveAttributeName(identifiedBy);

        if(tagNameDictionary.hasOwnProperty("radiobutton")){
            _tagName = tagNameDictionary["radiobutton"].eleName;
            _type = tagNameDictionary["radiobutton"].type;
        }else{
            callback.fail(new Error('"'+elementName+'" is not a valid tag name'));
        }


        var _RADIOdomElement = this.browser.createDOMElement({
            'tagName' : _tagName,
            'name' : _radiogroupName,
            'type' : _type,
            'searchAttribute' : {
                "name":  _resolvedIdentifiedBy,
                'value': value
            }
        });
        /*Find the radio group first*/
        this.browser.actorTryToFindThisElement(_RADIOdomElement).
            then(function findTheRadioButtonInTheRadioGroup(webElement){
                /*Here we have the first element in the radio group*/
                 return that.browser.interactWithElement(webElement,_RADIOdomElement);
            }).
            then(function (webElement) {
                /*Here we have the first element in the radio group*/
                var deferred = that.browser.webdriver.promise.defer();
                that.browser.applyCriteria(webElement, function (webElement) {
                    deferred.fulfill(webElement);
                });
                return deferred.promise;

            }).
            then(function (webElement) {
                /*Here we have the first element in the radio group*/
                return "";//that.browser.click(webElement,that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function(err) {
                callback.fail(new Error("Merlot reported an error! " + err +" with DOMElement: "+_RADIOdomElement).message);
            });
    });

    this.When(/^The actor chooses "([^"]*)" from the selection whose ([^"]*) is "([^"]*)"$/, function(value,identifiedBy,identifierValue,callback) {
        var that = this,
            _tagName = "",
            _type = "",
            _resolvedIdentifiedBy = that.browser.resolveAttributeName(identifiedBy);

        if(tagNameDictionary.hasOwnProperty("select")){
            _tagName = tagNameDictionary["select"].eleName;
            _type = tagNameDictionary["select"].type;
            console.log('tag name = '+_tagName);
        }else{
            callback.fail(new Error('"'+elementName+'" is not a valid tag name'));
        }

        var _SELECTdomElement = this.browser.createDOMElement({
            'tagName' : _tagName,
            'type' : _type,
            'searchAttribute' : {
                "name":  _resolvedIdentifiedBy,
                'value': identifierValue
            }
        });

        var _SELECTOptionElement = this.browser.createDOMElement({
            'tagName' : "option",
            'type' : _type,
            'searchAttribute' : {
                "name":  "textNode",
                'value': value
            }
        });


        this.browser.actorTryToFindThisElement(_SELECTdomElement).
           then(function applyCriteria(foundSelectionElement) {
                var deferred = that.browser.webdriver.promise.defer();
                that.browser.applyCriteria(foundSelectionElement, function (foundSelectionElement,err) {
                    if(err){
                      deferred.reject(err);
                    }
                    deferred.fulfill(foundSelectionElement);
                });
                return deferred.promise;
            }).
            then(function interactWithSelectionAndChooseOption(selectionElement) {
                return that.browser.interactWithSelection(selectionElement,_SELECTOptionElement);
            }).
            then(function onOk() {
                callback();
            }).
            then(null, function onError(err) {
                callback.fail(new Error("Merlot reported an error! " + err +" with DOMElement: "+_SELECTdomElement).message);
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
            then(function onOk() {
                callback();
            }).
            then(null, function onError(err) {
                callback.fail(new Error("Merlot reported an error! " + err +" with DOMElement: "+_domElement).message);
            });

    });
};