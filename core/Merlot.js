/**
 *  Merlot.js is part of Merlot
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
 * |                                                                          |
 * |  For more information see:                                               |
 * |  https://github.com/OnkelHenky/Merlot/blob/master/LICENSE.md             |
 * |                                                                          |
 * +--------------------------------------------------------------------------+
 */

/*
 * +---------------------------------------------------------------------------+
 * |                                MERLOT                                     |
 * |                           ================                                |
 * |                 Automatic Accessibility Acceptance Test                   |
 * +---------------------------------------------------------------------------+
 *
 * +---------------------------------------------------------------------------+
 * | From Wikipedia                                                            |
 * | ==============                                                            |
 * |                                                                           |
 * | Merlot is a dark blue-colored wine grape variety, that is used as both    |
 * | a blending grape and for varietal wines.                                  |
 * | The name Merlot is thought to be a diminutive of merle,                   |
 * | the French name for the blackbird, probably a reference to the color of   |
 * | the grape.                                                                |
 * |                                                                           |
 * | Its softness and "fleshiness", combined with its earlier ripening,        |
 * | makes Merlot a popular grape for blending with the sterner,               |
 * | later-ripening Cabernet Sauvignon, which tends to be higher in tannin.    |
 * |                                                                           |
 * | Source: http://en.wikipedia.org/wiki/Merlot                               |
 * +---------------------------------------------------------------------------+
 */

var Merlot;


/**
 * @description The prototype for an actor
 * @type {ActorBuilder}
 */
module.exports.Merlot = Merlot = function () {

   /*
    * +----------------------------+
    * |        Information         |
    * +----------------------------+
    */
    this._version_ = "0.0.2";         //Version number of the Actor
    this._type_    = "Merlot Object"; //Name of the object
};

/**
 * @description
 * Get the current version of Merlot
 * @returns {string} the version number
 */
Merlot.prototype.getVersion = function () {
    return this._version_;
};

/**
 * @description Get the type (name) of this object
 * @returns {string}, the type (name) of this object
 */
Merlot.prototype.getTypeName = function () {
    return this._type_;
};

/**
 * @description
 * @description Overrides prototype version of toString()
 * @returns {string}
 */
Merlot.prototype.toString = function () {
    return this.getTypeName() + " " + this.getVersion();
};

/**
 * @description
 * Collection of useful function, that should occur in any Merlot object
 * @type {{}}
 */
Merlot.prototype.utile = {};

/*
 * +------------------------------------------+
 * | Helper functions, like file system       |
 * | useful in various objects of Merlot      |
 * +------------------------------------------+
 */

/**
 * @description
 * File system support.
 * @type {exports}
 */
Merlot.prototype.utile._fs_ = require('fs');

/**
 * @description
 * System function support.
 * @type {exports}
 * @private
 */
Merlot.prototype.utile._sys_ = require('sys');

/**
 * @description
 * Access to the auxilia functions for all Merlot objects
 * @type {exports}
 */
Merlot.prototype.utile._aux_ = require('./auxilium/auxiliaFunctions');