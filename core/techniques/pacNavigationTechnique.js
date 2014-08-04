/**
 * Created by Alexander Henka on 19.06.14.
 *
 * Contains all function to navigate to an given domElement using
 * the 'Point and Click' navigation technique
 *
 */

var ElementNotFoundError = require('../auxilium/MerlotErrors').ElementNotFoundError;
/**
 * @description
 * 'Point and Click' navigation technique to find the element, defined as 'domElement'.
 * This function uses a CSS selector to navigate to the domElement given, defined in the 'domElement.getCSSSelector()'.
 * This function should be faster than 'pacNavigationTechnique'.
 *
 * NOTE: Returns the first domElement if more than one element can be retrieved (01.07.2014)
 *
 * @param domElement
 * @returns {*}
 */
module.exports.pacCSSSelectorNavigationTechnique = function (domElement) {

    var _by = this.webdriver.By,
        _deferred = this.webdriver.promise.defer(),
        _cssExpr = domElement.getCSSSelector();

        this.driver.findElement(_by.css(_cssExpr)) //Returns the first one if more than one element can be retrieved
        .then(function (element) {
            _deferred.fulfill(element);
        }).
        then(null, function(err) {
           // console.error("Merlot reported an error! " + err + "trying to fetch element with via CSS Selector: "+_cssExpr);
            console.dir(err);
            _deferred.reject(err + "trying to fetch element with via CSS Selector: "+_cssExpr);
        });

    return _deferred.promise;
};

/**
 * @description
 * 'Point and Click' navigation technique to find the element, defined as 'domElement'.
 * This function retrieves all element with the same tag name (defined in the 'domElement.getTagName()').
 * From the all the elements returned, the corresponding element is searched be the attributes:
 * 'id', 'href' or 'text'
 * @param domElement , the element that should be found by 'Point and Click'
 * @returns {*}, promise
 */
module.exports.pacNavigationTechnique = function (domElement) {
    var that = this,
        _by = that.webdriver.By;
    var _deferred = that.webdriver.promise.defer();

    var _getElementReference = function (elements) {
        function getReference(elements){
            var element = elements.shift();
             if(element === undefined){
                 throw new ElementNotFoundError("ElementNotFoundError");
             }

             if ('text' === domElement.getSearchAttributeName()){
                element.getText() //NOTE. Async.
                    .then(function(text){
                        if(text === domElement.getSearchAttributeValue()){
                            return _deferred.fulfill(element);
                        }else{
                           return getReference(elements);

                        }

                    });

            }else{
                element.getAttribute(domElement.getSearchAttributeName())//NOTE. Async.
                    .then(function(text){
                        if(text === domElement.getSearchAttributeValue()){
                           return  _deferred.fulfill(element);
                        }else{
                            return getReference(elements);

                        }
                    });
            }
        }
        getReference(elements);
        return _deferred.promise;
    };

    var resolveElementReference = function (domElementment) {
        if('id' === domElement.getSearchAttributeName()){
          return that.driver.findElement(_by.id(domElement.getSearchAttributeValue()));
        }else{
         console.dir(domElementment.getSearchAttribute());
         return that.driver.findElements(_by.tagName(domElement.getTagName()))
                .then(_getElementReference);
        }
    };

    var deferred = that.webdriver.promise.defer();

    if(domElement.hasValidTagName()){
        resolveElementReference(domElement)
        .then(function(eleRef) {
            deferred.fulfill(eleRef);
        })
        .then(null, function (err) {
            deferred.reject(err.name);
        });

    }else{
        deferred.reject('"'+domElement.getTagName()+'" is not a valid HTML tag name');
    }

    return deferred.promise;
};

/**
 * @deprecated
 * @description
 * 'Point and Click' navigation technique to find the element, defined as 'domElement'.
 * This function retrieves all element with the same tag name (defined in the 'domElement.getTagName()').
 * From the all the elements returned, the corresponding element is searched be the attributes:
 * 'id', 'href' or 'text'
 * @param domElement , the element that should be found by 'Point and Click'
 * @returns {*}
 */
module.exports.pacNavigationTechniqueDEP = function (domElement) {
    var that = this,
        _by = that.webdriver.By;

    var _getElementReference = function (elements) {
        console.dir(elements);
        var _deferred = that.webdriver.promise.defer();
        if(typeof array != "undefined" && array != null && array.length > 0){

            elements.forEach(function(element) {
                if (domElement.getSearchAttributeName() === 'text'){
                    element.getText()
                        .then(function(text){
                            if(text === domElement.getSearchAttributeValue()){
                                _deferred.fulfill(element);
                            }
                        });
                }else{
                    element.getAttribute(domElement.getSearchAttributeName())
                        .then(function(text){
                            if(text === domElement.getSearchAttributeValue()){
                                _deferred.fulfill(element);
                            }
                        });
                }
            });

        }
        return _deferred.promise;
    };

    var deferred = that.webdriver.promise.defer();

    that.driver.findElements(_by.tagName(domElement.getTagName()))
        .then(_getElementReference)
        .then(function(eleRef) {
            deferred.fulfill(eleRef);
        })
        .then(null, function (err) {
            return deferred.reject(err);
        });
    return deferred.promise;

};