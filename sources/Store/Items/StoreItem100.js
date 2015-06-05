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

StoreItem100 = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.character.json, resources.main.character.atlas, 1.0);

    /**
     *
     *
     *
     */
    this.needScheduleUpdate = true;

    /**
     *
     *
     *
     */
    this.scale = 2;

    /**
     *
     *
     *
     */
    this.retain();
  },

  /**
   *
   *
   *
   */
  correctPositionForUnlock: function() {

    /**
     *
     *
     *
     */
    this.x = 256;
    this.y = 256;
  },

  /**
   *
   *
   *
   */
  onEnter: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.x = Camera.center.x + 50;
    this.y = Camera.center.y - 150;

    /**
     *
     *
     *
     */
    this.rotation = 45;

    /**
     *
     *
     *
     */
    this.setTimeScale(10000);

    /**
     *
     *
     *
     */
    this.setAnimation(0, 'animation', false);
    this.setAnimation(1, 'engine-start', false);

    /**
     *
     *
     *
     */
    setTimeout(function() {

      /**
       *
       *
       *
       */
      this.setTimeScale(1);

      /**
       *
       *
       *
       */
      this.setAnimation(0, 'engine-repeat', true);
    }.bind(this), 200);
  }
});
