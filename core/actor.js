/**
 * Created by Henka on 07.06.14.
 */

var Actor;

/**
 *
 * @type {ActorBuilder}
 */
Actor = exports.Actor =  function(properties) {

    /*Information*/
    this._version_ = "0.0.1", //Version number of the PathLogger
    this._name_    = "Actor"; //Name of the object

    /*Properties*/
    this.name = '';
    this.navigationPattern = {};

    if(properties){
        this.addPoperties(properties);
    }

};

/**
 *
 * @param ele
 */
Actor.prototype.getNavigationPattern = function () {
    return this.navigationPattern;
};

/**
 * @description
 * Add the properties for Actor.
 * @param properties
 */
Actor.prototype.addPoperties = function(properties){
    var that = this;

    Object.keys(properties).forEach(function (key) {
        that[key] = properties[key];
    });
};