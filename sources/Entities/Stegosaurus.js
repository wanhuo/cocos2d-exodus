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
 * @version of cocos2d is 3.5
 *
 */

Stegosaurus = Creature.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.stegosaurus.json, resources.main.stegosaurus.atlas);

    /**
     *
     *
     *
     */
    this.parameters.speed.min = 20.0;
    this.parameters.speed.max = 80.0;

    /**
     *
     * 
     *
     */
    this.setLocalZOrder(18);
  },

  /**
   *
   *
   *
   */
  deepCopy: function() {
    return new Stegosaurus;
  }
});