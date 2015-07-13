/**
 *  anna.js is part of Merlot
 *  Copyright (c) by Alexander Henka, 09.01.15.
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
 * +---------------------------------------------------------------------------+
 * |                            Generic Actor                                  |
 * |                           ================                                |
 * |                        For Malbec GPII Branche                            |
 * +---------------------------------------------------------------------------+
 */

/*
 * +----------------------------+
 * |           Requires         |
 * +----------------------------+
 */
var Actor =  require('./actor').Actor,
    techniqueRepository = require('../techniques/techniqueRepository').TechniqueRepository,
    CriteriaProvider = require('../criteria/criteriaProvider').CriteriaProvider,
    GenericActor;

/**
 * @description
 * The profile for the actor Anna
 * @type {GenericActor}
 */
exports.GenericActor = GenericActor = function() {

    /*
     * +----------------------------+
     * |        Properties          |
     * +----------------------------+
     */
    this.name = 'JohnDoe';
    this.acessibilityRuleset = "JohnDoe";
    this.ruleset = {};

    this.navigationPattern = {
        "navStyle" : "TAB"
    };

};


/**
 * @description
 * Get the actor basic features from the prototype
 * @type {Actor}
 */
GenericActor.prototype = new Actor;


/**
 * @override
 * @description
 * Get the name of the accessibility rule set for this actor
 * @returns {string} the name of the  rule set
 */
GenericActor.prototype.getAcessibilityRuleset = function () {
    return this.acessibilityRuleset;
};

/**
 * @override
 * @descripton
 * Load the preference set of the actor by a given name (identifier)
 * @param actorname {string} the name of the actor
 */
GenericActor.prototype.loadPreferenceSetByPathAndName = function(path,actorname){
    var _jf   = require('jsonfile'),
        _util = require('util'),
        _path = require('path'),
        _actor_name = actorname;

    var _path_to_vin_file = _path.join(path, _actor_name+".vin.json");
    var _jsonData = _jf.readFileSync(_path_to_vin_file);
    var ruleset = {
        name: _actor_name,
        description: 'Accessibility Guidelines for '+_actor_name,
        sniffs: [
            {
                standard: 'WCAG2AAA',
                include: _jsonData.common.WCAG.automatic.include
            }
        ],
        getMsgInfo: function(code) {
            return HTMLCS_WCAG2AAA.getMsgInfo(code);
        }
    };

    this.setRuleSet(ruleset);
    console.log(_util.inspect(this.getRuleSet()));
    var _navstyle = _jsonData.common.WCAG.navigation.style;

    if('point_and_click' === _navstyle){


        Actor.prototype.findElement = techniqueRepository.techniques['PointAndClick_Navigation'];

        /*
         * +-----------------------------------------+
         * | Technique used to interact (click)      |
         * | with a component on the web application |
         * +-----------------------------------------+
         */
        Actor.prototype.click = techniqueRepository.techniques['Click_Mouse'];

        /*
         * +-----------------------------------------+
         * | Technique used to interact with:        |
         * |    + Radio Buttons                      |
         * |    + Selection (DropDown)               |
         * +-----------------------------------------+
         */
        Actor.prototype.interactWithRadioButton = techniqueRepository.techniques['Click_Mouse'];
        Actor.prototype.interactWithSelection = techniqueRepository.techniques['PAC_SelectOption'];


    }else if('keyboard' === _navstyle){
        /*
         * +----------------------------+
         * | Technique used to navigate |
         * | on the web application     |
         * +----------------------------+
         */
        Actor.prototype.findElement = techniqueRepository.techniques['Tab_Navigation'];

        /*
         * +-----------------------------------------+
         * | Technique used to interact (click)      |
         * | with a component on the web application |
         * +-----------------------------------------+
         */
        Actor.prototype.click = techniqueRepository.techniques['Click_ReturnKey'];


        /*
         * +-----------------------------------------+
         * | Technique used to interact with:        |
         * |    + Radio Buttons                      |
         * |    + Selection (DropDown)               |
         * +-----------------------------------------+
         */
        Actor.prototype.interactWithRadioButton = techniqueRepository.techniques['Keyboard_RadioButtonInteraction'];
        Actor.prototype.interactWithSelection = techniqueRepository.techniques['Keyboard_SelectOption'];

    }
};

/**
 * @description
 * Load the preference set of the actor.
 * This function is used with the Malbec GPII branch
 */
GenericActor.prototype.loadPreferenceSet = function(){
    var _jf   = require('jsonfile'),
        _util = require('util'),
        _path = require('path'),
        _actor_name = this.getName();

    var _path_to_vin_file = _path.join(__dirname, _actor_name+".vin.json");
    var _jsonData = _jf.readFileSync(_path_to_vin_file);
    var ruleset = {
        name: _actor_name,
        description: 'Accessibility Guidelines for '+_actor_name,
        sniffs: [
            {
                standard: 'WCAG2AAA',
                include: _jsonData.common.WCAG.automatic.include
            }
        ],
        getMsgInfo: function(code) {
            return HTMLCS_WCAG2AAA.getMsgInfo(code);
        }
    };

    this.setRuleSet(ruleset);
    console.log(_util.inspect(this.getRuleSet()));
    var _navstyle = _jsonData.common.WCAG.navigation.style;

    if('point_and_click' === _navstyle){


        Actor.prototype.findElement = techniqueRepository.techniques['PointAndClick_Navigation'];

        /*
         * +-----------------------------------------+
         * | Technique used to interact (click)      |
         * | with a component on the web application |
         * +-----------------------------------------+
         */
        Actor.prototype.click = techniqueRepository.techniques['Click_Mouse'];

        /*
         * +-----------------------------------------+
         * | Technique used to interact with:        |
         * |    + Radio Buttons                      |
         * |    + Selection (DropDown)               |
         * +-----------------------------------------+
         */
        Actor.prototype.interactWithRadioButton = techniqueRepository.techniques['Click_Mouse'];
        Actor.prototype.interactWithSelection = techniqueRepository.techniques['PAC_SelectOption'];


    }else if('keyboard' === _navstyle){
        /*
         * +----------------------------+
         * | Technique used to navigate |
         * | on the web application     |
         * +----------------------------+
         */
        Actor.prototype.findElement = techniqueRepository.techniques['Tab_Navigation'];

        /*
         * +-----------------------------------------+
         * | Technique used to interact (click)      |
         * | with a component on the web application |
         * +-----------------------------------------+
         */
        Actor.prototype.click = techniqueRepository.techniques['Click_ReturnKey'];


        /*
         * +-----------------------------------------+
         * | Technique used to interact with:        |
         * |    + Radio Buttons                      |
         * |    + Selection (DropDown)               |
         * +-----------------------------------------+
         */
        Actor.prototype.interactWithRadioButton = techniqueRepository.techniques['Keyboard_RadioButtonInteraction'];
        Actor.prototype.interactWithSelection = techniqueRepository.techniques['Keyboard_SelectOption'];

    }
};

/**
 * @description
 * Yes, this is John Doe
 * @returns {boolean} returns true
 */
GenericActor.prototype.isJohnDoe = function () {
    return true;
};

/**
 *
 * @param rs
 */
GenericActor.prototype.setRuleSet = function (rs) {
    this.ruleset = rs;
};

/**
 *
 * @returns {{}|*} the rule set for JohnDoe
 */
GenericActor.prototype.getRuleSet = function () {
  return  this.ruleset;
};