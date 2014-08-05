/**
 * Created by Henka on 18.06.14.
 */

/**
 * @description
 * Provides all the needed blueprint steps
 * @type {blueprintSteps}
 */
module.exports = blueprintSteps = function () {

   /*
    * Invoking the cucumber hooks to process
    * action before and after each scenario
    */
   require('../auxilium/hooks').call(this);

    /*
     * Invoking the step implementations
     * (The Steps)
     */
   require('./utilitySteps').call(this);
   require('./forms_and_inputSteps').call(this);
   require('./navigationSteps').call(this);

};

