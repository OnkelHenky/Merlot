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
    this.name = 'GenericActor';
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
 * @description
 * Get the name of the accessibility rule set for this actor
 * @returns {string} the name of the  rule set
 */
GenericActor.prototype.getAcessibilityRuleset = function () {

    var _jf   = require('jsonfile'),
      //  _fs   = require('fs'),
        _util = require('util'),
        _path = require('path');

    var _path_to_vin_file = _path.join(__dirname, "vin.json");
    var jsonData = _jf.readFileSync(_path_to_vin_file);
    console.log(_util.inspect(jsonData.WCAG.automatic.include));
    var ruleset = {
        name: 'JohnDoeA',
        description: 'Accessibility Guidelines for JohnDoe',
        sniffs: [
            {
                standard: 'WCAG2AAA',
                include: jsonData.WCAG.automatic.include
            }
        ],
        getMsgInfo: function(code) {
            return HTMLCS_WCAG2AAA.getMsgInfo(code);
        }
    };

    this.setRuleSet(ruleset);

    console.log(_util.inspect(this.getRuleSet()));


  //  return "JohnDoe";
};

/**
 * @description
 * Yes, this is John Doe
 * @returns {boolean} returns true
 */
GenericActor.prototype.isJohnDoe = function () {
    return true;
};

GenericActor.prototype.setRuleSet = function (rs) {
    console.log('sdasdasdasdsadsad');

    this.ruleset = rs;
    console.dir(this.ruleset);


};


GenericActor.prototype.getRuleSet = function () {
  return  this.ruleset;
};

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

/*
 * //TODO: DEPRECATED?!
 * +-----------------------------------------+
 * | Criteria, for performing                |
 * |  accessibility test                     |
 * +-----------------------------------------+
 */
GenericActor.prototype.criteriaBundle = new CriteriaProvider(['Void']).getCriteria();
