/**
 * Created by Henka on 18.06.14.
 */

var Actor =  require('./actor').Actor,
    Paul;

/**
 * The prototype for an actor
 * @type {ActorBuilder}
 */
Paul = exports.Paul =  function() {

    /*Properties*/
    this.name = 'Paul';

    this.navigationPattern = {
        "navStyle" : "POINT_AND_CLICK"
    };

};

Paul.prototype = new Actor;


/**
 * @override
 * @param tagName
 * @param ele
 * @returns {*}
 */
Paul.prototype.findElement = function (tagName,ele) {
    var that = this,
        _by = that.webdriver.By;

    var getLinkReference = function (_Plinks) {
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
        .then(getLinkReference)
        .then(function (Plink) {
            deferred.fulfill(Plink);
        });
    return deferred.promise;
};

Paul.prototype.click = function (webEle,type) {

  return new this.webdriver.ActionSequence(this.driver)
        .mouseMove(webEle,{x: 0, y: 0})
        .click(this.webdriver.Button.LEFT)
        .perform();
};