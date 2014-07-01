/**
 * Created by Alexander Henka on 20.06.14.
 * Copyright by Alexander Henka
 */


var Criterion = require('./criterion').Criterion,
    LinkHasTitle;

/**
 * @description
 * The LinkHasLinkText Criterion .
 */
LinkHasTitle = exports.LinkHasTitle = function() {

    /*Information*/
    this._type_    = "Criterion Object"; //Name of the object
    this.name = 'Link has a proper link title';

};

/**
 * @description
 * Get the core functionality from Criterion prototype
 * @type {Criterion}
 */
LinkHasTitle.prototype = new Criterion;


/**
 * @description
 * This function should be overridden by any Criterion implementation.
 * @param webElement the web element to been investigated by this Criterion.
 * @param callback , the function that should be called after this Criterion has been checked.
 */
LinkHasTitle.prototype.criterion = function(webElement,callback){
    console.log("Invoking '" +this.getName() + "' !");

    var isAttributePresent = function(webElement , attribute) {
        var result = false;
        try {
            result = webElement.getAttribute(attribute);
            if (result != null){
                result = true;
            }
        } catch (exception) {
            console.error('Error from "isAttributePresent": '+exception);
        }
        return result;
    };

    if (isAttributePresent(webElement, 'title')) {
         webElement.getAttribute('title')
            .then(function (text) {
                console.log('The title of the link is: '+ text);
            });

    } else {
        throw new Error("Link hast no proper attribute title");
    }

    callback(webElement);
};