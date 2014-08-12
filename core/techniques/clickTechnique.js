/**
 * Created by Henka on 20.06.14.
 */

/**
 *
 * @param webEle
 * @param key
 * @returns {*}
 */
exports.byPointAndClick = function (webEle,key) {
    return new this.webdriver.ActionSequence(this.driver)
        .mouseMove(webEle,{x: 0, y: 0})
        .click(this.webdriver.Button.LEFT)
        .perform();
};

/**
 *
 * @param webEle
 * @param key
 * @returns {*}
 */
exports.byUsingTheReturnKey = function (webEle,key) {
    return webEle.sendKeys(this.webdriver.Key.ENTER);
};