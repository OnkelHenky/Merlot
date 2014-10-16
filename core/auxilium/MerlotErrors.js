/**
 * Created by Alexander Henka on 04.08.14.
 * Copyright by Alexander Henka
 */


var MerlotError = require('./MerlotError').MerlotError,
    Merlot = require('./../Merlot').Merlot;

/*
 * The errors
 */
 var ElementNotFoundError,
     AbortEvaluationError;


module.exports.LOOP_ERROR         = "LoopError";
module.exports.ERROR_ISSUES_FOUND = "ErrorFound";
module.exports.ERROR_UNKNOWN      = "ErrorUnknown";


/**
 * @description
 * ELEMENT NOT FOUND
 * @type {ElementNotFoundError}
 */
module.exports.ElementNotFoundError =  ElementNotFoundError = function(msg) {

    this._type_  = "ElementNotFoundError";

    this.name    = "ElementNotFoundError";
    this.message = "ElementNotFoundError";

    if(msg){
        this.message = msg;
    }

};

/**
 *
 * @type {Error}
 */
ElementNotFoundError.prototype = new MerlotError();


/**
 *
 * @type {AbortEvaluationError}
 */
module.exports.AbortEvaluationError =  AbortEvaluationError = function(msg) {

    this._type_  = "AbortEvaluationError";

    this.name    = "AbortEvaluationError";
    this.message = "AbortEvaluationError";

    if(msg){
        this.message = msg;
    }

};

/**
 * @description
 * Print the reason for this abort error
 */
AbortEvaluationError.prototype.getReason = function(){
    return this.getMsg(); //from prototype

};

/**
 *
 * @type {Error}
 */
AbortEvaluationError.prototype = new MerlotError();