/**
 * Created by Alexander Henka on 20.06.14.
 * Copyright by Alexander Henka
 */


var Criterion = require('./criterion').Criterion,
    VoidCriterion;

/**
 * @description
 * The LinkHasLinkText Criterion .
 */
VoidCriterion = exports.VoidCriterion = function() {

    /*Information*/
    this._type_    = "Criterion Object"; //Name of the object
    this.name = 'Void Criterion';

};

/**
 * @description
 * Get the core functionality from Criterion prototype
 * @type {Criterion}
 */
VoidCriterion.prototype = new Criterion;


/**
 * @description
 * This function should be overridden by any Criterion implementation.
 * @param webElement the web element to been investigated by this Criterion.
 * @param callback , the function that should be called after this Criterion has been checked.
 */
VoidCriterion.prototype.criterion = function(webElement,callback){
    console.log("Invoking '" +this.getName() + "' !");
    callback(webElement);
};