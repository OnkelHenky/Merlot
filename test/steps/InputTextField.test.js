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
    CSSNavTechnique = require('../../core/techniques/pacNavigationTechnique').pacCSSSelectorNavigationTechnique

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

        _browser.driver.get(_url)
            .then(function () {
               return PacNavTechnique.call(_browser,_domElement).should.be.fulfilled;
            })
            .then(function (element) {
                Asserts({
                    findInputField: function () {
                        Assert.equal(2, 2);
                    }

                });
            });
*/
      // Assert.equal("something", "something", "optional message");


/*
* The Tests
*/
describe('Test if the navigation techniques can navigate to a element', function(){

    before(function(){
         _browser = new TestMaster({
            'seleniumPath': require('path').join(__dirname, '../../spielwiese/bin/selenium-server-standalone-2.42.0.jar'),
            'port' : '4444',
            'browser' : 'chrome'
        });
        _url = "http://www.hdm-stuttgart.de/";

        _domElement = new DOMElement({
            'tagName': 'input',
            'searchAttribute': {
                "name": 'id',
                'value': "suchbegriff"
            }
        });
    });

    beforeEach(function () {
        _browser.driver.get(_url);
    });

    describe('Using PAC', function(){
        it('Should fulfill the promise', function(){
          return expect(PacNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
      })
    });
    describe('Using CSS Selector', function(){
        it('Should fulfill the promise', function(){
            return expect(CSSNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
        })
    });
    describe('Using TAB', function(){
        it('Should fulfill the promise', function(){
            return expect(TabNavTechnique.call(_browser, _domElement)).to.be.fulfilled;
        })
    });

});