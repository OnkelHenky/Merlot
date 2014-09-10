/**
 * Created by Henka on 20.06.14.
 */

/**
 * @description
 * Performs a click on the web element provided as argument
 * @param webElement
 * @returns {*} a promise
 */
exports.byPointAndClick = function (webElement) {
  return webElement.click();
    /*

  return  this.driver.switchTo().activeElement().then(function () {
        return new self.webdriver.ActionSequence(self.driver)
            .mouseMove(webEle,{x: 0, y: 0})
            .click(self.webdriver.Button.LEFT)
            .perform();
    });
    */

};

/**
 * @description
 * Performs a click on the web element provided as argument,
 * by using the return key (enter)
 * @param webEle
 * @param key
 * @returns {*}
 */
exports.byUsingTheReturnKey = function (webElement) {
    return webElement.sendKeys(this.webdriver.Key.ENTER);
};

/**
 * @description
 * Performs a click on the web element provided as argument,
 * by using the space key
 * @param webEle
 * @returns {*}
 */
exports.byUsingSpaceKey = function (webElement) {
    return webElement.sendKeys(this.webdriver.Key.SPACE);
};