/**
 * Created by Henka on 18.06.14.
 */

var tagNameDictionary = require('../auxilium/tagNameDictionary');

module.exports = navigationSteps = function () {

    this.Given(/^Actor navigates to the website with URL: "([^"]*)"$/, function (url, callback) {
        this.browser.goTo(url, callback);
    });

    this.When(/^The actor interacts with a "([^"]*)" element whose @([^"]*) is "([^"]*)"$/, function(elementName,identifiedBy,value,callback) {
        var that = this,
            _tagName = "",
            _type = "",
            _identifiedBy = "";

        if(tagNameDictionary.hasOwnProperty(elementName)){
            _tagName = tagNameDictionary[elementName].eleName;
            _type = tagNameDictionary[elementName].type;
            console.log('tag name = '+_tagName);
        }else{
            callback.fail(new Error('"'+elementName+'" is not a valid tag name'));
        }


        switch (identifiedBy){
            case "id":
            case "text":
            case "name":
            case "href":
                _identifiedBy = identifiedBy;
                break;
            default:
                callback.fail(new Error('"'+identifiedBy+'" is not valid identifier - use "id", "text", "name" or "href" instead'));
                break;
        }

         var _domElement = this.browser.createDOMElement({
                'tagName' : _tagName,
                'type' : _type,
                'searchAttribute' : {
                    "name":  _identifiedBy,
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

    this.Then(/^The actor should be on a web page with "([^"]*)" in the title$/, function(title, callback) {
        this.browser.getPageTitle()
            .then(function(pageTitle) {
                console.log('pageTitle = '+ pageTitle);
                console.log('title = '+ title);
                if (title === pageTitle) {
                    callback();
                } else {
                    callback.fail(new Error("Expected to be on page with title " + title));
                }

            });
    });
};