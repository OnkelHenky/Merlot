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

    /*
     * Returns the first element if more than one element can be retrieved.
     */
     this.driver.findElement(_by.css(_cssExpr))
        .then(function (element) {
            _deferred.fulfill(element);
     })
     /*
     * Catching any error or exception thrown during the
     * process of fetching(finding) an HTML Element.
     * The promise will be rejected.
     */
     .then(null, function(err) {
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

    /*
     * Get the WebElement reference.
     * This function is used recursively to handle the asynchronous calls of
     * the Selenium WebDriver api.
     * @param elements
     * @returns {*}, a promise.
     * @private
     */
    var _getElementReference = function (elements) {
        var _deferred = that.webdriver.promise.defer();

        function getReference(elements){
            var element = elements.shift();
             if(element === undefined){
                 throw new ElementNotFoundError();
             }

            /*
             * Text nodes of HTML element needs special treatment.
             */
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
               /*
                * Test for everything else
                */
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
        /*
         * Get a element on the basis of its unique id.
         */
       if('id' === domElement.getSearchAttributeName()) {
           return that.driver.findElement(_by.id(domElement.getSearchAttributeValue()))
               .then(null, function (error) {
                   throw new ElementNotFoundError();
               });
       } else if('name' === domElement.getSearchAttributeName()) {
           /*
            * NOTE (05.08.2014) A.Henka:
            * This returns the first element found with @name = 'SearchAttributeValue'.
            * It is possible, that more than one HTML element exists with the name.
            * Therefor use 'findElements' instead of 'findElement'
            * - which is also handled by the 'else' block.
            */
           return that.driver.findElement(_by.name(domElement.getSearchAttributeValue()))
               .then(null, function (error) {
                   throw new ElementNotFoundError();
               });
           /*
            * Special case for hyperlinks "<a>" by the its link text.
            * NOTE:
            * Only those link elements with the exact same text value are retrieved.
            */
       } else if(('a' === domElement.getSearchAttributeName()) && ('text' === domElementment.getSearchAttributeName())){
           return that.driver.findElement(_by.linkText(domElement.getSearchAttributeValue()))
               .then(null, function (error) {
                   throw new ElementNotFoundError();
               });
       }else{
           /*
            * NOTE (05.08.2014) A.Henka:
            * This function uses 'findElements' instead of 'findElement' to retrieve a
            * Array of elements, corresponding with the 'SearchAttribute' of the DOMElement.
            * In the PAC (Point and Click) navigation technique this is not coercively -
            * since the process will be slower.
            * But is still necessary for fetching elements based on the text chidl node of the
            * HTML element or attributes as @value or @href.
            */
            return that.driver.findElements(_by.tagName(domElement.getTagName()))
               .then(_getElementReference);
        }
    };

    var deferred = that.webdriver.promise.defer();

    resolveElementReference(domElement)
        .then(function(eleRef) {
            deferred.fulfill(eleRef);
        })
       /*
        * Catching any error or exception thrown during the
        * process of fetching(finding) an HTML Element.
        * The promise will be rejected.
        */
        .then(null, function (err) {
             deferred.reject(err);
        });

    return deferred.promise;
};