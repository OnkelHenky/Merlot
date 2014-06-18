/**
 * Created by Henka on 18.06.14.
 */

/**
 *
 * @type {blueprintSteps}
 */
module.exports = blueprintSteps = function () {

    this.Given(/^Actor is "([^"]*)"$/, function (thisActor, callback) {
        this.theActorShellBe(thisActor);
        callback();
    });

   require('./interaction').call(this);
   require('./navigation').call(this);
};

