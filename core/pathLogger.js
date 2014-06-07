/**
 * Created by Henka on 31.05.14.
 */

var PathLogger;

/**
 * While traversing the structure of the HTML side, this
 * Logger, should all elements the had been passed.
 * @type {PathLogger}
 */
PathLogger = exports.PathLogger = function() {
    var _version_ = "0.0.1"; //Version number of the PathLogger
};

/**
 *
 * @param ele, a reference to the element that should be logged
 */
PathLogger.prototype.log = function (ele) {
    console.log(ele);
};