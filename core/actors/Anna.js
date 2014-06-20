/**
 * Created by Henka on 18.06.14.
 */
var Actor =  require('./actor').Actor,
    techniqueRepository = require('../techniques/techniqueRepository').TechniqueRepository,
    Anna;

/**
 * Anna
 * @type {Anna}
 */
Anna = exports.Anna =  function() {

    /*Properties*/
    this.name = 'Anna';

    this.navigationPattern = {
         "navStyle" : "TAB"
    };

};

/**
 * Get the actor basic features from the prototype
 * @type {Actor}
 */
Anna.prototype = new Actor;

/**
 * Technique used to navigate on the web application
 */
Anna.prototype.findElement = techniqueRepository.techniques['Tab_Navigation'];

/**
 * Technique used to interact (click) with a component on the web application
 */
Anna.prototype.click = techniqueRepository.techniques['Click_ReturnKey'];
