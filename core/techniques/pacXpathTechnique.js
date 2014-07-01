/**
 * Created by Alexander Henka on 24.06.14.
 * Copyright by Alexander Henka
 */

/**
 * Find a WebElement by using an XPah expression
 * @type {pacXpathNavigationTechnique}
 */
module.exports = pacXpathNavigationTechnique = function (xpathExpr) {

    var _by = this.webdriver.By,
        _deferred = this.webdriver.promise.defer();

    this.driver.findElement(_by.xpath(xpathExpr))
            .then(function (element) {
                _deferred.fulfill(element);
            });

    return _deferred.promise;
};
