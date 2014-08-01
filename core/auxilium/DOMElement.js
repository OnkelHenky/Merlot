/**
 * Created by Alexander Henka on 30.06.14.
 * Copyright by Alexander Henka
 */

var DOMElement,
    Merlot = require('./../Merlot').Merlot;

/**
 * @description
 * A representation of an HTML element - aka: WebElement or DOMElement
 * @type {DOMElement}
 */
exports.DOMElement = DOMElement =  function(properties) {

    /*Information*/
    this._type_                 = "DOMElement Object"; //Name of the object

    /*Properties*/
    this.tagName                = "";

    // {'name' : 'id', 'value': 'textfield123'}
    this.searchAttribute        = {};
    this.searchAttribute.name   = "";
    this.searchAttribute.value  = "";

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
 * @returns {domElement.searchAttribute.name|*|string}
 */
DOMElement.prototype.getSearchAttributeName = function () {
    return (this.searchAttribute.name) ? this.searchAttribute.name: undefined;
};

/**
 *
 * @returns {domElement.searchAttribute.value|*|string|Number|number}
 */
DOMElement.prototype.getSearchAttributeValue = function () {
   return (this.searchAttribute.value) ? this.searchAttribute.value: undefined;
};

/**
 * @description
 * Get a basic CSS selector, that represents this element
 * @returns {string} , a basic CSS selector
 */
DOMElement.prototype.getCSSSelector = function () {
  return this.getTagName()+"["+ this.getSearchAttributeName() + "='" + this.getSearchAttributeValue()+ "']";
};