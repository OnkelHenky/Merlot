/**
 * Created by Henka on 19.06.14.
 */

/*
 * Prototype for any (interaction) technique used by the actors.
 */
var TechniqueRepository;

/**
 * @description The prototype for an actor
 * @type {ActorBuilder}
 */
TechniqueRepository = exports.TechniqueRepository =  function() {};
TechniqueRepository.techniques = new Array();


/*
 * The Techniques
 */
TechniqueRepository.techniques['Tab_Navigation'] = require('./tabNavigationTechnique');
TechniqueRepository.techniques['PointAndClick_Navigation'] = require('./pacNavigationTechnique');

TechniqueRepository.techniques['Click_Mouse'] = require('./clickTechnique').byPointAndClick;
TechniqueRepository.techniques['Click_ReturnKey'] = require('./clickTechnique').byUsingTheReturnKey;

