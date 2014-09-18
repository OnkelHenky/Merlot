/**
 * Created by Alexander Henka on 05.08.14.
 * Copyright by Alexander Henka
 */

/**
 * @description
 * A bunch of before and after hooks of the cucumber framework.
 * To run setup code and clean up code before and after an scenario
 * is being executed.
 * @type {hooks}
 */
module.exports = hooks = function () {
    /*
     * Close the selenium driver (browser) after all features
     * of an scenario had been executed.
     */
    this.After(function(scenario, callback) {
        var _logger = this.browser.logger;

        _logger.info("Finished scenario: '"+scenario.getName()+"'");

        if(_logger.getLogLevel() < 3){
           _logger.info("Closing selenium driver");
          // _logger.info("To keep the browser up and running set Merlot log level 3 (Error level) in the Blueprint config");
           this.browser.closeDriver(); //closing the selenium driver (browser)
        }
        // this.browser.closeDriver();
        this.browser.pinotServer.stop(); //stop the pinot server
        callback();
    });

};