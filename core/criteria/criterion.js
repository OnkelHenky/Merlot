/**
 * Created by Henka on 20.06.14.
 *
 * TODO: Using grunt ?!
 *
 */


var Merlot = require('../Merlot').Merlot,
    Criterion;

/**
 * @description
 * The Criterion prototype.
 */
Criterion = exports.Criterion = function() {

    /*Information*/
    this._type_    = "Criterion Object"; //Name of the object
    this.name = 'Prototype Criterion';


    this.webElement; /* reference to the webElement*/
    this.next;  /* the reference to the next Criterion.*/

};

/**
 * @description
 * Get the core functionality
 * @type {Merlot}
 */
Criterion.prototype = new Merlot;

/**
 * @description
 * Get the name of this Criterion.
 * @returns {string}, the name of this Criterion.
 */
Criterion.prototype.getName = function () {
    return this.name;
};

/**
 * @description
 * The run function, defined here for any Criterion.
 * @param webElement the web element to been investigated by this Criterion.
 * @param callback , the function that should be called after this Criterion has been checked.
 */
Criterion.prototype.checkCriterion = function(webElement,callback){
    var that = this;

    that.criterion(webElement,function(webEle){
        if (that.next === undefined){
            callback(webEle);
        }else{
          that.next.checkCriterion(webEle,callback);
        }
    });

};

/**
 * @description
 * This function should be overridden by any Criterion implementation.
 * @param webElement the web element to been investigated by this Criterion.
 * @param callback , the function that should be called after this Criterion has been checked.
 */
Criterion.prototype.criterion = function(webElement,callback){
    console.log("checkCriterion is not implemented for: '" +this.getName() + "' !");
    callback(webElement);
};