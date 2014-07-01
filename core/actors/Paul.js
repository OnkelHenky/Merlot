/**
 * Created by Henka on 18.06.14.
 */

var Actor =  require('./actor').Actor,
    techniqueRepository = require('../techniques/techniqueRepository').TechniqueRepository,
    CriteriaProvider = require('../criteria/criteriaProvider').CriteriaProvider,
    Paul;

/**
 * Paul
 * @type {Paul}
 */
Paul = exports.Paul =  function() {

    /*Properties*/
    this.name = 'Paul';

    this.navigationPattern = {
        "navStyle" : "POINT_AND_CLICK"
    };
};

/**
 * Get the actor basic features from the prototype
 * @type {Actor}
 */
Paul.prototype = new Actor;

/**
 * Technique used to navigate on the web application
 */
Paul.prototype.findElement = techniqueRepository.techniques['CSS_Navigation'];

/**
 * Technique used to interact (click) with a component on the web application
 */
Paul.prototype.click = techniqueRepository.techniques['Click_Mouse'];

Paul.prototype.criteriaBundle = new CriteriaProvider(['Void']).getCriteria();