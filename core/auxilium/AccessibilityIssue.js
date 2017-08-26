

var Merlot = require('../Merlot').Merlot,
    Logger = require('./../auxilium/logger').Logger,
    Actor;

/**
 * @description
 * Object for wrapping accessibility errors
 * @param config
 * @constructor
 */
exports.AccessibilityIssue = AccessibilityIssue  = function (config) {

    this.type           = "";  // ERROR = 1, WARNING = 2, NOTICE = 3
    this.typeCode       = "";  // Numeric representation for ERROR = 1, WARNING = 2, NOTICE = 3
    this.code           = "";  // String combination of the violated WCAG2.0 rule, the principle and the MerlotErrostechnique
    this.wcagConf       = "";  // Violated WCAG2.0 conformation level: A, AA, AAA
    this.wcagPrinciple  = "";  // Violated WCAG2.0 principle: Principle1, Principle2, Principle3, Principle4
    this.wcagGuideline  = "";  // Violated WCAG2.0 guideline: e.g., Guideline1_1.1_1_1 etc.
    this.wcagTechnique  = "";  // Violated WCAG2.0 technique: e.g., H37, G73 or G74 etc.
    this.msg            = "";  // Readable information of the accessibility issue
    this.nodeName       = "";  // Name of the analyzed HTML element
    this.className      = "";  // @class value of the analyzed HTML element
    this.id             = "";  // @id value of the analyzed HTML element
    this.element        = "";  // Reference to the analyzed HTML element

    if (config) {
        this.addConfiguration(config);
    }
};

AccessibilityIssue.prototype = new Merlot;

/**
 * @description
 * Lookup table to translate the number of a principle, which is provided by HTMLCS,
 * into its name.
 * @type {{1: string, 2: string, 3: string, 4: string}}
 */
AccessibilityIssue.prototype.WCAGPrincipleTranslation = {
    "1" : "Perceivable",
    "2" : "Operable",
    "3" : "Understandable",
    "4" : "Robust"
};

/**
 * @description
 * Adding properties to the error object
 * @param config
 */
AccessibilityIssue.prototype.addConfiguration = function (config) {
    var that = this;
    Object.keys(config).forEach(function (key) {
        that[key] = config[key];
    });
};

/**
 * @description
 * Simple string representation of the AccessibilityIssue object
 * @override object.toString()
 * @returns {string} the string representation of this object
 */
AccessibilityIssue.prototype.toString = function () {
    return this.typeName + '|' + this.code + '|' + this.msg + '|' + this.nodeName + '|' + this.className + '|' + this.id;
};

/**
 * @description
 * Output the issues in an formatted way.
 * @returns {object} the formatted issues
 */
AccessibilityIssue.prototype.getFormattedRepresentation = function(){

    /* Principle format -> Principle1 */
    //  var _splitPrinciple = this.wcagPrinciple.split("Principle");
    var _formattedPrinciple =   this.wcagPrinciple.split("Principle").join("Principle ")+ " - "+ this.WCAGPrincipleTranslation[this.wcagPrinciple.split("Principle")[1]]; // + _splitPrinciple[1];
    console.log('_formattedPrinciple = ' +_formattedPrinciple);

    this.wcagPrinciple = _formattedPrinciple;

    /* Guideline format -> Guideline1_1.1_1_1 */
    var _splitGuidleline = this.wcagGuideline.split("."); // Result after this step: [Guideline1_1, 1_1_1]
    var _guidlineFirstPart =  _splitGuidleline[0].split("Guideline"); // Result after this step: [Guideline,1_1]
    var _guidlineNumberPart =  _guidlineFirstPart[1].split("_").join("."); // Result after this step: [1,1] -> after join "1.1"

    var _formattedGuidline =  "Guideline " + _guidlineNumberPart; // Result after this step: "Guideline 1.1"
    _formattedGuidline += " Success Criterion "+ _splitGuidleline[1].split("_").join(".");

    this.wcagGuideline = _formattedGuidline;


};