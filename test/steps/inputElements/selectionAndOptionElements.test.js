/**
 * Created by Alexander Henka on 19.08.14.
 * Copyright by Alexander Henka
 */


var TestMaster = require('../../TEST_Master'),
    DOMElement = require('../../../core/auxilium/DOMElement'),
    PacNavTechnique = require('../../../core/techniques/pacNavigationTechnique').pacNavigationTechnique;
TabNavTechnique = require('../../../core/techniques/tabNavigationTechnique');
CSSNavTechnique = require('../../../core/techniques/pacNavigationTechnique').pacCSSSelectorNavigationTechnique;

var keyboardSelectOption =  require('../../../core/techniques/keyboardInteractionTechnique').keyboardcSelectOption;
var pacSelectOption =  require('../../../core/techniques/pacNavigationTechnique').pacSelectOption;

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

    after(function() {
        _browser.closeDriver();
    });

    describe('Navigate to a "select" element with @id="drinks"', function(){

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

/*
 * The Tests
 */
describe('"SELECT" Test if the navigation techniques can navigate to "select" elements AND choose a OPTION', function(){

    var _SELECTdomElement, _SELECTOptionElement;

    before(function(){
        _browser = new TestMaster({
            'seleniumPath': require('path').join(__dirname, '../../../spielwiese/bin/selenium-server-standalone-2.42.0.jar'),
            'port' : '4444',
            'browser' : 'chrome'
        });
        // _url = "http://www.mi.hdm-stuttgart.de/mmb";
        _url = "file:///Users/Henka/Arbeit/Development/JavaScript/Projekte/Merlot/spielwiese/testProject/html5-boilerplate/index.html";

    });

    after(function() {
        _browser.closeDriver();
    });

    describe('Navigate to a "select" element with @id="drinks" and choose "wine"', function(){

        before(function(){

             _SELECTdomElement = new DOMElement({
                 'tagName': 'select',
                 'searchAttribute': {
                     "name": 'id',
                     'value': "drinks"
                 }
            });

             _SELECTOptionElement =  new DOMElement({
                'tagName' : "option",
                'searchAttribute' : {
                    "name":  "textNode",
                    'value': "Wine"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });


        describe('Using PAC', function(){
            it('It is expected that the promise is fulfilled', function(){
              return expect(PacNavTechnique.call(_browser, _SELECTdomElement).
                    then(function chooseOption(selection) {
                        return  pacSelectOption.call(_browser,selection,_SELECTOptionElement);
                    })).to.be.fulfilled;

            })
        });
        describe('Using TAB', function(){
            it('It is expected that the promise is fulfilled', function() {
                return expect(TabNavTechnique.call(_browser, _SELECTdomElement).
                    then(function chooseOption(selection) {
                        return  keyboardSelectOption.call(_browser, selection, _SELECTOptionElement);
                    })).to.be.fulfilled;

            })
        });

    });


});