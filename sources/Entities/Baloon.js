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
 */

Baloon = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.baloon.json, resources.main.baloon.atlas, 1.0);

    /**
     *
     * 
     *
     */
    if(cc.sys.isNative) {
      this.width = 244;
      this.height = 107;
    }

    /**
     *
     * 
     *
     */
    this.parameters = {
      animations: {
        animation: {
          index: 0,
          name: 'animation',
          time: 1.0,
          loop: true
        }
      },
      skins: [
        '1',
        '2'
      ]
    };

    /**
     *
     * 
     *
     */
    this.setSkin(this.parameters.skins.random());

    /**
     *
     * 
     *
     */
    this.setAnimation(this.parameters.animations.animation.index, this.parameters.animations.animation.name, this.parameters.animations.animation.loop);
  },

  /**
   *
   *
   *
   */
  onCreate: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.x = abs(this.parent.x) + Camera.width + Camera.width * Game.parallax.scale();
    this.y = random(Camera.center.y, Camera.height / Game.parameters.scale.min);

    /**
     *
     *
     *
     */
    this.setSkin(this.parameters.skins.random());
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   *
   *
   */
  update: function(time) {
    this._super(time);

    /**
     *
     *
     *
     */
    if(this.x < abs(this.parent.x) - Camera.width * Game.parallax.scale()) {
      this.destroy();
    }
  },

  /**
   *
   *
   *
   */
  deepCopy: function() {
    return new Baloon;
  }
});
