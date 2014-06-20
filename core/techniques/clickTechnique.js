/**
 * Created by Henka on 20.06.14.
 */


exports.byPointAndClick = function (webEle,type) {
    return new this.webdriver.ActionSequence(this.driver)
        .mouseMove(webEle,{x: 0, y: 0})
        .click(this.webdriver.Button.LEFT)
        .perform();
};

exports.byUsingTheReturnKey = function (webEle,type) {
    return webEle.sendKeys(this.webdriver.Key.ENTER);
};