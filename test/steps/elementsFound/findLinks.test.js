/**
 * Created by Alexander Henka on 05.08.14.
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
describe('Links - test if the navigation techniques can navigate to "a" element', function(){

    before(function(){
        _browser = new TestMaster({
            'seleniumPath': require('path').join(__dirname, '../../../spielwiese/bin/selenium-server-standalone-2.42.0.jar'),
            'port' : '4444',
            'browser' : 'chrome'
        });
       // _url = "http://www.mi.hdm-stuttgart.de/mmb";
        _url = "file:///Users/Henka/Arbeit/Development/JavaScript/Projekte/Merlot/spielwiese/testProject/html5-boilerplate/index.html";
    });

    describe('Navigate to a element by "link text"', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'a',
                'searchAttribute': {
                    "name": 'text',
                    'value': "Hompage via link text"
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

    describe('Navigate to a element by @href', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'a',
                'searchAttribute': {
                    "name": 'href',
                    'value': "file:///Users/Henka/Arbeit/Development/JavaScript/Projekte/Merlot/spielwiese/testProject/html5-boilerplate/index.html"
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

    describe('Navigate to a element by @id', function(){

        before(function(){

            _domElement = new DOMElement({
                'tagName': 'a',
                'searchAttribute': {
                    "name": 'id',
                    'value': "homepagelink"
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