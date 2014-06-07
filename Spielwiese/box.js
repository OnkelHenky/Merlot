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
