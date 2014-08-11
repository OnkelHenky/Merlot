/**
 * Created by Alexander Henka on 01.08.14.
 * Copyright by Alexander Henka
 *
 * !Test file for finding and interacting with text fields!
 */


var TestMaster = require('../TEST_Master'),
    DOMElement = require('../../core/auxilium/DOMElement'),
    PacNavTechnique = require('../../core/techniques/pacNavigationTechnique').pacNavigationTechnique;
    TabNavTechnique = require('../../core/techniques/tabNavigationTechnique');
    CSSNavTechnique = require('../../core/techniques/pacNavigationTechnique').pacCSSSelectorNavigationTechnique;

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised"),

    assert = chai.assert,
    should = chai.should(),
    expect = chai.expect;


chai.use(chaiAsPromised);

var _browser,
    _url,
    _domElement;

/*
* The Tests
*/
describe('"BUTTON" Test if the navigation techniques can navigate to a "button/input" element', function(){

    before(function(){
         _browser = new TestMaster({
            'seleniumPath': require('path').join(__dirname, '../../spielwiese/bin/selenium-server-standalone-2.42.0.jar'),
            'port' : '4444',
            'browser' : 'chrome'
        });
        // _url = "http://www.mi.hdm-stuttgart.de/mmb";
        _url = "file:///Users/Henka/Arbeit/Development/JavaScript/Projekte/Merlot/spielwiese/testProject/html5-boilerplate/index.html";

    });

    describe('Navigate to a "button" element by "@id"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'input',
                'searchAttribute': {
                    "type" : 'button',
                    "name": 'id',
                    'value': "1stbutton"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using PAC', function(){
            it('It is expected that the promise is fulfilled', function(){
              return expect(PacNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
          })
        });
        describe('Using CSS Selector', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(CSSNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using TAB', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });

    });



    describe('Navigate to a "button" element by "@name"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'input',
                'searchAttribute': {
                    "type": 'button',
                    "name": 'name',
                    'value': "1stbuttonName"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using PAC', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using CSS Selector', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(CSSNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using TAB', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });

    });

    describe('Navigate to a "button" element by its "@value"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'input',
                'searchAttribute': {
                    "type": 'button',
                    "name": 'value',
                    'value': "input_type_button"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using PAC', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using CSS Selector', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(CSSNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using TAB', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });

    });


    describe('Navigate to a "button" with type= "submit "element by "@id"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'input',
                'searchAttribute': {
                    "type" : 'submit',
                    "name": 'id',
                    'value': "submit"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using PAC', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using CSS Selector', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(CSSNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using TAB', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });

    });

    describe('Navigate to a "button" with type= "submit "element by "@name"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'input',
                'searchAttribute': {
                    "type" : 'submit',
                    "name": 'name',
                    'value': "submitbutton"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using PAC', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using CSS Selector', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(CSSNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using TAB', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });

    });


    describe('Navigate to a "button" with type= "submit "element by "@value"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'input',
                'searchAttribute': {
                    "type" : 'submit',
                    "name": 'value',
                    'value': "input_type_sumbit"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using PAC', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using CSS Selector', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(CSSNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using TAB', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });

    });


    describe('Navigate to a "button" ELEMENT with "element by "@id"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'button',
                'searchAttribute': {
                    "name": 'id',
                    'value': "2ndbutton"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using PAC', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using CSS Selector', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(CSSNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using TAB', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });

    });

    describe('Navigate to a "button" ELEMENT element by "@name"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'button',
                'searchAttribute': {
                    "name": 'name',
                    'value': "2ndbutton"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using PAC', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using CSS Selector', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(CSSNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using TAB', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });

    });


    describe('Navigate to a "button" ELEMENT element by "@value"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'button',
                'searchAttribute': {
                    "name": 'textNode',
                    'value': "element button"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using PAC', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using CSS Selector', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(CSSNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });
        describe('Using TAB', function(){
            it('It is expected that the promise is fulfilled', function(){
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
            })
        });

    });
});