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
    Logger = require('./../auxilium/logger').Logger,
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
    this.ruleset             = {};
    this.semanticRules       = {};
    this.image               = ''; //URL to a image of the current actor. This is only set of an image is provided in the rule set.


    this.username = void 0;  //default value is 'undefined'
    this.password = void 0;  //default value is 'undefined'

    if(properties){
        this.addPoperties(properties);
    }

};

/**
 * @description
 * Get the core functionality
 * @type {Merlot}
 */
Actor.prototype = new Merlot;


/**
 * @description
 * Get the Actors information as json object
 * @returns {{object}}
 */
//TODO: Add description about the format of the JSON object in the jsDoc comment!
Actor.prototype.getActorInformation_AsJSON = function () {
   let _jsonActorInfo = {};
       _jsonActorInfo.name  = this.getName();  //The name of the actor
       _jsonActorInfo.image = this.getImage(); //The URL to the actor`s image

    return _jsonActorInfo;
};

/**
 * @description Overrides prototype version of toString()
 * @returns {string}
 */
Actor.prototype.toString = function () {
    return this.getName();
};

/**
 * @description
 * Set the name of this actor
 * @param name {string} the name
 */
Actor.prototype.setName = function (name) {
    if(name !== undefined && this.utile._aux_.isString(name)){
       this.name = name;
    }
};


/**
 * @description Get the name of this actor
 * @returns {string} the name of this actor
 */
Actor.prototype.getName = function () {
    return this.name;
};

/**
 * @description
 * Set the semantic rules for an actor
 * @param _sementicRules {object}
 */
Actor.prototype.setSemenaticRuleSet = function (_sementicRules){
    if(_sementicRules !== undefined){
        this.semanticRules = _sementicRules;
    }
};

/**
 * @description
 * Get the semantic rules of an actor.
 * @returns {{object}|*} The semantic rul eset of an actor for a specific blueprint
 */
Actor.prototype.getSemenaticRuleSet = function (){
   return this.semanticRules;
};

/**
 * @description
 * Set the URL of the actors image.
 * This is only set of an image is provided in the rule set.
 * @param image_url
 */
Actor.prototype.setImage = function(image_url){
    if(image_url !== undefined){
        this.image = image_url;
    }
};

/**
 * @description
 * Get the URL the user image.
 * This function will return an empty string if not image url was set for this actor.
 * This can be true if no image was defined in the actor´s rule set.
 * @returns {*}, the URL to the image of this actor.
 */
Actor.prototype.getImage = function(){
    return this.image;
};

/**
 * @description
 * Check if the actor has semantic requirements of a given element.
 * If the answers is YES, this function will return an array of semantic requirement statements (strings)
 * with the the semantic requirements.
 * NOTE: This function will return FALSE if no semantic requirement are provided for the current
 * step in the blueprint`s evaluation.
 * @param elementName
 * The name of the element that is currently checked in the blueprint
 * @returns {{Array}|*} Returns an Array with semantic requirement statements on FALSE otherwise.
 */
Actor.prototype.hastSomethingtoSayAboutSemenatics = function (elementName){
    let _semantics = this.getSemenaticRuleSet();

    if(_semantics[elementName]){
       return _semantics[elementName];
    } else{
        return false
    }
};

/**
 * @description
 * Get the navigation pattern of this actor
 * @return {object} The specific navigation pattern of this actor.
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
    let that = this;

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
 * @returns {*} String - The username
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
 * Load the preference set of the actor by a given name (identifier)
 * This function is used with the Malbec GPII branch - Malbec.
 */
Actor.prototype.loadPreferenceSet = function(path,actorname,blueprint_name){
    //TODO: Implement a useful method in actor prototype
};

/**
 *
 * @param rs
 */
Actor.prototype.setRuleSet = function (rs) {
    this.acessibilityRuleset = rs;
};

/**
 *
 * @returns {{}|*} the rule set for JohnDoe
 */
Actor.prototype.getRuleSet = function () {
    return  this.acessibilityRuleset;
};