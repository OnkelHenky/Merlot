/**
 *  gamay.js is part of Merlot
 *  Copyright (c) by Alexander Henka, 15.09.14.
 *  Project URL: https://github.com/OnkelHenky/Merlot
 *
 * +--------------------------------------------------------------------------+
 * | LICENSE INFORMATION                                                      |
 * | ===================                                                      |
 * |                                                                          |
 * | Licensed under the Apache License, Version 2.0 (the "License");          |
 * | you may not use this file except in compliance with the License.         |
 * | You may obtain a copy of the License at                                  |
 * |                                                                          |
 * | http://www.apache.org/licenses/LICENSE-2.0                               |
 * |                                                                          |
 * | Unless required by applicable law or agreed to in writing, software      |
 * | distributed under the License is distributed on an "AS IS" BASIS,        |
 * | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 * | See the License for the specific language governing permissions and      |
 * | limitations under the License.                                           |
 * |                                                                          |
 * |  For more information see:                                               |
 * |  https://github.com/OnkelHenky/Merlot/blob/master/LICENSE.md             |
 * |                                                                          |
 * +--------------------------------------------------------------------------+
 */


/*
 * +---------------------------------------------------------------------------+
 * |                                GAMAY                                      |
 * |                           ================                                |
 * |                  Merlot´s sidekick on the client side                     |
 * +---------------------------------------------------------------------------+
 *
 * +---------------------------------------------------------------------------+
 * | From Wikipedia                                                            |
 * | ==============                                                            |
 * |                                                                           |
 * | GAMAY is a purple-colored grape variety used to make red wines,           |
 * | most notably grown in Beaujolais and in the Loire Valley around Tours.    |
 * | Its full name is Gamay Noir à Jus Blanc.                                  |
 * |                                                                           |
 * | It is a very old cultivar, mentioned as long ago as the 15th century.     |
 * | It has been often cultivated because it makes for abundant production;    |
 * | however, it can produce wines of distinction when planted on acidic soils,|
 * | which help to soften the grape's naturally high acidity.                  |
 * |                                                                           |
 * | Source: http://en.wikipedia.org/wiki/Gamay                                |
 * +---------------------------------------------------------------------------+
 */

(function () {

    /*Is the Gamay already loaded ?*/
    window.Gamay = window.Gamay || {};

    /*
     * +----------------------------+
     * | AccessibilityIssue Object  |
     * +----------------------------+
     */

    /**
     * @description
     * Object for wrapping accessibility errors
     * @param config
     * @constructor
     */
    var AccessibilityIssue = function (config) {

        this.type           = "";  // ERROR = 1, WARNING = 2, NOTICE = 3
        this.code           = "";  // String combination of violated WCAG2.0 rule, principle and technique
        this.wcagConf       = "";  // Violate WCAG2.0 conformation level: A, AA, AAA
        this.wcagPrinciple  = "";  // Violate WCAG2.0 principle: Principle1, Principle2, Principle3, Principle4
        this.wcagGuideline  = "";  // Violate WCAG2.0 guideline: e.g., Guideline1_1.1_1_1 etc.
        this.wcagTechnique  = "";  // Violate WCAG2.0 technique: e.g., H37, G73 or G74 et.
        this.msg            = "";  // Readable information of the accessibility issue
        this.nodeName       = "";  // Name of the HTML tag containing the issue
        this.className      = "";  // Value of the @class of the HTML element
        this.id             = "";  // Value of the @id of the HTML element
        this.element        = "";  // The HTML element itself

        if (config) {
            this.addConfiguration(config);
        }
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

   /*
    * +---------------------------------------------+
    * | Evaluation Function using HTML CodeSniffer  |
    * +---------------------------------------------+
    */

    window.Gamay.accessibilityEvaluationHTMLCS =  function(ruleset, html, domElement ,callback) {

        var _callback = function () {

            var _accessIssues = [], //Array with all found accessibility issues
                _messages = HTMLCS.getMessages();

            _messages.forEach(function(msg){
                var _typeName = 'UNKNOWN',
                    _color = '4px dotted';
                switch (msg.type) {
                    case HTMLCS.ERROR:
                        _typeName = 'ERROR';
                        _color += ' red';
                        break;
                    case HTMLCS.WARNING:
                        _typeName = 'WARNING';
                        _color += ' goldenRod';
                        break;
                    case HTMLCS.NOTICE:
                        _typeName = 'NOTICE';
                        _color += ' green';
                        break;
                    default:
                        _typeName = 'UNKNOWN';
                        _color += ' goldenRod';
                        break;
                } //end switch
                console.log("MSG");
                console.log(msg.element.id);
                console.log("ourline = "+_color);

                var _splittedCode = msg.code.split('.'),
                    wcagConf      = _splittedCode[0],
                    wcagGuideline = _splittedCode[1],
                    wcagPrinciple = _splittedCode[2]+'.'+ _splittedCode[3],
                    wcagTechnique = _splittedCode[4];

                var issue = new AccessibilityIssue({
                    type: _typeName,
                    code: msg.code,
                    wcagConf: wcagConf,
                    wcagGuideline: wcagGuideline,
                    wcagPrinciple: wcagPrinciple,
                    wcagTechnique: wcagTechnique,
                    msg: msg.msg,
                    nodeName: msg.element.nodeName.toLowerCase(),
                    className: msg.element.className,
                    id: msg.element.id,
                    element: msg.element
                });
                console.log('SELECTOR = '+domElement);
                //input[@type='radio' and @value='AmericanExpress']
                //$(type~="accordion"][value~="expand"]
              // var r = $("input[type=radio][value='AmericanExpress']");
                var r = $(domElement);
             //   $( ".inner" ).append( "<p>Test</p>" );
                r.parent().css("outline", _color);
                r.parent().append( "<p>"+msg.msg+"</p>" );
                console.log(msg.element.id);
                _accessIssues.push(issue);
            }); //End forEach
            callback(_accessIssues); //calling back Merlot (selenium)
        };
        HTMLCS.process(ruleset, html, _callback); // run the accessibility evaluation
    }; // End of function 'accessibilityEvaluationHTMLCS'

    $(document).ready(function () {
       console.log('Gamay has been loaded on the client');
    });

})();