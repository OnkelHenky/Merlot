/**
 * Created by Henka on 07.06.14.
 */

var Actor =  require('./actors/actor').Actor;

var ActorBuilder;

/**
 * @description
 * Export function
 * @type {ActorBuilder}
 */
ActorBuilder = exports.ActorBuilder = function() {
    var _version_ = "0.0.1"; //Version number of the PathLogger
};

/**
 * @description
 * Building a new actor based on the information provided by 'actorConf'
 * @param actorConf, JSON object containing the configuration information
 *        about the actor that should be build.
 * @returns {Actor} a new Actor
 */
ActorBuilder.prototype.getActorWithProperties = function (actorConf) {
    return new Actor(actorConf);
};