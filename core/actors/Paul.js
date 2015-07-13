/**
 *  paul.js is part of Merlot
 *  Copyright (c) by Alexander Henka, 18.06.14.
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
 * |        ACTOR: PAUL         |
 * |      ================      |
 * | Paul is our default actor  |
 * +----------------------------+
 */

/*
 * +----------------------------+
 * |           Requires         |
 * +----------------------------+
 */
var Actor =  require('./actor').Actor,
    techniqueRepository = require('../techniques/techniqueRepository').TechniqueRepository,
    CriteriaProvider = require('../criteria/criteriaProvider').CriteriaProvider,
    Paul;

/**
 * @description
 * The profile for the actor Paul
 * @type {Paul}
 */
module.exports.Paul = Paul =  function() {

    /*
     * +----------------------------+
     * |        Properties          |
     * +----------------------------+
     */
    this.name = 'Paul';
    this.acessibilityRuleset = "WCAG2A";

    this.navigationPattern = {
        "navStyle" : "POINT_AND_CLICK"
    };
};

/**
 *
 * @param actorname
 */
Paul.prototype.loadPreferenceSetByPathAndName = function(actorname){
    this.loadPreferenceSet();
};

Paul.prototype.loadPreferenceSet = function(){

    /**
     * @description
     * Get the actor basic features from the prototype
     * @type {Actor}
     */
    Paul.prototype = new Actor;

    /*
     * +----------------------------+
     * | Technique used to navigate |
     * | on the web application     |
     * +----------------------------+
     */
    Paul.prototype.findElement = techniqueRepository.techniques['PointAndClick_Navigation'];

    /*
     * +-----------------------------------------+
     * | Technique used to interact (click)      |
     * | with a component on the web application |
     * +-----------------------------------------+
     */
    Paul.prototype.click = techniqueRepository.techniques['Click_Mouse'];

    /*
     * +-----------------------------------------+
     * | Technique used to interact with:        |
     * |    + Radio Buttons                      |
     * |    + Selection (DropDown)               |
     * +-----------------------------------------+
     */
    Paul.prototype.interactWithRadioButton = techniqueRepository.techniques['Click_Mouse'];
    Paul.prototype.interactWithSelection = techniqueRepository.techniques['PAC_SelectOption'];

    /*
     * //TODO: DEPRECATED?!
     * +-----------------------------------------+
     * | Criteria, for performing                |
     * |  accessibility test                     |
     * +-----------------------------------------+
     */
    Paul.prototype.criteriaBundle = new CriteriaProvider(['Void']).getCriteria();

};

/**
 * @description
 * Get the actor basic features from the prototype
 * @type {Actor}
 */
Paul.prototype = new Actor;

/*
 * +----------------------------+
 * | Technique used to navigate |
 * | on the web application     |
 * +----------------------------+
 */
Paul.prototype.findElement = techniqueRepository.techniques['PointAndClick_Navigation'];

/*
 * +-----------------------------------------+
 * | Technique used to interact (click)      |
 * | with a component on the web application |
 * +-----------------------------------------+
 */
Paul.prototype.click = techniqueRepository.techniques['Click_Mouse'];

/*
 * +-----------------------------------------+
 * | Technique used to interact with:        |
 * |    + Radio Buttons                      |
 * |    + Selection (DropDown)               |
 * +-----------------------------------------+
 */
Paul.prototype.interactWithRadioButton = techniqueRepository.techniques['Click_Mouse'];
Paul.prototype.interactWithSelection = techniqueRepository.techniques['PAC_SelectOption'];

/*
 * //TODO: DEPRECATED?!
 * +-----------------------------------------+
 * | Criteria, for performing                |
 * |  accessibility test                     |
 * +-----------------------------------------+
 */
Paul.prototype.criteriaBundle = new CriteriaProvider(['Void']).getCriteria();