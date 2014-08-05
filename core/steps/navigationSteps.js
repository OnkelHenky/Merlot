/**
 * Created by Henka on 18.06.14.
 */


module.exports = navigationSteps = function () {

    this.Given(/^Actor navigates to the website with URL: "([^"]*)"$/, function (url, callback) {
        this.browser.goTo(url, callback);
    });

    this.When(/^The actor clicks on the link with href "([^"]*)"$/, function(hrefAttr,callback) {
        //NOTE: Call callback() at the end of the step, or callback.pending() if the step is not yet implemented.
        var that = this,
             _domElement = this.browser.createDOMElement({
                'tagName' : 'a',
                'searchAttribute' : {
                     "name":  'href',
                     'value': hrefAttr
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
        //callback.pending();
    });

    this.When(/^The actor clicks on the link with text "([^"]*)"$/, function(linkText,callback) {
        var that = this,
            _domElement = this.browser.createDOMElement({
                'tagName' : 'a',
                'searchAttribute' : {
                    "name":  'text',
                    'value': linkText
                }
            });
        this.browser.actorTryToFindThisElement(_domElement).
            then(function (webEle) {
                that.browser.click(webEle,that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function(err) {
                console.error("Merlot reported an error!  " + err + " with DOMElement: "+_domElement);
            });
    });

    this.When(/^The actor clicks on the link with id "([^"]*)"$/, function(linkId,callback) {
        var that = this,
            _domElement = this.browser.createDOMElement({
                'tagName' : 'a',
                'searchAttribute' : {
                    "name":  'id',
                    'value': linkId
                }
            });
        this.browser.actorTryToFindThisElement(_domElement).
            then(function (webEle) {
                 that.browser.click(webEle,that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function(err) {
                console.error("Merlot reported an error!  " + err + " with DOMElement: " + _domElement);
            });
    });

    this.When(/^The actor clicks on the link with "([^"]*)" = "([^"]*)"$/, function(identifiedBy,value,callback) {
        var that = this,
            helper = {};

        console.log(identifiedBy+ ' = '+value);

        switch (identifiedBy){
            case "id":
            case "text":
            case "name":
            case "href":
                helper[identifiedBy] = value;
                break;
            default:
                callback.fail(new Error('"'+identifiedBy+'" is not valid, please use "id", "text" or "href" instead'));
                break;
        }

        this.browser.actorTryToFindThisElement('a',helper,callback).
            then(function (webEle) {
                that.browser.click(webEle,that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function(err) {
                console.error("An error was thrown! " + err);
            });
    });

    this.Then(/^The actor should see "([^"]*)" in the title$/, function(title, callback) {
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