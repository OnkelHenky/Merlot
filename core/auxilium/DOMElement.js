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
module.exports = DOMElement =  function(properties) {

    /*Information*/
    //Type of this object
    this._type_                 = "DOMElement Object"; //Name of the object

    /*Properties*/
    //Tag name of this element
    this.tagName                = "";
    //Additional information of the DOMElement e.g. type='button' for tag <input>
    this.type                   = "";

    /*
     *
     * {'name' : 'id', 'value': 'textfield123'}
     */
    this.searchAttribute        = {};
    this.searchAttribute.name   = "";
    this.searchAttribute.value  = "";

    this.validTagNames = {
       'a' : true,
       'abbr' : true,
       'address' : true,
       'area' : true,
       'article' : true,
       'aside' : true,
       'audio' : true,

       'b' : true,
       'base' : true,
       'bdo' : true,
       'bdi' : true,
       'blockquote' : true,
       'body' : true,
       'br' : true,
       'button' : true,

       'canvas' : true,
       'caption' : true,
       'cite' : true,
       'code' : true,
       'col' : true,
       'colgroup' : true,

       'data' : true,
       'datalist' : true,
       'dd' : true,
       'del' : true,
       'detail' : true,
       'dialog' : true,
       'div' : true,
       'dl' : true,
       'dt' : true,

       'em' : true,
       'embed' : true,

       'fieldset' : true,
       'figcaption' : true,
       'figure' : true,
       'footer' : true,
       'form' : true,

       'h1' : true,
       'h2' : true,
       'h3' : true,
       'h4' : true,
       'h5' : true,
       'h6' : true,
       'header' : true,
       'hgroup' : true,
       'hr' : true,
       'html' : true,

       'i' : true,
       'iframe' : true,
       'img' : true,
       'input' : true,
       'ins' : true,

       'kbd' : true,
       'keygen' : true,

       'label' : true,
       'legend' : true,
       'li' : true,
       'link' : true,

       'main' : true,
       'map' : true,
       'mark' : true,
       'menu' : true,
       'menuitem' : true,
       'meta' : true,
       'meter' : true,

       'nav' : true,
       'noscript' : true,

       'object' : true,
       'ol' : true,
       'optgroup' : true,
       'option' : true,
       'output' : true,

       'p' : true,
       'param' : true,
       'pre' : true,
       'progress' : true,

       'q' : true,

       'rb' : true,
       'rp' : true,
       'rt' : true,
       'rtc' : true,
       'ruby' : true,

       's' : true,
       'samp' : true,
       'script' : true,
       'section' : true,
       'select' : true,
       'small' : true,
       'source' : true,
       'span' : true,
       'strong' : true,
       'style' : true,
       'sub' : true,
       'summary' : true,

       'table' : true,
       'tbody' : true,
       'td' : true,
       'template' : true,
       'textarea' : true,
       'tfoot' : true,
       'th' : true,
       'thead' : true,
       'time' : true,
       'title' : true,
       'tr' : true,
       'track' : true,

       'u' : true,
       'ul' : true,

       'var' : true,
       'video' : true,
       'wbr' : true
   };

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
 *
 * @returns {string|undefined}
 */
DOMElement.prototype.getType = function () {
    return this.type || undefined;
};

/**
 * @description
 * Get a basic CSS selector, that represents this element
 * @returns {string} , a basic CSS selector
 */
DOMElement.prototype.getCSSSelector = function () {
  return this.getTagName()+"["+ this.getSearchAttributeName() + "='" + this.getSearchAttributeValue()+ "']";
};

/**
 * Check if the current DOMElement hast an valid tag name.
 * @returns {boolean}
 */
DOMElement.prototype.hasValidTagName = function () {
    return this.validTagNames.hasOwnProperty(this.getTagName());
};

/**
 * A string representation of this object
 * @override
 * @returns {string}
 */
DOMElement.prototype.toString = function () {
    return  " Tag name = " + this.getTagName() + " where "+ this.getSearchAttributeName()+ " = " + this.getSearchAttributeValue();
};