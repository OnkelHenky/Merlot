/**
 * Created by Alexander Henka on 04.08.14.
 * Copyright by Alexander Henka
 */


var MerlotError = require('./MerlotError').MerlotError,
    Merlot = require('./../Merlot').Merlot,
    ElementNotFoundError;


/**
 * @description
 * ELEMENT NOT FOUND
 * @type {ElementNotFoundError}
 */
module.exports.ElementNotFoundError =  ElementNotFoundError = function(msg) {

    this._type_  = "ElementNotFoundError";

    this.name = "ElementNotFoundError";
    this.message = "ElementNotFoundError";

    if(msg){
        this.message = msg;
    }

};

/**
 *
 * @type {Error}
 */
MerlotError.prototype = new MerlotError();