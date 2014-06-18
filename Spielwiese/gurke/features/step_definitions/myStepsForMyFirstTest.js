/**
 * Created by Henka on 13.06.14.
 */

var bl = require("../../../../core/steps/blueprintSteps");

module.exports = function () {
    this.World = require("../support/blueWorld.js").World;
    bl.call(this);
};
