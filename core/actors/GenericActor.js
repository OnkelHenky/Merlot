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
    GenericActor;

/**
 * @description
 * The profile for the actor
 * @type {GenericActor}
 */
exports.GenericActor = GenericActor = function() {

    /*
     * +----------------------------+
     * |        Properties          |
     * +----------------------------+
     */
    this.name = 'GPII_Based_Actor';

};



/**
 * @description
 * Get the actor basic features from the prototype
 * @type {Actor}
 */
GenericActor.prototype = new Actor;

/**
 * @override
 * @descripton
 * Load the preference set of the actor by a given name (identifier)
 * @param path the path to the actors rule set.
 * @param actorname {string} the name of the actor
 * @param blueprint_name {string} the name of current blueprint test case
 */
//TODO: Add exception handling if the vin file for the current actor can not be found!
GenericActor.prototype.loadPreferenceSet = function(path,actorname,blueprint_name){
    var _jf   = require('jsonfile'),
        _util = require('util'),
        _path = require('path'),
        _actor_name = actorname,

        /*
         * Replace blank " " with underscore _ in the blueprint name
         * to match the name of the user scenario in the persona's rule set.
         * Be default there are written with _ instead of " "
         */
        _blueprint_name = blueprint_name.split(' ').join('_');


    this.logger.info('Actor is ' + _actor_name);
   // console.log('path to vins = ' + path);
    //console.log('_blueprint_name = ' + _blueprint_name);


    var _path_to_vin_file = _path.join(path, _actor_name+".vin.json");
    this.logger.info (_path_to_vin_file);
    var _jsonData = _jf.readFileSync(_path_to_vin_file);
    console.dir(_jf.readFileSync(_path_to_vin_file));

    /*
     * Get the correct rule set for the current blueprint (user scenario)
     * TODO: Check if rule set with given name exist!
     */
    var rule_for_the_current_blueprint = _jsonData.rule_sets[_blueprint_name];

    var ruleset = {
        name: _actor_name,
        description: 'Accessibility Guidelines for '+_actor_name,
        sniffs: [
            {
                standard: 'WCAG2AAA',
                include: rule_for_the_current_blueprint.technical.WCAG.automatic
            }
        ],
        getMsgInfo: function(code) {
            return HTMLCS_WCAG2AAA.getMsgInfo(code);
        }
    };

  //  console.log('+++++ Actor Infor +++++');
    //console.dir(_jsonData.actor_info);

    this.setImage(_jsonData.actor_info.image);
    this.setRuleSet(ruleset);
    this.setSemenaticRuleSet(rule_for_the_current_blueprint.semantic);
    var _navstyle = rule_for_the_current_blueprint.technical.navigation.style;

    if('point_and_click' === _navstyle){


        GenericActor.prototype.findElement = techniqueRepository.techniques['PointAndClick_Navigation'];

        /*
         * +-----------------------------------------+
         * | Technique used to interact (click)      |
         * | with a component on the web application |
         * +-----------------------------------------+
         */
        GenericActor.prototype.click = techniqueRepository.techniques['Click_Mouse'];

        /*
         * +-----------------------------------------+
         * | Technique used to interact with:        |
         * |    + Radio Buttons                      |
         * |    + Selection (DropDown)               |
         * +-----------------------------------------+
         */
        GenericActor.prototype.interactWithRadioButton = techniqueRepository.techniques['Click_Mouse'];
        GenericActor.prototype.interactWithSelection = techniqueRepository.techniques['PAC_SelectOption'];


    }else if('keyboard' === _navstyle){
        /*
         * +----------------------------+
         * | Technique used to navigate |
         * | on the web application     |
         * +----------------------------+
         */
        GenericActor.prototype.findElement = techniqueRepository.techniques['Tab_Navigation'];

        /*
         * +-----------------------------------------+
         * | Technique used to interact (click)      |
         * | with a component on the web application |
         * +-----------------------------------------+
         */
        GenericActor.prototype.click = techniqueRepository.techniques['Click_ReturnKey'];


        /*
         * +-----------------------------------------+
         * | Technique used to interact with:        |
         * |    + Radio Buttons                      |
         * |    + Selection (DropDown)               |
         * +-----------------------------------------+
         */
        GenericActor.prototype.interactWithRadioButton = techniqueRepository.techniques['Keyboard_RadioButtonInteraction'];
        GenericActor.prototype.interactWithSelection = techniqueRepository.techniques['Keyboard_SelectOption'];

    }
};