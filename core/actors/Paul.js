/**
 * Created by Henka on 18.06.14.
 */

var Actor =  require('./actor').Actor,
    techniqueRepository = require('../techniques/techniqueRepository').TechniqueRepository,
    Paul;

/**
 * The prototype for an actor
 * @type {ActorBuilder}
 */
Paul = exports.Paul =  function() {

    /*Properties*/
    this.name = 'Paul';

    this.navigationPattern = {
        "navStyle" : "POINT_AND_CLICK"
    };

    this.findElement = techniqueRepository.techniques['PointAndClick_Navigation'];

};

Paul.prototype = new Actor;

Paul.prototype.click = function (webEle,type) {

  return new this.webdriver.ActionSequence(this.driver)
        .mouseMove(webEle,{x: 0, y: 0})
        .click(this.webdriver.Button.LEFT)
        .perform();
};