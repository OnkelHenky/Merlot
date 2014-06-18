/**
 * Created by Henka on 07.06.14.
 */

var Merlot = require('../Merlot').Merlot,
    Actor;

/**
 * @description The prototype for an actor
 * @type {ActorBuilder}
 */
Actor = exports.Actor =  function(properties) {

    /*Information*/
    this._type_    = "Actor Object"; //Name of the object

    /*Properties*/
    this.name = '';
    this.navigationPattern = {};

    if(properties){
        this.addPoperties(properties);
    }

};

Actor.prototype = new Merlot;

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
 * @param tagName
 * @param ele
 */
Actor.prototype.findElement = function (tagName,ele) {
    //TODO: Implement a useful method in actor prototype
};

/**
 *
 * @param webEle
 * @param type
 */
Actor.prototype.click = function (webEle,type) {
    //TODO: Implement a useful method in actor prototype
};