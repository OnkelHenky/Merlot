/**
 * Created by Henka on 18.06.14.
 */


var Merlot;

/**
 * @description The prototype for an actor
 * @type {ActorBuilder}
 */
Merlot = exports.Merlot =  function(properties) {

    /*Information*/
    this._version_ = "0.0.1", //Version number of the Actor
    this._type_    = "Merlot Object"; //Name of the object
};

/**
 * @description Get the current version of Merlot
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
    return this.getTypeName()+" "+this.getVersion();
};

