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
module.exports.ElementNotFoundError =  ElementNotFoundError = function(domElement) {

   this._type_  = "ElementNotFoundError";

   this.name = "ElementNotFoundError";
   this.message = "ElementNotFoundError";

   if(domElement){
     this.message = domElement.toString();
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

/**
 *
 * @returns {*}
 */
ElementNotFoundError.prototype.toString = function () {
    return this.getName+this.getMsg();
};

/**
 *
 * @returns {string}
 */
ElementNotFoundError.prototype.getType = function () {
    return this._type_;
};


ElementNotFoundError.prototype.name = "ElementNotFoundError";
ElementNotFoundError.prototype.message = "ElementNotFoundError";