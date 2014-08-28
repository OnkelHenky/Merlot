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
module.exports.Paul = Paul =  function() {

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
Paul.prototype.findElement = techniqueRepository.techniques['PointAndClick_Navigation'];

//Paul.prototype.interactWithElement = techniqueRepository.techniques['Click_SpaceKey'];
Paul.prototype.interactWithElement = techniqueRepository.techniques['Click_Mouse'];

Paul.prototype.interactWithSelection = techniqueRepository.techniques['PAC_SelectOption'];

Paul.prototype.interactWithRadiobutton = techniqueRepository.techniques['Click_Mouse'];

/**
 * Technique used to interact (click) with a component on the web application
 */
Paul.prototype.click = techniqueRepository.techniques['Click_Mouse'];

Paul.prototype.criteriaBundle = new CriteriaProvider(['Void']).getCriteria();