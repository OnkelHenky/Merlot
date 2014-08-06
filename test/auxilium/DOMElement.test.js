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
    this.type                   = "";

    // {'name' : 'id', 'value': 'textfield123'}
    this.searchAttribute        = {};
    this.searchAttribute.name   = "id";
    this.searchAttribute.value  = "suchbegriff";

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
            }  ,"get search attribute");
        })
    });
    describe('Get the getSearchAttributeName of a DOMElement', function(){
        it('The function: "getSearchAttributeName()" of the should return "id"', function(){
            assert.equal(domElement.getSearchAttributeName(), "id" ,"get search attribute name");
        })
    });
    describe('Get the getSearchAttributeValue of a DOMElement', function(){
        it('The function: "getSearchAttributeValue()" of the should return "suchbegriff"', function(){
            assert.equal(domElement.getSearchAttributeValue(), "suchbegriff" ,"get search attribute value");
        })
    });
});