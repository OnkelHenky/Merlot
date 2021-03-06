


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
     * Lookup table to translate the number of a principle, which is provided by HTMLCS,
     * into its name.
     * @type {{1: string, 2: string, 3: string, 4: string}}
     */
    AccessibilityIssue.prototype.WCAGPrincipleTranslation = {
        "1" : "Perceivable",
        "2" : "Operable",
        "3" : "Understandable",
        "4" : "Robust"
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

    /**
     * @description
     * Output the issues in an formatted way.
     * @returns {object} the formatted issues
     */
    AccessibilityIssue.prototype.getFormattedRepresentation = function(){

        /* Principle format -> Principle1 */
      //  var _splitPrinciple = this.wcagPrinciple.split("Principle");
        var _formattedPrinciple =   this.wcagPrinciple.split("Principle").join("Principle ")+ " - "+ this.WCAGPrincipleTranslation[this.wcagPrinciple.split("Principle")[1]]; // + _splitPrinciple[1];
        console.log('_formattedPrinciple = ' +_formattedPrinciple);

        this.wcagPrinciple = _formattedPrinciple;

        /* Guideline format -> Guideline1_1.1_1_1 */
        var _splitGuidleline = this.wcagGuideline.split("."); // Result after this step: [Guideline1_1, 1_1_1]
        var _guidlineFirstPart =  _splitGuidleline[0].split("Guideline"); // Result after this step: [Guideline,1_1]
        var _guidlineNumberPart =  _guidlineFirstPart[1].split("_").join("."); // Result after this step: [1,1] -> after join "1.1"

        var _formattedGuidline =  "Guideline " + _guidlineNumberPart; // Result after this step: "Guideline 1.1"
            _formattedGuidline += " Success Criterion "+ _splitGuidleline[1].split("_").join(".");

        this.wcagGuideline = _formattedGuidline;


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

     <article class="merlotBlueprintPopUP ">
         <article class="merlotBlueprintPopUP_ActionBar">
             <div></div>
             <div class="algnRight">
                <button>Got it, thanks Anna!</button>
             </div>
         </article>
         <article class="merlotIssuesMainArticle">
             <section class="merlotActorInfo">
                 <img src="./images/Anna.jpg">
                 <section class="actorBio">
                     <ul>
                     <li>Anna</li>
                     <li>25 Jahre</li>
                     <li>Stuttgart</li>
                     <li>Blind</li>
                     </ul>
                 </section>
                 </section>
                 <section class="merlotIssueInfo">
                     <section class="techIssues">
                         <div>
                             <h4>Notice</h4>
                             <section class="techIssuesList">
                                  <p>adsdsadsdsdsadassSDDSADSDS</p>
                              </section>
                       </div>
                     </section>
                     <section class="techIssues">
                         <h4>Semantic Requirements</h4>
                         <section class="srsIssuesList">
                         <p>adsdsadsdsdsadassSDDSADSDS</p>
                         <p>adsdsadsdsdsadassSDDSADSDS</p>
                         <p>adsdsadsdsdsadassSDDSADSDS</p>
                         <p>adsdsadsdsdsadassSDDSADSDS</p>
                     </section>
                 </section>
             </section>
         </article>
     </article>
     */


   /*
    * +--------------------------------------+
    * | Attache tool tip explanation for     |
    * | accessibility issues                 |
    * +--------------------------------------+
    */
    window.Gamay.outlineIssuedTooltip = function(domElement, msgs, actor_info){
        var _htmlForIssuesTab = "",
            _htmlForSRSTab    = "";

        console.dir(msgs);

        if(typeof  msgs.issues != "undefined" &&  msgs.issues != null &&  msgs.issues.length > 0){

        /*
         * Adding any issues massages.
         */
        msgs.issues.forEach(function (msg) {_htmlForIssuesTab += msg;});

        var _issuesPopUpHTMLMarkup  =  "<article class=\"merlotBlueprintPopUP\">"+
                                            "<article class=\"merlotBlueprintPopUP_ActionBar\">"+
                                                "<div></div>"+
                                                "<div class=\"algnRight\">"+
                                                   "<button onclick=\"$(\'"+domElement+"\').parent().tooltipster(\'hide\');\">Got it, thanks "+ actor_info.name+"!</button>"+
                                                "</div>" +
                                            "</article>";
            _issuesPopUpHTMLMarkup +=  "<article class=\"merlotIssuesMainArticle\">"+
                                       "<section class=\"merlotActorInfo\">"+
                                            "<image src='"+actor_info.image+"'></image></section>"+
                                        //    "<section class=\"actorBio\">"+
                                       //     "</section>"+
                                       "</section>"+
                                       "<section class=\"merlotIssueInfo\">"+
                                            "<section class=\"techIssues\">"+
                                            "<div class=\"merlotIssuesGreetingText\"> \'Hi evaluator this is "+actor_info.name+" - i found some issues on this element that concerns me\'</div>";
            _issuesPopUpHTMLMarkup +=                _htmlForIssuesTab; // adding any issues;
            _issuesPopUpHTMLMarkup +=        "</section>"; // END adding any issues;

            if(typeof  msgs.srs != "undefined" &&  msgs.srs != null &&  msgs.srs.length > 0){
                /*
                 * Adding any semantic requirement statement massages (SRS).
                 */
                msgs.srs.forEach(function (msg) {_htmlForSRSTab += msg;});



                /*


                 "<fieldset class=\"merlotStyle\"><legend>"+issue.type+"</legend>"+
                 "<section>" +
                 "<p>WCAG "+issue.wcagPrinciple+" - "+issue.wcagGuideline+"</p>"+
                 "<p>"+issue.msg+"</p>" +
                 "</section>" +
                 "<section class=\"merlotIssuesSolution\">" +
                 "<header>" +
                 "<h5>Solution Possibilities</h5>" +
                 "</header>" +
                 "<p>More information and solution guidance can be found in the PersonaBrowser</p>" +
                 "<p><a href=\"http://personabrowser.gpii.eu/richtlinien/\" target=\"_blank\">Show this Issues in the PersonaBrowser</a></p>"+
                 "</section>"+
                 "</fieldset>"+
                 */

                var contentForSRS =   "<fieldset class=\"merlotStyle merlotIssuesStyleHeaderSRS\"><legend>Semantic Requirements</legend>"
                    contentForSRS += _htmlForSRSTab;
                    contentForSRS += "</fieldset>";

/*
                var contentForSRS =  "<section class=\"merlotSemanticIssuesSection\">"+"<h4>Semantic Requirements</h4>";
                contentForSRS += _htmlForSRSTab;
                contentForSRS += "</section>";
*/
                _issuesPopUpHTMLMarkup+= contentForSRS;

            }

            _issuesPopUpHTMLMarkup += "</article>"+ // closing the div element of the '_issuesPopUpHTMLMarkup'.
                                      "</article>";


        /*
         * Setting up the pop-up.
         * This is done using tooltipster.js
         * http://iamceege.github.io/tooltipster/
         */
        $(domElement).parent().tooltipster({
            content: $(_issuesPopUpHTMLMarkup),
            theme: 'merlotIssuesStyle',  // Issues-pop-up specific style information -> defined in: "/core/pinot/public/stylesheets.css".
            contentAsHTML : true,        // Mark content as HTML.
            interactive: true,           // A user can interact with the content.
            autoClose : false,           // No auto closing of the pop-up -> a user must use the button to close it.
            trigger: 'hover',            // Pop-up is visible when the user hovers with the mouse over an marked issues.
            animation: 'grow',           // The animation-style of the pop-up
            delay: 100                   // delay of 100ms.
        });


        }
    };

   /**
    * @description
    * +---------------------------------+
    * |   Get the text for the pop up   |
    * +---------------------------------+
    */
    window.Gamay.getIssueTextForPupUp = function(issue,_cssStyle){

        issue.getFormattedRepresentation();

        return  "<article class='merlotIssuesContent "+_cssStyle+"'>" +
                 "<fieldset class=\"merlotStyle\"><legend>"+issue.type+"</legend>"+
                        "<section>" +
                        "<p>WCAG "+issue.wcagPrinciple+" - "+issue.wcagGuideline+"</p>"+
                        "<p>"+issue.msg+"</p>" +
                        "</section>" +
                        "<section class=\"merlotIssuesSolution\">" +
                            "<header>" +
                            "<h5>Solution Possibilities</h5>" +
                            "</header>" +
                        "<p>More information and solution guidance can be found in the PersonaBrowser</p>" +
                        "<p><a href=\"http://personabrowser.gpii.eu/richtlinien/\" target=\"_blank\">Show this Issues in the PersonaBrowser</a></p>"+
                        "</section>"+
                   "</fieldset>"+
                "</article>";
    };

    window.Gamay.getIssueTextForPupUp_TabStyle = function(issue,_cssStyle){

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
     * |   Get the text for the pop up   |
     * +---------------------------------+
     */
    window.Gamay.getIssueTextForSEMANTICPupUp = function(sem,_cssStyle){



        return  "<article class='"+_cssStyle+"'>" +
                    "<section>" +
                            sem +
                    "</section>"+
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
    window.Gamay.getManuelInspectionPopUp = function(issue,_cssStyle){

        return  "<article class='"+_cssStyle+"'>" +
                "<header>" +
                "<h4>"+issue.type+"</h4>" +
                "</header>" +
                "<section>" +
                  "<label for='1234567890gjasdghjksda'> is valid</label>" +
                  "<input id='1234567890gjasdghjksda' type='checkbox'>" +
                "</section>" +
                "</article>";

    };
    */

   /*
    * +---------------------------------+
    * | Outline any issued HTML Element |
    * +---------------------------------+
    *
    *  The outline is colored (depending on the issues type), 4px strong and dotted.
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
    window.Gamay.outlineIssuedElement = function(domElementCSSSelector, issue, _issuesMSGs,_accessIssues, semantics){

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
   //      var _msg = window.Gamay.getManuelInspectionPopUp(issue,_cssStyle);

       if(!window.Gamay._onlyOneError && !window.Gamay._onlyOneWarning){
            _element.parent().css("outline", _color);
            _element.parent().addClass("tooltip");

            if( _issuesMSGs.issues.indexOf(_msg) === -1){
                _issuesMSGs.issues.push(_msg);
                _accessIssues.push(issue);
            }

       } if (_warning && !window.Gamay._onlyOneError) {
            window.Gamay._onlyOneWarning = true;

            _element.parent().css("outline", _color);
            _element.parent().addClass("tooltip");

            if( _issuesMSGs.issues.indexOf(_msg) === -1){
                _issuesMSGs.issues.push(_msg);
                _accessIssues.push(issue);
            }

       } if (_error){
            window.Gamay._onlyOneError = true;

            _element.parent().css("outline", _color);
            _element.parent().addClass("tooltip");

            if( _issuesMSGs.issues.indexOf(_msg) === -1){
                _issuesMSGs.issues.push(_msg);
                _accessIssues.push(issue);
            }

       } if (semantics){
            semantics.forEach(function (sem) {
                var _sem = window.Gamay.getIssueTextForSEMANTICPupUp(sem,"merlotIssuesStyleSRS_Content");
                if( _issuesMSGs.srs.indexOf(_sem) === -1){
                    _issuesMSGs.srs.push(_sem);
                    _accessIssues.push(_sem);
                }
            });
       }
    };


    /*
     * +---------------------------------------------------------------------------------------+
     * | Evaluation Function using HTML CodeSniffer and semantic requirement statements (SRS)  |
     * +---------------------------------------------------------------------------------------+
     */
    window.Gamay.accessibilityEvaluationHTMLCS_WITHSEMANTICS =  function(_actorInfo, html, domElement, semantics, callback) {
        console.log('accessibilityEvaluationHTMLCS_WITHSEMANTICS');
        console.log('+++++++++++ SEMANTICS +++++++++++ ');
        console.dir(semantics);

        /*
         * The name of the actor
         * The name mus match the name of the rule set
         */
        var _actor_name = _actorInfo.name;

        var _callback = function () {

            var _accessIssues = [], //Array with all found accessibility issues
                _messages = HTMLCS.getMessages(),
                _issuesMSGs = {};
                _issuesMSGs.issues = [];   //For errors, warnings and notice
                _issuesMSGs.srs    = [];   //For Semantic Requirement statements - SRS

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
                    wcagPrinciple = _splittedCode[1], //.split("Principle").join("Principle "),
                    wcagGuideline = _splittedCode[2]+'.'+ _splittedCode[3],
                    wcagTechnique = _splittedCode[4];


               /* var t =  _splittedCode[1].split("Principle")
                console.dir(t);
                console.dir(t.join(" ")); */


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

                window.Gamay.outlineIssuedElement(domElement,issue,_issuesMSGs,_accessIssues,semantics);
            }); //End forEach

            window.Gamay.outlineIssuedTooltip(domElement,_issuesMSGs,_actorInfo);
            callback(_accessIssues); //calling back 'Merlot' (selenium)
        };
        window.Gamay._onlyOneError   = false; //reset the error
        window.Gamay._onlyOneWarning = false; //reset the warning

        console.log('standard = '+_actor_name +' | '+ ' content:'+html);
        console.log($(domElement));
        console.log('EnvironmentSnapshot:'+ $(domElement).Gamay_GetEnvironmentSnapshot());

        HTMLCS.process(_actor_name,$(domElement).Gamay_GetEnvironmentSnapshot(), _callback); // run the accessibility evaluation

    }; // End of function 'accessibilityEvaluationWithSemanticsHTMLCS'


   /*
    * +---------------------------------------------+
    * | Evaluation Function using HTML CodeSniffer  |
    * +---------------------------------------------+

    window.Gamay.accessibilityEvaluationHTMLCS =  function(ruleset, html, domElement, callback) {
        console.log('accessibilityEvaluationHTMLCS');

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
            window.Gamay.outlineIssuedTooltip($(domElement),domElement,_issuesMSGs);
            callback(_accessIssues); //calling back Merlot (selenium)
        };
        window.Gamay._onlyOneError   = false; //reset the error
        window.Gamay._onlyOneWarning = false; //reset the warning

        console.log('standard = '+ruleset +' | '+ ' content:'+html);
        console.log($(domElement));
        console.log('EnvironmentSnapshot:'+ $(domElement).Gamay_GetEnvironmentSnapshot());

        HTMLCS.process(ruleset,$(domElement).Gamay_GetEnvironmentSnapshot(), _callback); // run the accessibility evaluation

    }; // End of function 'accessibilityEvaluationHTMLCS'
    */

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
            _cssStyle = "merlotIssuesStyleHeaderWARNING",
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

     //   var _msg = window.Gamay.getManuelInspectionPopUp(_issueObj,_cssStyle);

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
     * Outline the section of a web application where a semantic requirement should be presented
     * @param domElement {object} the domElement that should be marked.
     * @param semanticRequirementStatement  {object} semantic requirement statements - Array!
     * @param callback {function}, call the blueprint runner when the operation is down.
     */
    window.Gamay.markSemanticRequirement = function(domElement,semanticRequirementStatement,callback){

        var _issueObj = issue[0],
            _color =  window.Gamay._OUTLINE_STYLE,
            _cssStyle = "merlotIssuesStyleHeaderWARNING",
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