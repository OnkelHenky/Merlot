/**
 * Created by Alexander Henka on 20.06.14.
 * Copyright by Alexander Henka
 */


var Merlot = require('../Merlot').Merlot,
    CriteriaRepository = require('./criteriaRepository').CriteriaRepository.criteria,
    CriteriaProvider;

/**
 * @constructor
 */
CriteriaProvider = exports.CriteriaProvider = function(criteria) {
    /* Properties */
    this.bundleCriteria = [];

    if(criteria !== undefined){
        this.bundleCriteriaChain(criteria);
    }
};


CriteriaProvider.prototype = new Merlot;

/**
 * @description
 * Build/Chain up a new cain of criteria
 * @param criteria
 */
CriteriaProvider.prototype.bundleCriteriaChain = function (criteria){
    var  _firstCriteria,_currentCriteria, _nextCriteria;

    for (var criterion in criteria){
        if(!CriteriaRepository[criteria[criterion]]){
            console.error("ERROR: Criterion with name '"+criteria[criterion]+"' not found!");
            console.log("Hint: check if the criterion is specified in criteria repository.");
            process.exit(1); /* exit the process - reason: criterion not found!*/
        }else{
            _nextCriteria = new CriteriaRepository[criteria[criterion]];

            if (_firstCriteria === undefined) {
                _firstCriteria = _nextCriteria;
            } else {
                _currentCriteria.next = _nextCriteria;
            }
            _currentCriteria = _nextCriteria;
        }

    }
    this.bundleCriteria.push(_firstCriteria);
};


CriteriaProvider.prototype.getCriteria = function (){
    if(this.bundleCriteria[0]){
        return this.bundleCriteria[0];
    }
};