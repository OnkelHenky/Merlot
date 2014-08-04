/**
 * Created by Alexander Henka on 04.08.14.
 * Copyright by Alexander Henka
 */


var ElementNotFoundError,
    Merlot = require('./../Merlot').Merlot;

/**
 *
 * @type {ElementNotFoundError}
 */
module.exports.ElementNotFoundError =  ElementNotFoundError = function(msg) {

   this.name = "ElementNotFoundError"
   this.message = "ElementNotFoundError";

   if(msg){
     this.message = msg;
   }

};

/**
 *
 * @type {Error}
 */
ElementNotFoundError.prototype = new Error();

/**
 *
 * @returns {*}
 */
ElementNotFoundError.prototype.getMsg = function () {
    return (this.message)? this.message : this._type_;
};


ElementNotFoundError.prototype.toString = function () {
    return this.getMsg();
};

ElementNotFoundError.prototype.name = "ElementNotFoundError";
ElementNotFoundError.prototype.message = "ElementNotFoundError";