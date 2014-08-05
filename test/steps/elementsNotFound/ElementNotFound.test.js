/**
 * Created by Alexander Henka on 04.08.14.
 * Copyright by Alexander Henka
 */


var TestMaster = require('../../TEST_Master'),
    DOMElement = require('../../../core/auxilium/DOMElement'),
    PacNavTechnique = require('../../../core/techniques/pacNavigationTechnique').pacNavigationTechnique;
TabNavTechnique = require('../../../core/techniques/tabNavigationTechnique');
CSSNavTechnique = require('../../../core/techniques/pacNavigationTechnique').pacCSSSelectorNavigationTechnique

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
describe('Test if the promises are all rejected if not element can be found', function() {

    before(function () {
        _browser = new TestMaster({
            'seleniumPath': require('path').join(__dirname, '../../../spielwiese/bin/selenium-server-standalone-2.42.0.jar'),
            'port': '4444',
            'browser': 'chrome'
        });
        _url = "http://www.hdm-stuttgart.de/";


    });

    describe('Element not Found and @id', function () {

        before(function () {
            _domElement = new DOMElement({
                'tagName': 'a',
                'searchAttribute': {
                    "name": 'id',
                    'value': "123abc"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using TAB', function () {
            it('It is expected the promise to be rejected', function () {
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.rejectedWith('ElementNotFoundError');
            })
        });

        describe('Using PACd', function () {
            it('It is expected the promise to be rejected', function () {
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.rejectedWith('ElementNotFoundError');
            })
        });



    });

    describe('Element not Found and @href', function () {

        before(function () {
            _domElement = new DOMElement({
                'tagName': 'a',
                'searchAttribute': {
                    "name": 'href',
                    'value': "123abc"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using TAB', function () {
            it('It is expected the promise to be rejected', function () {
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.rejectedWith('ElementNotFoundError');
            })
        });

        describe('Using PACd', function () {
            it('It is expected the promise to be rejected', function () {
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.rejectedWith('ElementNotFoundError');
            })
        });



    });

    describe('Element not Found and @name', function () {

        before(function () {
            _domElement = new DOMElement({
                'tagName': 'a',
                'searchAttribute': {
                    "name": 'name',
                    'value': "123abc"
                }
            });
        });


        beforeEach(function () {
            _browser.driver.get(_url);
        });

        describe('Using TAB', function () {
            it('It is expected the promise to be rejected', function () {
                return expect(TabNavTechnique.call(_browser, _domElement)).to.be.rejectedWith('ElementNotFoundError');
            })
        });

        describe('Using PACd', function () {
            it('It is expected the promise to be rejected', function () {
                return expect(PacNavTechnique.call(_browser, _domElement)).to.be.rejectedWith('ElementNotFoundError');
            })
        });



    });

});