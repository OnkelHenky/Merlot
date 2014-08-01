/**
 * Created by Alexander Henka on 01.08.14.
 * Copyright by Alexander Henka
 */

var assert = require('assert');


var DOMElement = require('../../core/auxilium/DOMElement');


var compareObject = function(){

    /*Information*/
    this._type_                 = "DOMElement Object"; //Name of the object

    /*Properties*/
    this.tagName                = "input";

    // {'name' : 'id', 'value': 'textfield123'}
    this.searchAttribute        = {};
    this.searchAttribute.name   = "id";
    this.searchAttribute.value  = "suchbegriff";

};

/**
 * @description
 * Set the properties of a new DOMElement
 * @param properties
 */
compareObject.prototype.addProperties = function (properties) {
    var that = this;

    Object.keys(properties).forEach(function (key) {
        that[key] = properties[key];
    });

};

var comp, domElement;
/*
 * The Tests
 */
describe('DOM_Element', function(){

    before(function(){
         comp = new compareObject();

         domElement = new DOMElement( {
            'tagName': 'input',
            'searchAttribute': {
                "name": 'id',
                'value': "suchbegriff"
            }
        });
    });

    describe('Create_DOM_Element', function(){
        it('A new instance of DOMElement should be created', function(){
            assert.deepEqual(domElement, comp ,"Create DOMElement");
        })
    });
    describe('Get the tage name of a DOMElement', function(){
        it('The function: "getTagName()" of the should return "input"', function(){
            assert.equal(domElement.getTagName(), "input" ,"get tag name");
        })
    });
    describe('Get the searchAttribute of a DOMElement', function(){
        it('The function: "getSearchAttribute()" of the should return the searchAttribute Object', function(){
            assert.deepEqual(domElement.getSearchAttribute(), {
                "name": 'id',
                'value': "suchbegriff"
            }  ,"get tag name");
        })
    });
    describe('Get the getSearchAttributeName of a DOMElement', function(){
        it('The function: "getSearchAttributeName()" of the should return "id"', function(){
            assert.equal(domElement.getSearchAttributeName(), "id" ,"get tag name");
        })
    });
    describe('Get the getSearchAttributeValue of a DOMElement', function(){
        it('The function: "getSearchAttributeValue()" of the should return "suchbegriff"', function(){
            assert.equal(domElement.getSearchAttributeValue(), "suchbegriff" ,"get tag name");
        })
    });
});