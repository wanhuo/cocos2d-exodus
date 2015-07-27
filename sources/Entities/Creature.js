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

Creature = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function(json, atlas) {
    this._super(json, atlas, 1.0);

    /**
     *
     * 
     *
     */
    this.parameters = {
      animations: {
        animation: {
          index: 1,
          name: 'animation',
          time: 1.0,
          loop: true
        }
      },
      skins: [
        '1'
      ],
      speed: {
        x: 0,
        y: 0,
        min: 50.0,
        max: 100.0
      },
      position: true,
      time: 1.0
    };

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
    this.setLocalZOrder(20);

    /**
     *
     * 
     *
     */
    this.setSkin(this.parameters.skins.random());
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
    this.setSkin(this.parameters.skins.random());

    /**
     *
     * 
     *
     */
    this.parameters.time = 1.0;

    /**
     *
     * 
     *
     */
    this.parameters.position = probably(50);

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
      this.setAnimation(this.parameters.animations.animation.index, this.parameters.animations.animation.name, true);
    }.bind(this), random(0, 500));

    /**
     *
     * 
     *
     */
    this.x = this.parameters.position ? random(0, Camera.center.x / 2) : random(Camera.center.x + Camera.center.x / 2, Camera.width)
    this.y = 340;

    /**
     *
     * 
     *
     */
    this.parameters.speed.x = random(this.parameters.speed.min, this.parameters.speed.max);
    this.parameters.speed.y = 0;

    /**
     *
     * 
     *
     */
    this.scaleX = this.parameters.position ? 1 : -1;
  },
  onDestroy: function() {
    this._super();

    /**
     *
     * 
     *
     */
    Game.onSave();
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
    this.x += (this.parameters.speed.x * time * (this.parameters.position ? 1 : -1)) * this.parameters.time;

    /**
     *
     *
     *
     */
    if(this.parameters.position) {
      if(this.x >= Game.parameters.camera.x + Game.parameters.camera.width / 2) {
        this.destroy();
      }
    } else {
      if(this.x <= Game.parameters.camera.x + Game.parameters.camera.width / 2) {
        this.destroy();
      }
    }
  }
});
