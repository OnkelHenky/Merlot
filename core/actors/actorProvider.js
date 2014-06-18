/**
 * Created by Henka on 18.06.14.
 */


var ActorProvider;

/*
 * Actor Provider
 */
ActorProvider = exports.ActorProvider = {};
ActorProvider.Actors = new Array();

/*
 * The Actors
 */
ActorProvider.Actors['Anna']  =  require('./Anna').Anna;
ActorProvider.Actors['Paul']  =  require('./Paul').Paul;
