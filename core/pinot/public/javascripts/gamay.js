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

    window.Gamay = window.Gamay || {};  // Is the Gamay already loaded?

   /*
    * +----------------------------------------------------------+
    * | Applying Gamay specific functions to all jQuery objects  |
    * +----------------------------------------------------------+
    */
    function _apply_Gamay_jQueryExtensions(){

        /**
         * @description
         * Adding additional selector functions, to match elements with a specific text (node)
         * Credit to 'Mottie', source: https://gist.github.com/Mottie/461488
         */
        jQuery.extend( $.expr[":"], {
            containsExact: $.expr.createPseudo ?  // case insensitive
                $.expr.createPseudo(function(text) {
                    return function(elem) {
                        return $.trim(elem.innerHTML.toLowerCase()) === text.toLowerCase();
                    };
                }) :
                // support: jQuery <1.8
                function(elem, i, match) {
                    return $.trim(elem.innerHTML.toLowerCase()) === match[3].toLowerCase();
                },

            containsExactCase: $.expr.createPseudo ?   // case sensitive
                $.expr.createPseudo(function(text) {
                    return function(elem) {
                        return $.trim(elem.innerHTML) === text;
                    };
                }) :
                // support: jQuery <1.8
                function(elem, i, match) {
                    return $.trim(elem.innerHTML) === match[3];
                },

            containsRegex: $.expr.createPseudo ?
                $.expr.createPseudo(function(text) {
                    var reg = /^\/((?:\\\/|[^\/]) )\/([mig]{0,3})$/.exec(text);
                    return function(elem) {
                        return RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML));
                    };
                }) :
                // support: jQuery <1.8
                function(elem, i, match) {
                    var reg = /^\/((?:\\\/|[^\/]) )\/([mig]{0,3})$/.exec(match[3]);
                    return RegExp(reg[1], reg[2]).test($.trim(elem.innerHTML));
                }

        });

        /**
         * @description
         * Get the tag name of an HTML element.
         * @returns {string} the tag name in lower case
         */
        jQuery.fn.Gamay_GetTagName = function() {
            return this.prop("tagName").toLowerCase();
        };

       /**
        * @description
        * Check if an HTML element is direct child of 'html', 'body' or 'head'.
        * This function returns true if the criteria is correct, and false otherwise.
        * @returns {boolean}
        */
        jQuery.fn.Gamay_isElementChildOfBiggerContent = function() {
            var _parentTagName = this.parent().Gamay_GetTagName();
            return ["html","body","head"].indexOf(_parentTagName) !== -1;
        };

        /**
         * @description
         * Get the HTML environment of a element
         * @example
         * Given this html code:
         *
         * <header id="pageheader">
         *      <h1>some heading</h1>
         *      <img id="imageID" src="./img/someimage.jpg">
         *
         * </header>
         *
         * If the element is the image element with @id = "imageID"
         * The HTML environment snapshot would be the parent element (header tag),
         * containing this image.
         *
         * If it is a direct child of 'html', 'body' or 'head',
         * the element and it innerHTML is returned.
         *
         * @returns {*} the html environment
         */
        jQuery.fn.Gamay_GetEnvironmentSnapshot = function() {
            if(this.Gamay_isElementChildOfBiggerContent()){
              return this.html(); //the element + its 'innerHTML'
            }else{
              return this.parent().html(); //the parent of the element + the parents 'innerHTML'
            }
        };
    }

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
    * +--------------------------------------+
    * | Flags to indicated that we           |
    * | have an error on a specific element  |
    * +--------------------------------------+
    *
    *  If we haven an error on HTML element, than this error
    *  should be visible on the web page, regardless
    *  of any potential warning or notice.
    *
    *  If we have an warning (and no error)for an specific element,
    *  then this waring should be visible, regardless
    *  of any notice
    *
    *  The hierarchy is as follows:
    *
    *  Error > Warning > Notice > No Error
    *
    */
    window.Gamay._onlyOneError   = false;
    window.Gamay._onlyOneWarning = false;


   /*
    * +--------------------------------------+
    * |           The outline style          |
    * +--------------------------------------+
    *
    * The color and the style of the the outline.
    * This style is used when marking any errors or issues
    *  on a web page.
    *
    */
    window.Gamay._OUTLINE_STYLE         = '5px dotted';

   /*
    * The outline colors
    */
    window.Gamay._ERROR_OUTLINE_COLOR    = ' #FE0001';
    window.Gamay._NOTICE_OUTLINE_COLOR   = ' blue';
    window.Gamay._WARNING_OUTLINE_COLOR  = ' goldenRod';




   /*
    * +--------------------------------------+
    * | Attache tool tip explanation for     |
    * | accessibility issues                 |
    * +--------------------------------------+
    */
    window.Gamay.outlineIssuedTooltip = function(element, msgs){
        var _tooltip = "";

        msgs.forEach(function (msg) {_tooltip += msg;});

        element.parent().tooltipster({
            content: $(_tooltip),
            theme: 'merlotIssuesStyle',
            contentAsHTML : true,
            interactive: true,
            animation: 'grow',
            delay: 100
        });
    };


   /*
    * +---------------------------------+
    * |   Get the text for the pop up   |
    * +---------------------------------+
    */
    window.Gamay.getIssueTextForPupUp = function(issue,_cssStyle){

        return  "<article class='"+_cssStyle+"'>" +
                    "<header>" +
                        "<h4>"+issue.type+"</h4>" +
                    "</header>" +
                    "<section>" +
                        "<p>"+issue.wcagPrinciple+"</p>" +
                        "<p>"+issue.wcagGuideline+"</p>" +
                        "<p>"+issue.msg+"</p>" +
                    "</section>" +
                "</article>";

    };

   /*
    * +---------------------------------+
    * | The default text of the pop up  |
    * +---------------------------------+
    */
    window.Gamay.getDEFAULTTextForPupUp = function(){

     return  "<article class='merlotIssuesStyleHeaderWARNING'>" +
                "<header >" +
                "<h4>WARNING</h4>" +
                "</header>" +
                "<section>" +
                    "<p>This element needs some inspection</p>" +
                "</section>" +
             "</article>";

    };

   /*
    * +---------------------------------+
    * | Outline any issued HTML Element |
    * +---------------------------------+
    *
    *  The outline is colored, depending on the issues type,
    *  4px strong and dotted
    *
    *  Error    = red,
    *  Warning  = yellow,
    *  Notice   = blue,
    * (No Error = green)
    *
    *  This function uses the '_onlyOneError' and '_onlyOneWarning' flags
    *  to indicate the color of the outline.
    *
    *  NOTE:
    *  input[@type='radio' and @value='AmericanExpress']
    *  $(type~="accordion"][value~="expand"]
    *  var r = $("input[type=radio][value='AmericanExpress']");
    */
    window.Gamay.outlineIssuedElement = function(domElementCSSSelector, issue, _issuesMSGs,_accessIssues){

        var _error   = false,
            _warning = false,
            _color   = window.Gamay._OUTLINE_STYLE,
            _element = $(domElementCSSSelector),
            _cssStyle = "merlotIssuesStyleHeaderWARNING";

        console.log('domElementCSSSelector = '+domElementCSSSelector);

        switch (issue.typeCode) {
            case HTMLCS.ERROR:
                _color += window.Gamay._ERROR_OUTLINE_COLOR;
                _cssStyle = "merlotIssuesStyleHeaderERROR";
                _error = true;
                break;
            case HTMLCS.WARNING:
                _color += window.Gamay._WARNING_OUTLINE_COLOR;
                _cssStyle = "merlotIssuesStyleHeaderWARNING";
                _warning = true;
                break;
            case HTMLCS.NOTICE:
                _color += window.Gamay._NOTICE_OUTLINE_COLOR;
                _cssStyle = "merlotIssuesStyleHeaderNOTICE";
                break;
            default:
                _color += window.Gamay._WARNING_OUTLINE_COLOR;
                _cssStyle = "merlotIssuesStyleHeaderWARNING";
                break;
        }


       var _msg = window.Gamay.getIssueTextForPupUp(issue,_cssStyle);


       if(!window.Gamay._onlyOneError && !window.Gamay._onlyOneWarning){
            _element.parent().css("outline", _color);
            _element.parent().addClass("tooltip");

            if( _issuesMSGs.indexOf(_msg) === -1){
                _issuesMSGs.push(_msg);
                _accessIssues.push(issue);
            }

       } if (_warning && !window.Gamay._onlyOneError) {
            window.Gamay._onlyOneWarning = true;

            _element.parent().css("outline", _color);
            _element.parent().addClass("tooltip");

            if( _issuesMSGs.indexOf(_msg) === -1){
                _issuesMSGs.push(_msg);
                _accessIssues.push(issue);
            }

       } if (_error){
            window.Gamay._onlyOneError = true;

            _element.parent().css("outline", _color);
            _element.parent().addClass("tooltip");

            if( _issuesMSGs.indexOf(_msg) === -1){
                _issuesMSGs.push(_msg);
                _accessIssues.push(issue);
            }

        }


    };


   /*
    * +---------------------------------------------+
    * | Evaluation Function using HTML CodeSniffer  |
    * +---------------------------------------------+
    */
    window.Gamay.accessibilityEvaluationHTMLCS =  function(ruleset, html, domElement, callback) {

        var _callback = function () {

            var _accessIssues = [], //Array with all found accessibility issues
                _messages = HTMLCS.getMessages(),
                _issuesMSGs = [];

            _messages.forEach(function(msg){
                var _typeName = 'UNKNOWN';
                switch (msg.type) {
                    case HTMLCS.ERROR:
                        _typeName = 'ERROR';
                        break;
                    case HTMLCS.WARNING:
                        _typeName = 'WARNING';
                        break;
                    case HTMLCS.NOTICE:
                        _typeName = 'NOTICE';
                        break;
                    default:
                        _typeName = 'UNKNOWN';
                        break;
                } //end switch

                var _splittedCode = msg.code.split('.'),
                    wcagConf      = _splittedCode[0],
                    wcagGuideline = _splittedCode[1],
                    wcagPrinciple = _splittedCode[2]+'.'+ _splittedCode[3],
                    wcagTechnique = _splittedCode[4];

                var issue = new AccessibilityIssue({
                    type: _typeName,
                    typeCode: msg.type,
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

                window.Gamay.outlineIssuedElement(domElement,issue,_issuesMSGs,_accessIssues);
                //_accessIssues.push(issue);
            }); //End forEach
            window.Gamay.outlineIssuedTooltip($(domElement),_issuesMSGs);
            callback(_accessIssues); //calling back Merlot (selenium)
        };
        window.Gamay._onlyOneError   = false; //reset the error
        window.Gamay._onlyOneWarning = false; //reset the warning

        console.log('standard = '+ruleset +' | '+ ' content:'+html);
        console.log($(domElement));
        console.log('EnvironmentSnapshot:'+ $(domElement).Gamay_GetEnvironmentSnapshot());

        HTMLCS.process(ruleset,$(domElement).Gamay_GetEnvironmentSnapshot(), _callback); // run the accessibility evaluation

    }; // End of function 'accessibilityEvaluationHTMLCS'


    /*
     * +-----------------------------------+
     * |     ==  HELPER FUNCTIONS  ==      |
     * +-----------------------------------+
     */


    /*
     * +-----------------------------------+
     * |         Is valid element ?        |
     * +-----------------------------------+
     */
    /**
     * @description
     * Check if the the given element exists on the web page
     * @param domElement
     * @param callback {function}, call the blueprint runner when the operation is down => (true / false)
     */
    window.Gamay.isValidElement = function(domElement,callback){
        ($(domElement).length <= 0) ? callback(false) : callback(true);
    };

    /*
     * +-----------------------------------+
     * | Mark any element on the website,  |
     * | detached from the evaluation      |
     * +-----------------------------------+
     */
    /**
     * @description
     * Outline any element on the web page under test.
     * @param domElement {object} the domElement that should be marked.
     * @param issue  {object} the issue containing the information (e.g., error message) for the pop up.
     * @param callback {function}, call the blueprint runner when the operation is down.
     */
    window.Gamay.markElement = function(domElement,issue,callback){

        var _issueObj = issue[0],
            _color =  window.Gamay._OUTLINE_STYLE,
            _cssStyle = "merlotIssuesStyleHeaderWARNING";
            _domElement = $(domElement);

        switch (_issueObj.typeCode) {
            case HTMLCS.ERROR:
                _color += window.Gamay._ERROR_OUTLINE_COLOR;
                _cssStyle = "merlotIssuesStyleHeaderERROR";
                break;
            case HTMLCS.WARNING:
                _color += window.Gamay._WARNING_OUTLINE_COLOR;
                _cssStyle = "merlotIssuesStyleHeaderWARNING";
                break;
            case HTMLCS.NOTICE:
                _color += window.Gamay._NOTICE_OUTLINE_COLOR;
                _cssStyle = "merlotIssuesStyleHeaderNOTICE";
                break;
            default:
                _color += window.Gamay._WARNING_OUTLINE_COLOR;
                _cssStyle = "merlotIssuesStyleHeaderWARNING";
                break;
        }


        _domElement.parent().css("outline", _color);
        _domElement.parent().addClass("tooltip");

        var _msg = window.Gamay.getIssueTextForPupUp(_issueObj,_cssStyle);

        _domElement.parent().tooltipster({
            theme: 'merlotIssuesStyle',
            content: $(_msg),
            animation: 'grow',
            delay: 100
        });

        callback();
    };

    /**
     * @description
     * Load everything
     */
    $(document).ready(function () {
       _apply_Gamay_jQueryExtensions(); //getting the gamay specific jQuery extensions.
       console.log('Gamay has been loaded');
    });

})();