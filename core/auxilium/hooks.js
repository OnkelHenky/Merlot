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
     * Set the name of the current scenario/ Blueprint.
     * This hook is executed before the blueprint is evaluated.
     */
    this.Before(function (scenario, callback) {
        var  _browser = this.browser;
        _browser.setCurrentBlueprint(scenario.getName());
        callback();
    });

    /*
     * Close the selenium driver (browser) after all features
     * of an scenario had been executed.
     */
    this.After(function (scenario, callback) {
        var self    = this,
            _logger = this.browser.logger;

        self.browser.printEvaluationReport(scenario, function (err) {
            if (err) {
                _logger.log("Error, closing server");
                self.browser.pinotServer.stop(); //stop the pinot server
                callback();
            } else {
                _logger.info("Finished scenario: '" + scenario.getName() + "'");
                if (_logger.getLogLevel() < 3) {
                    _logger.info("Closing selenium driver");
                    _logger.info("To keep the browser up and running set Merlot log level 3 (Error level) in the Blueprint config");
                    self.browser.pinotServer.stop(); //stop the pinot server
                    self.browser.closeDriver(); //closing the selenium driver (browser)
                }
                self.browser.pinotServer.stop(); //stop the pinot server
                callback();
            }

        });

    });
};