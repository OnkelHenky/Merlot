/**
 * Created by Henka on 18.06.14.
 */


module.exports = navigation = function () {

    this.Given(/^She goes on the website "([^"]*)"$/, function (arg1, callback) {
        this.visit(arg1, callback);
    });

    this.When(/^She clicks on the link with href "([^"]*)"$/, function(hrefAttr,callback) {
        //NOTE: Call callback() at the end of the step, or callback.pending() if the step is not yet implemented.
        var that = this,
            helper = {};
        helper.href = hrefAttr;

        this.browser.actorTryToFindThisElement('a',helper,callback).
            then(function (webElement) {
               return that.browser.click(webElement,that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function(err) {
                console.error("An error was thrown! " + err);
            });
        //callback.pending();
    });

    this.When(/^She clicks on the link with text "([^"]*)"$/, function(linkText,callback) {
        var that = this,
            helper = {};
        helper.text = linkText;

        console.log('linkText = '+linkText);
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

    this.When(/^She clicks on the link with id "([^"]*)"$/, function(linkId,callback) {
        var that = this,
            helper = {};
        helper.id = linkId;

        console.log('linkId = '+linkId);
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

    this.Then(/^She should see "(.*)" in the title$/, function(title, callback) {
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