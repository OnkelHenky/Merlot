/**
 *  MerlotError is part of Merlot
 *  Copyright (c) by Alexander Henka, 13.10.14.
 *
 */


var MerlotError,
    Merlot = require('./../Merlot').Merlot;

/**
 *
 * @type {MerlotError}
 */
module.exports.MerlotError =  MerlotError = function(msg) {

    this._type_  = "MerlotError";

    this.name = "MerlotError";
    this.message = "MerlotError";

    if(msg){
        this.message = msg;
    }

};

/**
 *
 * @type {Error}
 */
MerlotError.prototype = new Error();

/**
 *
 * @returns {*}
 */
MerlotError.prototype.getMsg = function () {
    return (this.message)? this.message : this._type_;
};

/**
 *
 * @returns {*}
 */
MerlotError.prototype.toString = function () {
    return this.getName+this.getMsg();
};

/**
 *
 * @returns {string}
 */
MerlotError.prototype.getType = function () {
    return this._type_;
};


MerlotError.prototype.name = "MerlotError";
MerlotError.prototype.message = "MerlotError";