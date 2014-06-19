/**
 * Created by Henka on 19.06.14.
 */


module.exports = pacNavigationTechnique = function (tagName,ele) {

    var that = this,
        _by = that.webdriver.By;

    var getElementReference = function (_Plinks) {
        var deferred = that.webdriver.promise.defer();
        _Plinks.forEach(function(link) {
            if (ele.href){
                link.getAttribute('href').then(function(text){
                    if(text === ele.href){
                        //console.log("FOUND +++++++++++++++ "+text);
                        deferred.fulfill(link);
                        return;
                    }
                });
            }else if (ele.id){
                link.getAttribute('id').then(function(id){
                    if(id === ele.id){
                        deferred.fulfill(link);
                        return;
                    }
                });

            }else if (ele.text){
                link.getText().then(function(text){

                    if(text === ele.text){
                        console.log("FOUND +++++++++++++++ "+text);
                        deferred.fulfill(link);
                        return;
                    }
                });

            }
        });
        return deferred.promise;
    };


    var deferred = that.webdriver.promise.defer();
    var links = that.driver.findElements(_by.tagName(tagName))
        .then(getElementReference)
        .then(function (Plink) {
            deferred.fulfill(Plink);
        });
    return deferred.promise;


};