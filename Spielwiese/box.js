/**
 * Created by Henka on 07.06.14.
 */

/*
 var getLinkReference = function (_Plinks) {
 var deferred = webdriver.promise.defer();
 var x = 1;
 _Plinks.forEach(function(link) {
 console.log(x);
 x++;
 link.getAttribute('href').then(function(text){
 if(text === 'http://www.mi.hdm-stuttgart.de/mmb/kontakt'){
 //console.log("FOUND +++++++++++++++ "+text);
 deferred.fulfill(link);
 return;
 }
 });
 });
 return deferred.promise;
 };

 var findContactLink = function () {
 var deferred = webdriver.promise.defer();
 var links = driver.findElements(by.tagName('a'))
 .then(getLinkReference)
 .then(function (Plink) {
 deferred.fulfill(Plink);
 });
 return deferred.promise;
 };

 var clickTheLink = function (Plink) {
 Plink.click();
 };

 */


/*
 * The test case

 that.driver.get('http://www.mi.hdm-stuttgart.de/mmb');
 searchForElement('a',{href:'http://www.mi.hdm-stuttgart.de/mmb/kontakt'}).
 then(function (webEle) {
 //console.log('webEle = ' + webEle);
 webEle.sendKeys(that.webdriver.Key.ENTER);

 }).
 then(null, function(err) {
 console.error("An error was thrown! " + err);

 });

 that.driver.getTitle().then(function(title) {
 console.log('title = '+ title);
 assert.equal("Kontakt - Mobile Medien", title);
 });

 //that.driver.quit();
 */


/* +++++ +++++ +++++ +++++ +++++ +++++ Test Code Here +++++ +++++ +++++ +++++ +++++ +++++ +++++ +++++  */
BlueprintRunner.prototype.run = function () {
    var that = this;
    var actor = that.actor;
    var by = that.webdriver.By;



    /**
     * The action builder is meant to be the foundation of the future mechanism
     * to build (adhoc) different navigation patterns, used during (or in) a test run.
     * @param TYPE_OF_ACTION, the type of action, like TAB navigation.
     * @returns {driver.actions} action chain.
     */
    var actionBuilder = function (TYPE_OF_ACTION) {
        var action_to_be_performed;
        switch (TYPE_OF_ACTION){
            case('3TAB'):
                action_to_be_performed = that.driver.actions()
                    .sendKeys(that.webdriver.Key.TAB)
                    .sendKeys(that.webdriver.Key.TAB)
                    .sendKeys(that.webdriver.Key.TAB);
                break;
            case('TAB'):
                action_to_be_performed = that.driver.actions()
                    .sendKeys(that.webdriver.Key.TAB);
                break;
            default :
                break;
        }
        return action_to_be_performed;
    };

    /**
     * Helper function to check if a attribute is present
     * @param webElement
     * @param attribute
     * @returns {boolean}
     */
    var isAttributePresent = function(webElement , attribute) {
        var result = false;
        try {
            result = webElement.getAttribute('href');
            if (result != null){
                result = true;
            }
        } catch (exception) {
            console.error('Error from "isAttributePresent": '+exception);
        }
        return result;
    };

    var tabSearch = function(tagName,ele){

        var deferred = that.webdriver.promise.defer(),
            webElement;


        var helperFunction = function (ele) {
            return actionBuilder(actor.navigationPattern.navStyle).perform()
                .then(function () {
                    if(webElement === undefined){
                        webElement = that.driver.switchTo().activeElement();
                    }else{
                        that.webdriver.WebElement.equals(webElement,that.driver.switchTo().activeElement()).then(function (eq) {
                            if(eq){
                                return deferred.reject(new Error('Element with href= '+ele+' not found!'));
                            }

                        });

                    }

                    return that.driver.switchTo().activeElement();
                })
                .then(function (activeElement) {
                    if (isAttributePresent(activeElement, ele.href)) {
                        var isMatch =  activeElement.getAttribute('href')
                            .then(function (text){
                                // return (text === ele) ? deferred.fulfill(activeElement) : helperFunction(ele);
                                return (text === ele.href) ? activeElement : helperFunction(ele);
                            });

                        return isMatch;

                    }else{
                        return helperFunction(ele);
                    }
                })
        };
        return helperFunction(ele);
        //     helperFunction(ele);
        //return deferred.promise;

    };

    var pointAndClick = function(tagName,ele){

        var getLinkReference = function (_Plinks) {
            var deferred = that.webdriver.promise.defer();
            _Plinks.forEach(function(link) {
                link.getAttribute('href').then(function(text){
                    if(text === ele.href){
                        //console.log("FOUND +++++++++++++++ "+text);
                        deferred.fulfill(link);
                        return;
                    }
                });
            });
            return deferred.promise;
        };


        var deferred = that.webdriver.promise.defer();
        var links = that.driver.findElements(by.tagName('a'))
            .then(getLinkReference)
            .then(function (Plink) {
                deferred.fulfill(Plink);
            });
        return deferred.promise;




    };

    var searchForElement = function (tagName,ele) {

        console.log('Actor is '+actor.name);
        console.log(actor.name +' uses the navigation pattern: '+actor.navigationPattern.navStyle);

        switch(actor.navigationPattern.navStyle){
            case ('TAB'):
                return tabSearch(tagName,ele);
                break;
            case ('POINT_AND_CLICK'):
                return pointAndClick(tagName,ele);
                break;
            default :
                break;
        }


    };


    that.driver.get('http://www.mi.hdm-stuttgart.de/mmb');
    searchForElement('a',{href:'http://www.mi.hdm-stuttgart.de/mmb/kontakt'}).
        then(function (webEle) {
            webEle.sendKeys(that.webdriver.Key.ENTER);

        }).
        then(null, function(err) {
            console.error("An error was thrown! " + err);
        });

    that.driver.getTitle().then(function(title) {
        console.log('title = '+ title);
        assert.equal("Kontakt - Mobile Medien", title);
    });

    that.driver.quit();
    // that.blueprint();

};