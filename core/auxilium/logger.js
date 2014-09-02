/**
 * Created by Alexander Henka on 29.08.14.
 * Copyright by Alexander Henka
 *
 * A logger for Merlot using colored.js by 'pfleidi'
 * Source at: https://github.com/pfleidi/colored.js
 *
 */

var Logger,
    Colored = require('../../lib/colored');
    Merlot = require('../Merlot').Merlot;


/**
 * @description
 * Logger to log stuff using color.js
 * @type {Logger}
 */
exports.Logger = Logger = function(properties) {

    /*Information*/
    this._type_    = "Logger Object"; //Name of the object

    /*Properties*/
    this.debug = false; // if debug = true => log stuff.
    this.logLevel = 1; // 1 = Only Logs; 2 = Logs and Info; 3 =  Logs, Info and Errors
    this.sys = this.utile._sys_; //Shortcut to _sys_ from object 'Merlot'
    this.style  = Colored;

    if(properties){
       this.addProperties(properties);
    }
};


/**
 * @description
 * Get all the stuff from Merlot prototype
 * @type {Merlot}
 */
Logger.prototype = new Merlot();

/**
 * @description
 * Check if the debug mode is turend on
 * @returns {boolean|*}
 */
Logger.prototype.isDebugModeOn = function () {
  return this.debug;
};

/**
 * @description
 * The log level
 * 1 = Show only normal debug logs
 * 2 = Debug and info logs
 * 3 = Debug, info and Errors logs
 * @returns {number} the loglevel
 */
Logger.prototype.getLogLevel = function () {
    return this.logLevel;
};

/**
 * @description
 * Add the properties to this logger object
 * @param properties
 */
Logger.prototype.addProperties = function (properties) {
    var that = this;

    Object.keys(properties).forEach(function (key) {
        that[key] = properties[key];
    });
};

/**
 * @description
 * Plain logging if debug mode is one (= true)
 * @param stuff the text to log on the console
 * @returns {boolean|*}
 */
Logger.prototype.log = function (stuff) {
    var _style = this.style;
    if(this.isDebugModeOn() && this.getLogLevel() >= 1) {
        this.sys.puts(_style.foreground.green(stuff));
    }
};

/**
 * @description
 * Info level logging if debug mode is one (= true)
 * Info output will be indicated by cyan color
 * @param stuff the info text
 * @returns {boolean|*}
 */
Logger.prototype.info = function (stuff) {
    var _style = this.style;
    if(this.isDebugModeOn() && this.getLogLevel() >= 2) {
        this.sys.puts(_style.extras.underline(_style.foreground.cyan("Info:")) + " " + stuff);
    }
};

/**
 * @description
 * Error level logging if debug mode is one (= true)
 * Error output will be indicated by red color, and bold text
 * @param stuff , the error text
 * @returns {boolean|*}
 */
Logger.prototype.error = function (stuff) {
    var _style = this.style;
    if(this.isDebugModeOn() && this.getLogLevel() === 3) {
        this.sys.puts(_style.extras.underline(_style.extras.bold(_style.foreground.red("Error:")))+ " " + stuff);
    }
};










