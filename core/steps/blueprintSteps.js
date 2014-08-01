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
    * invoking the other steps implementations
    */
   require('./utilitySteps').call(this);
   require('./forms_and_inputSteps').call(this);
   require('./navigationSteps').call(this);

};

