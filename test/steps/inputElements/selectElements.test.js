/**
 * Created by Alexander Henka on 11.08.14.
 * Copyright by Alexander Henka
 */





var TestMaster = require('../../TEST_Master'),
    DOMElement = require('../../../core/auxilium/DOMElement'),
    PacNavTechnique = require('../../../core/techniques/pacNavigationTechnique').pacNavigationTechnique;
TabNavTechnique = require('../../../core/techniques/tabNavigationTechnique');
CSSNavTechnique = require('../../../core/techniques/pacNavigationTechnique').pacCSSSelectorNavigationTechnique;

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
describe('"SELECT" Test if the navigation techniques can navigate to "select" elements', function(){

    before(function(){
        _browser = new TestMaster({
            'seleniumPath': require('path').join(__dirname, '../../../spielwiese/bin/selenium-server-standalone-2.42.0.jar'),
            'port' : '4444',
            'browser' : 'chrome'
        });
        // _url = "http://www.mi.hdm-stuttgart.de/mmb";
        _url = "file:///Users/Henka/Arbeit/Development/JavaScript/Projekte/Merlot/spielwiese/testProject/html5-boilerplate/index.html";

    });

    describe('Navigate to a "input" element with type="checkbox" by "@id"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'input',
                "type" : 'checkbox',
                'searchAttribute': {
                    "name": 'id',
                    'value': "cb1"
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


    describe('Navigate to a "input" element with type="checkbox" by "@value" = "mushrooms"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'input',
                "type" : 'checkbox',
                'searchAttribute': {
                    "name": 'value',
                    'value': "mushrooms"
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

    describe('Navigate to a "input" element with type="checkbox" by "@value" = "gpeppers"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'input',
                "type" : 'checkbox',
                'searchAttribute': {
                    "name": 'value',
                    'value': "gpeppers"
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

    describe('Navigate to a "input" element with type="radio" by "@id" = "visa"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'input',
                'type' : 'radio',
                'name' : 'paymentmethod',
                'searchAttribute': {
                    "name": 'id',
                    'value': "visa"
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

    describe('Navigate to a "input" element with type="radio" by "@value" = "AmericanExpress"', function(){

        before(function(){

            /*
             'tagName' : _tagName,
             'name' : _radiogroupName,
             'type' : _type,
             'searchAttribute' : {
             "name":  _identifiedBy,
             'value': value
             }
             */
            _domElement = new DOMElement({
                'tagName': 'input',
                'type' : 'radio',
                'name' : 'paymentmethod',
                'searchAttribute': {
                    "name": 'value',
                    'value': "AmericanExpress"
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

    describe('Navigate to a "select" element with by "@id" = "drinks"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'select',
                'searchAttribute': {
                    "name": 'id',
                    'value': "drinks"
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