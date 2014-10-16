/**
 * Created by Alexander Henka on 30.06.14.
 * Copyright by Alexander Henka
 */


//TODO: Add methods to check if the DOMElement is of a certain type e.g., "DOMElement.is.a.Hyperlink()" => true/false

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
    this.name;
    //Additional information of the DOMElement e.g. type='button' for tag <input>
    this.type;

    /*
     *
     * {'name' : 'id', 'value': 'textfield123'}
     */
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
 * Check if the DOMElement is a hyperlink
 * @returns {boolean}
 */
DOMElement.prototype.isHyperLink = function () {
        return ('a' === this.getTagName());
    };

/**
 * Check if DOMElement is a selection tag 'drop down'
 * @returns {boolean}
 */
DOMElement.prototype.isSelection = function () {
    return (('select' === this.getTagName()));
};

/**
 * Check if element is button
 * @returns {boolean}
 */
DOMElement.prototype.isButton = function () {
    return (('input' === this.getTagName()) && ('button' === this.getType()));
};


DOMElement.prototype.isRadioButton = function () {
    return (('input' === this.getTagName()) && ('radio' === this.getType()));
};
/**
 * Check if the element is a radio button
 * @returns {boolean}
 */
DOMElement.prototype.isRadioButtonInGroup = function (group) {
    //TODO: Typecheck, to assure that 'group' is a string.
    return (('input' === this.getTagName()) && ('radio' === this.getType()) && (this.getNameAttribute() === group));
};

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
 * Get the name attribute of the element
 * @returns {*}
 */
DOMElement.prototype.getNameAttribute = function () {
    return (this.name) ? this.name: undefined;
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
 * Get the type expression of this DOMElement
 * @returns {string}
 */
DOMElement.prototype.getTypeExpression = function () {
    //div[@id='..' and @class='...],  Property[text()='fail']
    var xpathExpression = "//" + this.getTagName()+"[";

    if(this.getType()) {
        xpathExpression += "@type='" + this.getType() + "' and ";
    }
    if('textNode' === this.getSearchAttributeName()){
       return xpathExpression += "text()='"+ this.getSearchAttributeValue() +"']";
       // return "//"+this.getTagName()+"[@"+this.getSearchAttributeName()+"='"+this.getSearchAttributeValue()+"']";
    }

    xpathExpression += "@" + this.getSearchAttributeName() + "='" + this.getSearchAttributeValue() + "']";

    return xpathExpression;
};

/*
 input[type=radio][value='AmericanExpress']
 */
//TODO: Check the robustness of the function(!)
/**
 * @description
 * Get a basic CSS selector that represents this element
 * @returns {string} , a basic CSS selector
 */
DOMElement.prototype.getCSSSelector = function () {

    if('textNode' === this.getSearchAttributeName()){
        return this.getTagName()+":containsExactCase("+this.getSearchAttributeValue() +")";
    }else{
        return this.getTagName()+"["+ this.getSearchAttributeName() + "='" + this.getSearchAttributeValue()+ "']";
    }

    /*
    if('textNode' === this.getSearchAttributeName()){
        return this.getTagName()+":contains("+this.getSearchAttributeValue() +")";
    }else{
        return this.getTagName()+"["+ this.getSearchAttributeName() + "='" + this.getSearchAttributeValue()+ "']";
    }*/
};

/**
 * A string representation of this object
 * @override
 * @returns {string}
 */
DOMElement.prototype.toString = function () {
    return  this.getTagName() + " where "+ this.getSearchAttributeName()+ " = " + this.getSearchAttributeValue();
};