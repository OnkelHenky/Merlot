/**
 *  actor.js is part of Merlot
 *  Copyright (c) by Alexander Henka, 07.06.14.
 *  Project URL: https://github.com/OnkelHenky/Merlot
 *
 * +--------------------------------------------------------------------------+
 * | LICENSE INFORMATION                                                      |
 * | ===================                                                      |
 * |                                                                          |
 * | Licensed under the Apache License, Version 2.0 (the "License");          |
 * | you may not use this file except in compliance with the License.         |
 * | You may obtain a copy of the License at                                  |
 * |                                                                          |
 * | http://www.apache.org/licenses/LICENSE-2.0                               |
 * |                                                                          |
 * | Unless required by applicable law or agreed to in writing, software      |
 * | distributed under the License is distributed on an "AS IS" BASIS,        |
 * | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 * | See the License for the specific language governing permissions and      |
 * | limitations under the License.                                           |
 * +--------------------------------------------------------------------------+
 */

/*
 * +----------------------------+
 * |       ACTOR OBJECT         |
 * |      ================      |
 * +----------------------------+
 */

/*
 * +----------------------------+
 * |           Requires         |
 * +----------------------------+
 */
var Merlot = require('../Merlot').Merlot,
    Actor;

/**
 * @description The prototype for an actor
 * @type {ActorBuilder}
 */
exports.Actor = Actor =  function(properties) {

    /*
     * +----------------------------+
     * |        Information         |
     * +----------------------------+
     */
    this._type_  = "Actor Object"; //Name of the object

    /*
     * +----------------------------+
     * |        Properties          |
     * +----------------------------+
     */
    this.name                = '';
    this.acessibilityRuleset = '';

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
 * @description
 * Set the accessibility rule set for this actor
 * @param {string} the name of the ruleset.
 */
Actor.prototype.setAcessibilityRuleset = function (ruleset) {
     this.acessibilityRuleset = ruleset;
};

/**
 * @description
 * Get the name of the accessibility rule set for this actor
 * @returns {string} the name of the  rule set
 */
Actor.prototype.getAcessibilityRuleset = function () {
    return this.acessibilityRuleset;
};

/**
 * @description
 * Find and navigate to a element on the web page.
 * The function is specific th each actor, and must be
 * implemented accordingly
 * @param {object} domElement the element that should be found
 */
Actor.prototype.findElement = function (domElement) {
    //TODO: Implement a useful method in actor prototype
};

/**
 * @description
 * interact with a radio button
 * @param {object} domElement
 */
Actor.prototype.interactWithRadioButton = function (domElement) {
    //TODO: Implement a useful method in actor prototype
};

/**
 * @description
 * interact with a selection (drop down menue)
 * @param {object} domElement
 */
Actor.prototype.interactWithSelection = function (domElement) {
    //TODO: Implement a useful method in actor prototype
};

/**
 * @description
 * perform a click on the provided element
 * @param {object} domElement
 */
Actor.prototype.click = function (domElement) {
    //TODO: Implement a useful method in actor prototype
};

/**
 * @description
 * Check if actor is John Doe, if true this actor uses his ruleset data from GPII
 * @returns {boolean}
 */
Actor.prototype.isJohnDoe = function () {
    return false;
};

/**
 * @description
 * Load the preference set of the actor.
 * This function is used with the Malbec GPII branch
 */
Actor.prototype.loadPreferenceSet = function(){
    //TODO: Implement a useful method in actor prototype
};

/**
 * @description
 * Load the preference set of the actor by a given name (identifier)
 * This function is used with the Malbec GPII branch - Malbec.
 */
Actor.prototype.loadPreferenceSetByPathAndName = function(path,actorname){
    //TODO: Implement a useful method in actor prototype
};

/**
 * @deprecated
 */
Actor.prototype.criteriaBundle = function () {
    //TODO: Implement a useful method in actor prototype
};