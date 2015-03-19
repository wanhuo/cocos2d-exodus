/**
 * Tooflya Inc. Development
 *
 * @author Igor Mats from Tooflya Inc.
 * @copyright (c) 2015 by Igor Mats
 * http://www.tooflya.com/development/
 *
 *
 * License: Tooflya Inc. Software License v1.
 *
 * Licensee may not use this software for commercial purposes. For the purpose of this license,
 * commercial purposes means that a 3rd party has to pay in order to access Software or that
 * the Website that runs Software is behind a paywall. In consideration of the License granted
 * under clause 2, Licensee shall pay Licensor a fee, via Credit-Card, PayPal or any other
 * mean which Licensor may deem adequate. Failure to perform payment shall construe as material
 * breach of this Agreement. This software is provided under an AS-IS basis and without any support,
 * updates or maintenance. Nothing in this Agreement shall require Licensor to provide Licensee with
 * support or fixes to any bug, failure, mis-performance or other defect in The Software.
 *
 * @version of cocos2d is 3.4
 *
 *
 *
 */
Screens.parameters.animations.replace.time = 0.5;
Screens.parameters.animations.push.time = 0.2;
Screens.parameters.animations.pop.time = 0.2;

/**
 *
 *
 *
 */
Screens.change.replace = function(screen) {
  cc.director.runScene(cc.TransitionFade.create(Screens.parameters.animations.replace.time, screen, cc.color.BLACK));
};

/**
 *
 *
 *
 */
Screens.change.push = function(screen) {
  cc.director.runScene(cc.TransitionCrossFade.create(Screens.parameters.animations.push.time, screen));
};

/**
 *
 *
 *
 */
Screens.change.pop = function(screen) {
  cc.director.runScene(cc.TransitionCrossFade.create(Screens.parameters.animations.pop.time, screen));
};