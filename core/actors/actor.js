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

    this.username = void 0;  //default value is 'undefined'
    this.password = void 0;  //default value is 'undefined'

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
 * @description
 * Set the username fot this actor.
 * The username may by used for login credentials.
 * @param username
 */
Actor.prototype.setUsername = function (username) {
    this.username = username;
};

/**
 * @description
 * Get the username fot this actor.
 * The username may by used for login credentials.
 * This function returns undefined is no username is defined
 * fot this actor.
 * @returns {*} the username
 */
Actor.prototype.getUsername = function () {
    return this.username;
};

/**
 * @description
 * Set the password fot this actor.
 * The password may by used for login credentials.
 * @param password
 */
Actor.prototype.setPassword = function (password) {
    this.password = password;
};

/**
 * @description
 * Get the password fot this actor.
 * The password may by used for login credentials.
 * This function returns undefined is no password is defined
 * fot this actor.
 * @returns {*} the password
 */
Actor.prototype.getPassword = function () {
    return this.password;
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

Actor.prototype.interactWithSelection = function (domElement) {
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
