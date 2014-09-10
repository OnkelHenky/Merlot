/**
 * Created by Henka on 18.06.14.
 */

var _tagNameDictionary = require('../auxilium/tagNameDictionary');


/**
 * @description
 * Contains steps for navigating on a web page
 * And to perform interaction with basic html element.
 * @type {navigationSteps}
 */
module.exports = navigationSteps = function () {

    /**
     * Step to navigate to the provided URL
     * TODO: maybe implement check if 'url' is a valid url-pattern string.
     */
    this.Given(/^Actor navigates to the website with URL: "([^"]*)"$/, function (url, callback) {
        this.browser.goTo(url, callback);
    });

    /**
     * Step to check if the actor is on a web page with the
     * provided text 'title' in the <title> element of the page.
     * Currently this steps throws an error if the the current page title
     * didn't match the provided 'title' property.
     */
    this.Then(/^The actor should be on a web page with "([^"]*)" in the title$/, function (title, callback) {
        this.browser.getPageTitle()
            .then(function (pageTitle) {
                console.log('page Tile = ' + pageTitle);
                if (title === pageTitle) {
                    callback();
                } else {
                    callback.fail(new Error("Expected to be on page with title " + title + "but was on: '" + pageTitle + "'"));
                }

            }).
            then(null, function (err) {
                callback.fail(err);
            });
    });

    /**
     * Step to switch to an new browser tab.
     * This Step waits for the new page to be loaded before being complete.
     * Any following step should relay on the fact, that the web page in the
     * new tab is fully loaded and ready.
     */
    this.Then(/^The actor switches to a new page in a new browser tab$/, function (callback) {
        var that = this,
            _currentWindowHandle = void 0;

        this.browser.getCurrentWindowHandle().
            then(function (currentWindowHandle) {
                _currentWindowHandle = currentWindowHandle;
            });
        this.browser.getAllWindowHandles().
            then(function findTheNewHandle(allHandlers) {
//TODO: Refactoring is necessary, so only the next handle in the array list with != current handle will be taken.
                var deferred = that.browser.webdriver.promise.defer();
                allHandlers.forEach(function (handle) {
                    if (_currentWindowHandle != handle) {
                        deferred.fulfill(handle);

                    }
                });
                return deferred.promise;
            }).
            then(function switchToNewHandle(handle) {
                return that.browser.switchToNewHandle(handle);
            }).
            then(function onOK() {
                callback();
            }).
            then(null, function OnError(err) {
                callback.fail(err);
            })

    });

    /**
     * Step to interact with an hyperlink.
     * This is just a more readable version of 'The actor interacts with a "([^"]*)" element whose ([^"]*) is "([^"]*)"'.
     * In which the user can right the more common name, 'hyperlink', for the <a> element.
     * 'identifiedBy' is the property of the hyperlink that need to be found.
     *                Allowed values are: @name, @href, @value, @label, @css, @style and >text
     * 'value' is the value of the identifiedBy property
     *                Allowed values are: Any string or numeric combination, that is allowed in the respective identifiedBy property
     * 'callback' is the cucumber callback.
     */
    this.When(/^The actor interacts with a hyperlink whose ([^"]*) is "([^"]*)"$/, function (identifiedBy, identifierValue, callback) {
        var that = this,
            _domElement = this.browser.createDOMElement({
                'tagName': 'hyperlink',
                'identifiedBy': identifiedBy,
                'identifierValue': identifierValue
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
                return that.browser.click(webElement, that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function (err) {
                callback.fail(new Error("Merlot reported an error! " + err + " with DOMElement: " + _domElement).message);
            });
    });

    /**
     * Step to interact with a button.
     * This is just a more readable version of 'The actor interacts with a "([^"]*)" element whose ([^"]*) is "([^"]*)"'.
     * In which the user can right the more common name, 'hyperlink', for the <a> element.
     * 'identifiedBy' is the property of the hyperlink that need to be found.
     *                Allowed values are: @name, @href, @value, @label, @css, @style and >text
     * 'value' is the value of the identifiedBy property
     *                Allowed values are: Any string or numeric combination, that is allowed in the respective identifiedBy property
     * 'callback' is the cucumber callback.
     */
    this.When(/^The actor interacts with a button whose ([^"]*) is "([^"]*)"$/, function (identifiedBy, identifierValue, callback) {

        var that = this,
            _domElement = this.browser.createDOMElement({
                'tagName': 'button',
                'identifiedBy': identifiedBy,
                'identifierValue': identifierValue
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
                return that.browser.click(webElement, that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function (err) {
                callback.fail(new Error("Merlot reported an error! " + err + " with DOMElement: " + _domElement).message);
            });
    });
    /**
     * Step to interact with an html element.
     * The step first performs an look up for the element and a interaction if the look up was successfully.
     * 'elementName' is a valid html5 tag name
     * 'identifiedBy' is the property of the hyperlink that need to be found.
     *                Allowed values are: @name, @href, @value, @label, @css, @style and >text
     * 'value' is the value of the identifiedBy property
     *                Allowed values are: Any string or numeric combination, that is allowed in the respective identifiedBy property
     * 'callback' is the cucumber callback.
     */
    this.When(/^The actor interacts with a "([^"]*)" element whose ([^"]*) is "([^"]*)"$/, function (elementName, identifiedBy, identifierValue, callback) {
        var that = this,
            _domElement = this.browser.createDOMElement({
                'tagName': elementName,
                'identifiedBy': identifiedBy,
                'identifierValue': identifierValue
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
                return that.browser.click(webElement, that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function (err) {
                callback.fail(new Error("Merlot reported an error! " + err + " with DOMElement: " + _domElement).message);
            });
    });

};