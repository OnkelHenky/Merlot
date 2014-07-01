/**
 * Created by Henka on 19.06.14.
 */

/*
 * Prototype for any (interaction) technique used by the actors.
 */
var TechniqueRepository;

/**
 *
 * @type {TechniqueRepository}
 */
TechniqueRepository = exports.TechniqueRepository =  function() {};
TechniqueRepository.techniques = new Array();


/*
 * The Techniques
 */

// Navigation
TechniqueRepository.techniques['Tab_Navigation']            = require('./tabNavigationTechnique');
TechniqueRepository.techniques['PointAndClick_Navigation']  = require('./pacNavigationTechnique').pacNavigationTechnique;
TechniqueRepository.techniques['XPath_Navigation']          = require('./pacXpathTechnique');
TechniqueRepository.techniques['CSS_Navigation']            = require('./pacNavigationTechnique').pacCSSSelectorNavigationTechnique;

// Click
TechniqueRepository.techniques['Click_Mouse']               = require('./clickTechnique').byPointAndClick;
TechniqueRepository.techniques['Click_ReturnKey']           = require('./clickTechnique').byUsingTheReturnKey;

