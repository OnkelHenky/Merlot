/**
 * Created by Henka on 18.06.14.
 */

var _tagNameDictionary = require('../auxilium/tagNameDictionary');

module.exports = navigationSteps = function () {

    this.Given(/^Actor navigates to the website with URL: "([^"]*)"$/, function (url, callback) {
        this.browser.goTo(url, callback);
    });

    this.Then(/^The actor should be on a web page with "([^"]*)" in the title$/, function(title, callback) {
        this.browser.getPageTitle()
            .then(function(pageTitle) {
                console.log('page Tile = '+pageTitle);
                if (title === pageTitle) {
                    callback();
                } else {
                //   callback.fail(new Error("Expected to be on page with title " + title + "but was on: '"+pageTitle+"'"));
                }

            }).
            then(null, function (err) {
                callback.fail(err);
            });
    });

    this.Then(/^The actor switches to a new page in a new browser tab$/, function(callback) {
        var that = this,
            _currentWindowHandle = void 0;

        this.browser.getCurrentWindowHandle().
            then(function(currentWindowHandle) {
                _currentWindowHandle = currentWindowHandle;
            });
        this.browser.getAllWindowHandles().
            then(function findTheNewHandle(allHandlers) {
                var deferred = that.browser.webdriver.promise.defer();
                allHandlers.forEach(function (handle) {
                    if(_currentWindowHandle != handle){
                        deferred.fulfill(handle);

                    }
                });
                return deferred.promise;
            }).
            then(function switchToNewHandle(handle) {
               return that.browser.switchToNewHandle(handle);
            }).
            then(function waitForPageInTheNewTabToBeReady() {
                // var _by = that.browser.webdriver.By;
                //return that.browser.waitForElementToBeReady(_by.tagName('title'),5000)
               return that.browser.waitForPageToBeReady(5000)
            }).
            then(function onOK() {
                callback();
            }).
            then(null, function OnError(err) {
                callback.fail(err);
            })

    });

    this.When(/^The actor interacts with a hyperlink whose ([^"]*) is "([^"]*)"$/, function(identifiedBy,value,callback) {

        var that = this,
            _tagName = "",
            _type = "",
            _resolvedAttributeName = that.browser.resolveAttributeName(identifiedBy);

        if(_tagNameDictionary.hasOwnProperty("hyperlink")){
            _tagName = _tagNameDictionary["hyperlink"].eleName;
            _type = _tagNameDictionary["hyperlink"].type;
        }else{
            callback.fail(new Error("'hyperlink' is not a valid tag name"));
        }
        var _domElement = this.browser.createDOMElement({
            'tagName' : _tagName,
            'type' : _type,
            'searchAttribute' : {
                "name":  _resolvedAttributeName,
                'value': value
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

    this.When(/^The actor interacts with a "([^"]*)" element whose ([^"]*) is "([^"]*)"$/, function(elementName,identifiedBy,value,callback) {

        var that = this,
            _tagName = "",
            _type = "",
            _resolvedAttributeName = that.browser.resolveAttributeName(identifiedBy);

        if(_tagNameDictionary.hasOwnProperty(elementName)){
            _tagName = _tagNameDictionary[elementName].eleName;
            _type = _tagNameDictionary[elementName].type;
        }else{
            callback.fail(new Error('"'+elementName+'" is not a valid tag name'));
        }

         var _domElement = this.browser.createDOMElement({
                'tagName' : _tagName,
                'type' : _type,
                'searchAttribute' : {
                    "name":  _resolvedAttributeName,
                    'value': value
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