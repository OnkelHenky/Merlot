/**
 * Created by Alexander Henka on 20.06.14.
 * Copyright by Alexander Henka
 */


var Criterion = require('./criterion').Criterion,
    LinkHasLinkText;

/**
 * @description
 * The LinkHasLinkText Criterion .
 */
LinkHasLinkText = exports.LinkHasLinkText = function() {

    /*Information*/
    this.name = 'Link has a proper link text';

};

/**
 * @description
 * Get the core functionality from Criterion prototype
 * @type {Criterion}
 */
LinkHasLinkText.prototype = new Criterion;


/**
 * @description
 * This function should be overridden by any Criterion implementation.
 * @param webElement the web element to been investigated by this Criterion.
 * @param callback , the function that should be called after this Criterion has been checked.
 */
LinkHasLinkText.prototype.criterion = function(webElement,callback){
    console.log("Invoking: '" +this.getName() + "' !");

    var hasTextNode = function(webElement) {
        var result = false;
        try {
            result = webElement.getText();
            if (result != null){
                result = true;
            }
        } catch (exception) {
            //console.error('Error from "hasTextNode": '+exception);
            console.log('NO TEXT NODE ....');
            callback();
        }
        return result;
    };

    if(hasTextNode(webElement)) {
        webElement.getText()
            .then(function (text) {
                tconsole.log('The text on the link is: '+ text);
            });
    }else{
        //throw new Error("Link hast no proper Text");
        console.log("No proper attribute title");
    }

    callback(webElement);
};