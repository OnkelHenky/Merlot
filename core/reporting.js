/**
 *  reporting.js is part of Merlot
 *  Copyright (c) by Alexander Henka, 26.08.17.
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
 * +--------------------------------------------------------------------------+
 */

/*
 * +----------------------------+
 * |         REPORTING          |
 * |      ================      |
 * +----------------------------+
 */

/*
 * +----------------------------+
 * |   Require selenium stuff   |
 * +----------------------------+
 */
var Reporting,
    Merlot = require('./Merlot').Merlot;

exports.Reporting = Reporting = function () {

    /*
     * +----------------------------+
     * |        Information         |
     * +----------------------------+
     */
    this._type_ = "Reproting Object"; //Name of the object

    this.accesibiltyBuffer = []

};


/**
 * @description
 * Get all the stuff from Merlot prototype
 * @type {Merlot}
 */
Reporting.prototype = new Merlot();



/**
 *
 * @returns {object}
 */
Reporting.prototype.getAccessibilityIssuesBuffer = function(ScenarioName, issues, cb){
    var self    = this,
        _buffer ='';
    console.dir(self);
    /*
     * MU Template:
     *
     * {{#msgs}}
     *  STEP: {{stepDescr}}
     *        {{#issues}}
     *            ###### {{type}}
     *            {{#msg}}
     *                * {{m}}
     *            {{/msg}}
     *        {{/issues}}
     * {{/msgs}}
     */
    mu.root = __dirname + '/reports';
    var data =  issues.map(function(step){
        return {
            stepDescr: step.stepDescr,
            issues: step.isssues.map(function(issue){
                return {
                    type: issue.type,
                    msg : issue.msgs.map(function(issuesDescription){
                        return { m: issuesDescription.msg }
                    })
                }
            })
        };
    });
    var time = new Date();
    var context = {
        scenario: ScenarioName,
        currentDate : time.toLocaleDateString() + " " + time.getHours()+":"+time.getMinutes()+":"+time.getSeconds(),
        msgs: data,
        actor : self.actor.getName()
    };
    mu.compileAndRender('report.md.mu', context).
    on('data', function (data) { _buffer += data;}).
    on('end', function () { cb(_buffer);}).
    on('error', function (error) {console.log(error);});
};

/**
 * @description
 * Print a given buffer
 * @param buffer
 * @param callback
 * @param scenario
 */
BlueprintRunner.prototype.printIssuesBuffer = function(buffer,scenario,callback){
    var self       = this,
        _logger    = this.logger,
        _fs        = self.utile._fs_,
        _path      = self.utile._path_,
        _reportDIR = self.getReportDirectory(),
        _issues    = self.getArrayWithAccessibilityIssues();

    _logger.log('Buffer = ' +buffer);
    _logger.log("Writing report for =" + scenario.scenario.name);
    var issuePath = _path.join(_reportDIR, '/report.md');

    _fs.writeFile(issuePath, buffer, function (err) {
        if (err) {
            _logger.error('Error during the writing of the report' +err);
            callback(err);
        }

        if (_issues.length > 0) {
            _logger.info("Found accessibility issues:");
            _issues.forEach(function (issue) {
                _logger.info(issue.stepDescr);
                issue.isssues.forEach(function(error){
                    _logger.info(  error.type + '|'
                        + error.code + '|'
                        + error.wcagConf + '|'
                        + error.wcagGuideline + '|'
                        + error.wcagPrinciple + '|'
                        + error.wcagTechnique + '|'
                        + error.msg + '|'
                        + error.nodeName + '|'
                        + error.className + '|'
                        + error.id +'\b');
                })

            });
        } else {
            _logger.info("No accessibility issues found");
        }
        callback();
    });
};


/**
 * @description
 * Print the evaluation report
 * @param scenario
 * @param callback
 */
BlueprintRunner.prototype.printEvaluationReport = function(scenario,callback){
    var self       = this,
        _logger    = this.logger,
        _fs        = self.utile._fs_,
        _reportDIR = self.getReportDirectory(),
        _issues    = self.getArrayWithAccessibilityIssues();

    _logger.info("Generating evaluation report");
    callback();

    _fs.exists(_reportDIR, function (exists) {
        if (!exists) {
            _fs.mkdir(_reportDIR, function (err) {
                if (err) {
                    _logger.error("Error during creation of the reports directory" +err);
                    callback(err);
                }else{
                    self.getAccessibilityIssuesBuffer(scenario.scenario.name, _issues, function(buffer){
                        self.printIssuesBuffer(buffer,scenario,callback);
                    });
                }
            });
        } else {
            self.getAccessibilityIssuesBuffer(scenario.scenario.name, _issues, function(buffer){
                self.printIssuesBuffer(buffer,scenario,callback);
            });
        }
    });

};
