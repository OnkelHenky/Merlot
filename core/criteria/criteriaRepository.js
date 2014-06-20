/**
 * Created by Alexander Henka on 20.06.14.
 * Copyright by Alexander Henka
 */


/**
 *
 */
var CriteriaRepository;

/**
 *
 * @type {CriteriaRepository}
 */
CriteriaRepository = exports.CriteriaRepository =  function() {};
CriteriaRepository.criteria = new Array();


/*
 * The Criteria
 */
// Void, an empty criterion
CriteriaRepository.criteria['Void']                 = require('./void').VoidCriterion;

// Links
CriteriaRepository.criteria['Link_Has_Link_Text']   = require('./link_HasText').LinkHasLinkText;
CriteriaRepository.criteria['Link_Has_Title']       = require('./link_HasTitle').LinkHasTitle;

