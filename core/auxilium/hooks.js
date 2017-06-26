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
module.exports = function ({After, Before}) {

    /*
     * Set the name of the current scenario/ Blueprint.
     * This hook is executed before the blueprint is evaluated.
     */
    Before(function (ScenarioResult, callback) {
        let  _browser = this.driver;
        let  _logger = _browser.logger;
        _logger.info('Applying "Before Hooks"');
        _browser.setCurrentBlueprint(ScenarioResult.scenario.name);
        callback();
    });

    /*
     * Close the selenium driver (browser) after all features
     * of an scenario had been executed.
     */
    After(function (ScenarioResult, callback){
     //   let self    = this,
          let _logger = this.driver.logger;
        _logger.info('Applying "After Hooks"');
        this.driver.printEvaluationReport(ScenarioResult,  (err) => {
            if (err) {
                _logger.log("Error, closing server");
                this.driver.pinotServer.stop(); //stop the pinot server
                callback();
            } else {
                _logger.info("Finished scenario: '" + ScenarioResult.scenario.name + "'");
                if (_logger.getLogLevel() < 3) {
                    _logger.info("Closing selenium driver");
                    _logger.info("To keep the browser up and running set Merlot log level 3 (Error level) in the Blueprint config");
                    this.driver.pinotServer.stop(); //stop the pinot server
                    this.driver.closeDriver(); //closing the selenium driver (browser)
                }
                this.driver.pinotServer.stop(); //stop the pinot server
                callback();
            }

        });

    });
};