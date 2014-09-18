/**
 * Created by Henka on 18.06.14.
 */
var HTMLCS = require('../../lib/HTML_CodeSniffer/HTMLCS');

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
        var self = this;
        this.browser.getPageTitle()
            .then(function (pageTitle) {
                console.log('page Tile = ' + pageTitle);
                if (title === pageTitle) {
                  //  callback();
                    console.log('passt page Tile = ' + pageTitle);
                } else {
                    callback.fail(new Error("Expected to be on page with title " + title + "but was on: '" + pageTitle + "'"));
                }

            }).
            then(function runAccessibilityEvaluation() {
                self.browser.driver.executeAsyncScript(function() {
                    window.merlot.eval('#headerBild',arguments[arguments.length - 1]);
                }).then(function checkResult(result) {
                    console.log("TEST COMPLETE ... FROM BLUEPRINT RUNNER --- YIHAAA");
                    console.log("Error Count "+result.totals);
                    console.dir(result.totals);
                    console.log("Error Results "+result.results);
                    console.dir(result.results);
                    callback();
                });

            }).

            /*
            then(function () {

                if(HTMLCS){console.log('YAHAA' + HTMLCS);}

                function output (msg) {
                    // Simple output for now.
                    var typeName = 'UNKNOWN';
                    switch (msg.type) {
                        case HTMLCS.ERROR:
                            typeName = 'ERROR';
                            break;

                        case HTMLCS.WARNING:
                            typeName = 'WARNING';
                            break;

                        case HTMLCS.NOTICE:
                            typeName = 'NOTICE';
                            break;
                    }//end switch

                    console.log(typeName + '|' + msg.code + '|' + msg.msg);
                };


               var html =  "<img id='headerBild' src='./img/merlot2.jpg'>";
                var html =  "" +
                    "<html xml:lang='en'>"
                    + '<head>'
                    + "<title>Merlot Testbed</title>"
                    + '<meta name="viewport" content="width=device-width, initial-scale=1">'
                    +'</head>'
                    + '<body>'
                    +    '<header id="pageheader">'
               + '<h1>Merlot Testbed</h1>'
               + '<img id="headerBild" src="./img/merlot2.jpg" alt="Image of Merlot Grapes, this is the Logo of the Merlot testbed">'
               + ' </header>'

                    +'</body></html>'

                var standard = "WCAG2A";

                HTMLCS.process(standard, html, function () {
                    var messages = HTMLCS.getMessages();
                    var length = messages.length;
                    for (var i = 0; i < length; i++) {
                        output(messages[i]);
                    }

                    console.log('done');
                });


            }).*/
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
                console.log('GHET NOCH');
                return that.browser.click(webElement);
            }).
            then(function onOK() {
                console.log('onOK');
                callback();
            }).
            then(null, function onError(err) {
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
                return that.browser.click(webElement);
            }).
            then(function onOK() {
                callback();
            }).
            then(null, function onError(err) {
                callback.fail(new Error("Merlot reported an error! " + err + " with DOMElement: " + _domElement).message);
            });
    });

};