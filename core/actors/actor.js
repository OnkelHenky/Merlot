/**
 * Created by Henka on 07.06.14.
 */

var Merlot = require('../Merlot').Merlot,
    Actor;

/**
 * @description The prototype for an actor
 * @type {ActorBuilder}
 */
exports.Actor = Actor =  function(properties) {

    /*Information*/
    this._type_    = "Actor Object"; //Name of the object

    /*Properties*/
    this.name = '';


    if(properties){
        this.addPoperties(properties);
    }

};

/**
 * Get the core functionality
 * @type {Merlot}
 */
Actor.prototype = new Merlot;


/**
 * @description
 * @description Overrides prototype version of toString()
 * @returns {string}
 */
Merlot.prototype.toString = function () {
    return this.getName();
};

/**
 * @description Get the name of this actor
 * @returns {string} the name of this actor
 */
Actor.prototype.getName = function () {
    return this.name;
};

/**
 * @description Get the navigation pattern of this actor
 * @return {object}
 */
Actor.prototype.getNavigationPattern = function () {
    return this.navigationPattern;
};

/**
 * @description Add the properties for Actor.
 * @param properties
 */
Actor.prototype.addPoperties = function(properties){
    var that = this;

    Object.keys(properties).forEach(function (key) {
        that[key] = properties[key];
    });
};

/**
 *
 * @param webElement
 */
Actor.prototype.findElement = function (domElement) {
    //TODO: Implement a useful method in actor prototype
};

/**
 *
 * @param webElement
 */
Actor.prototype.interactWithElement = function (domElement) {
    //TODO: Implement a useful method in actor prototype
};

/**
 *
 * @param webEle
 * @param type
 */
Actor.prototype.click = function (domElement) {
    //TODO: Implement a useful method in actor prototype
};

/**
 *
 * @param webEle
 * @param type
 */
Actor.prototype.criteriaBundle = function () {
    //TODO: Implement a useful method in actor prototype
};
