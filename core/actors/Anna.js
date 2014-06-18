/**
 * Created by Henka on 18.06.14.
 */
var Actor =  require('./actor').Actor,
    Anna;

/**
 * The prototype for an actor
 * @type {ActorBuilder}
 */
Anna = exports.Anna =  function() {


    /*Properties*/
    this.name = 'Anna';

    this.navigationPattern = {
         "navStyle" : "TAB"
    };

};

Anna.prototype = new Actor;



/**
 * @override
 * @param tagName
 * @param ele
 * @returns {*}
 */
Anna.prototype.findElement = function (tagName,ele) {
    var that = this,
        _by = that.webdriver.By;

    var deferred = that.webdriver.promise.defer(),
        webElement;

    var  action_to_be_performed = that.driver.actions().sendKeys(that.webdriver.Key.TAB);

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


    var helperFunction = function (ele) {
        return action_to_be_performed.perform()
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
};


Anna.prototype.click = function (webEle,type) {
   return webEle.sendKeys(this.webdriver.Key.ENTER);
};

