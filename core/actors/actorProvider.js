/**
 *  actorProvider.js is part of Merlot
 *  Copyright (c) by Alexander Henka, 18.06.14.
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
 * |       ACTOR Provider       |
 * |      ================      |
 * +----------------------------+
 */

var ActorProvider;

ActorProvider = exports.ActorProvider = {};
ActorProvider.Actors = [];  // Array with the available actors


/*
 * +----------------------------+
 * |     register the actors    |
 * +----------------------------+
 */

/**
 * The only actor object that shall be used in Merlot!
 * @type {GenericActor}
 */
ActorProvider.Actors['GPII_Pref_Based_Actor']       =  require('./GenericActor').GenericActor;



/*
 * Legacy actors, still there for showcasing .... and you'll never know! :-)
 * A.Henka - 13.07.2015
 */
/**
 * @deprecated
 * @type {Anna}
 */
ActorProvider.Actors['Anna']          =  require('./Anna').Anna;
/**
 * @deprecated
 * @type {Paul}
 */
ActorProvider.Actors['Paul']          =  require('./Paul').Paul;
/**
 * @deprecated
 * @type {GenericActor}
 */
ActorProvider.Actors['JohnDoe']       =  require('./GenericActor').GenericActor;
