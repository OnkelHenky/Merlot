/**
 * Created by Henka on 18.06.14.
 */


var Merlot;


/**
 * @description The prototype for an actor
 * @type {ActorBuilder}
 */
module.exports.Merlot = Merlot = function (properties) {

    /*Information*/
    this._version_ = "0.0.1"; //Version number of the Actor
    this._type_ = "Merlot Object"; //Name of the object
};

/**
 * @description
 * Collection of useful function, that should occur in any Merlot object
 * @type {{}}
 */
Merlot.prototype.utile = {};

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

