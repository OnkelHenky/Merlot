/**
 *  anna.js is part of Merlot
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
 * |        ACTOR: ANNA         |
 * |      ================      |
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
    Anna;

/**
 * @description
 * The profile for the actor Anna
 * @type {Anna}
 */
exports.Anna = Anna = function() {

   /*
    * +----------------------------+
    * |        Properties          |
    * +----------------------------+
    */
    this.name = 'Anna';
    this.acessibilityRuleset = "AnnaA_Foo";

    this.navigationPattern = {
         "navStyle" : "TAB"
    };

};

/**
 * @description
 * Get the actor basic features from the prototype
 * @type {Actor}
 */
Anna.prototype = new Actor;


/**
 * @description
 * Load the preference set of the actor.
 * This function is used with the Malbec GPII branch
 */
Anna.prototype.loadPreferenceSet = function(){

    /*
     * +----------------------------+
     * | Technique used to navigate |
     * | on the web application     |
     * +----------------------------+
     */
    Anna.prototype.findElement = techniqueRepository.techniques['Tab_Navigation'];

    /*
     * +-----------------------------------------+
     * | Technique used to interact (click)      |
     * | with a component on the web application |
     * +-----------------------------------------+
     */
    Anna.prototype.click = techniqueRepository.techniques['Click_ReturnKey'];


    /*
     * +-----------------------------------------+
     * | Technique used to interact with:        |
     * |    + Radio Buttons                      |
     * |    + Selection (DropDown)               |
     * +-----------------------------------------+
     */
    Anna.prototype.interactWithRadioButton = techniqueRepository.techniques['Keyboard_RadioButtonInteraction'];
    Anna.prototype.interactWithSelection = techniqueRepository.techniques['Keyboard_SelectOption'];


    /*
     * //TODO: DEPRECATED?!
     * +-----------------------------------------+
     * | Criteria, for performing                |
     * |  accessibility test                     |
     * +-----------------------------------------+
     */
   //TODO: Use WCAG success criterion - e.g., => new CriteriaProvider(['WCAG_1.1.1','WCAG_2.2.1']).getCriteria();
    Anna.prototype.criteriaBundle =  new CriteriaProvider(['Link_Has_Link_Text','Link_Has_Title']).getCriteria();
};


/*
 * +----------------------------+
 * | Technique used to navigate |
 * | on the web application     |
 * +----------------------------+
 */
Anna.prototype.findElement = techniqueRepository.techniques['Tab_Navigation'];

/*
 * +-----------------------------------------+
 * | Technique used to interact (click)      |
 * | with a component on the web application |
 * +-----------------------------------------+
 */
Anna.prototype.click = techniqueRepository.techniques['Click_ReturnKey'];


/*
 * +-----------------------------------------+
 * | Technique used to interact with:        |
 * |    + Radio Buttons                      |
 * |    + Selection (DropDown)               |
 * +-----------------------------------------+
 */
Anna.prototype.interactWithRadioButton = techniqueRepository.techniques['Keyboard_RadioButtonInteraction'];
Anna.prototype.interactWithSelection = techniqueRepository.techniques['Keyboard_SelectOption'];


/*
 * //TODO: DEPRECATED?!
 * +-----------------------------------------+
 * | Criteria, for performing                |
 * |  accessibility test                     |
 * +-----------------------------------------+
 */
//TODO: Use WCAG success criterion - e.g., => new CriteriaProvider(['WCAG_1.1.1','WCAG_2.2.1']).getCriteria();
Anna.prototype.criteriaBundle =  new CriteriaProvider(['Link_Has_Link_Text','Link_Has_Title']).getCriteria();
