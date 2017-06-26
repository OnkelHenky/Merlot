/**
 * Created by Henka on 18.06.14.
 */

/**
 * @description
 * Provides all the needed blueprint steps
 * @type {blueprintSteps}
 */
module.exports = blueprintSteps = function ({Given, When, Then}) {

   /*
    * Invoking the cucumber hooks to process
    * action before and after each scenario

    require('../auxilium/newHooks');
    */

    /*
     * Invoking the step implementations
     * (The Steps)
     */
   require('./utilitySteps')({Given});
   require('./forms_and_inputSteps')({When, Then});
   require('./navigationSteps')({Given, When, Then});
};

