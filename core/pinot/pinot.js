/**
 * Created by Henka on 15.09.14.
 */

var express = require('express'),
    Logger = require('../auxilium/logger').Logger,
    path = require('path');

/**
 *
 * @type {pinot}
 */
var Pinot = exports.Pinot = function () {

    var logger = require('morgan'),
        errorHandler = require('errorhandler');

    this.logger = new Logger({'logLevel': 3});
    this.app = express();
    this.server = require('http').Server(this.app);

    this.app.set('port', process.env.PORT || 3000);
    this.app.use(logger('dev'));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(errorHandler());

        if ('development' == this.app.get('env')) {
            this.app.use(errorHandler());
        }



};

/**
 * @description
 * Start the Pinot server.
 */
Pinot.prototype.start = function () {
    var self = this;
    self.server.listen(self.app.get('port'), function(){
         console.log("Express server http://127.0.0.1 listening on port " + self.app.get('port'));
    });
};

/**
 * @description
 * Stop the Pinot server.
 */
Pinot.prototype.stop = function () {
 var _logger = this.logger;
      this.server.close(function() {
          _logger.info("Browser closed, closing out remaining connections");
          process.exit();
      });
};









