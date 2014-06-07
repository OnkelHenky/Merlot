/**
 * Created by Henka on 26.05.14.
 */

var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

    /*
     driver.get('http://www.google.com');
     driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
     driver.findElement(webdriver.By.name('btnG')).click();
     driver.wait(function() {
     return driver.getTitle().then(function(title) {
     return title === 'webdriver - Google Search';
     });
     }, 1000);
     */


var searchInGoogleFor = function () {

    var deferred = webdriver.promise.defer();
    driver.get('http://www.google.com');
    driver.findElement(webdriver.By.name('q')).sendKeys('Spiegel');
    driver.findElement(webdriver.By.name('btnG')).click()
    driver.getTitle().
    then(function(title) {
                console.log('Title = '+ title);
                if(title === 'Google'){
                    deferred.fulfill(title);
                }else{
                    deferred.reject(new Error("Kaa Boom"))
                }
            });
    return deferred.promise;
};

searchInGoogleFor().
    then(function(res){
        console.log('Res = '+res);
        }).
    then(null, function(err) {
        console.error("An error was thrown! " + err);
    });


//driver.quit();


