/**
 * Created by Henka on 18.06.14.
 */


var navigation = function () {

    this.Given(/^She goes on the website "([^"]*)"$/, function (arg1, callback) {
        this.visit(arg1, callback);
    });

    this.When(/^She clicks on the link with href "([^"]*)"$/, function(arg1,callback) {
        //NOTE: Call callback() at the end of the step, or callback.pending() if the step is not yet implemented.
        var that = this,
            helper = {};
        helper.href = arg1;

        this.browser.actorTryToFindThisElement('a',helper,callback).
            then(function (webEle) {
               return that.browser.click(webEle,that.browser.webdriver.Key.ENTER);
            }).
            then(function () {
                callback();
            }).
            then(null, function(err) {
                console.error("An error was thrown! " + err);
            });
        //callback.pending();
    });

    this.When(/^She clicks on the link with text "([^"]*)"$/, function(arg1,callback) {
        var that = this,
            helper = {};
        helper.text = arg1;

        console.log('arg1 = '+arg1);
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

    this.When(/^She clicks on the link with id "([^"]*)"$/, function(arg1,callback) {
        var that = this,
            helper = {};
        helper.id = arg1;

        console.log('arg1 = '+arg1);
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

module.exports = navigation;