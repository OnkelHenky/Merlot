/**
 * Created by Alexander Henka on 30.06.14.
 * Copyright by Alexander Henka
 */

var DOMElement,
    Merlot = require('./Merlot').Merlot;

/**
 *
 * @type {DOMElement}
 */
DOMElement = exports.DOMElement =  function(properties) {

    /*Information*/
    this._type_    = "DOMElement Object"; //Name of the object

    /*Properties*/
    this.tagName                        = "";

    // {'attributeName' : 'id', 'value': 'textfield123'}
    this.searchAttribute                = {};
    this.searchAttribute.value          = "";
    this.searchAttribute.attributeName  = "";

    if(properties){
        this.addProperties(properties);
    }

};

/**
 *
 * @type {Merlot}
 */
DOMElement.prototype = new Merlot;

/**
 * @description
 * Set the properties of a new DOMElement
 * @param properties
 */
DOMElement.prototype.addProperties = function (properties) {
    var that = this;

    Object.keys(properties).forEach(function (key) {
        that[key] = properties[key];
    });

};

/**
 *
 * @returns {string}
 */
DOMElement.prototype.getTagName = function () {
    return (this.tagName) ? this.tagName: undefined;
};

/**
 *
 * @returns {{}|*}
 */
DOMElement.prototype.getSearchAttribute = function () {
    return (this.searchAttribute) ? this.searchAttribute: undefined;
};

/**
 *
 * @returns {_domElement.searchAttribute.attributeName|*|string}
 */
DOMElement.prototype.getSearchAttributeName = function () {
    return (this.searchAttribute.attributeName) ? this.searchAttribute.attributeName: undefined;
};

/**
 *
 * @returns {_domElement.searchAttribute.value|*|string|Number|number}
 */
DOMElement.prototype.getSearchAttributeValue = function () {
   return (this.searchAttribute.value) ? this.searchAttribute.value: undefined;
};

/**
 *
 * @returns {string}
 */
DOMElement.prototype.getCSSSelector = function () {
  return this.getTagName()+"["+ this.getSearchAttributeName() + "='" + this.getSearchAttributeValue()+ "']";
};