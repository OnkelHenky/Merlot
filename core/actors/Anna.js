/**
 * Created by Henka on 18.06.14.
 */
var Actor =  require('./actor').Actor,
    techniqueRepository = require('../techniques/techniqueRepository').TechniqueRepository,
    Anna;

/**
 * The prototype for an actor
 * @type {ActorBuilder}
 */
Anna = exports.Anna =  function() {


    /*Properties*/
    this.name = 'Anna';

    this.navigationPattern = {
         "navStyle" : "TAB"
    };

    this.findElement = techniqueRepository.techniques['Tab_Navigation'];

};

Anna.prototype = new Actor;


Anna.prototype.click = function (webEle,type) {
   return webEle.sendKeys(this.webdriver.Key.ENTER);
};

