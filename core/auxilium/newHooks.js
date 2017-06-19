/**
 * Created by alex on 19.06.17.
 */

var {defineSupportCode} = require('cucumber');


defineSupportCode(function({After, Before}) {
    /*
     * Set the name of the current scenario/ Blueprint.
     * This hook is executed before the blueprint is evaluated.
     */
   Before(function (ScenarioResult, callback) {
        var  _browser = this.driver;
    //   console.dir(this.driver);

       console.dir(ScenarioResult.scenario.name);
       _browser.setCurrentBlueprint(ScenarioResult.scenario.name);
        callback();
    });

    /*
     * Close the selenium driver (browser) after all features
     * of an scenario had been executed.
     */
   After(function (ScenarioResult, callback) {
        var self    = this,
            _logger = this.driver.logger;

       this.driver.printEvaluationReport(ScenarioResult, function (err) {
            if (err) {
                _logger.log("Error, closing server");
                self.browser.pinotServer.stop(); //stop the pinot server
                callback();
            } else {
                _logger.info("Finished scenario: '" + ScenarioResult.scenario.name + "'");
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
});
