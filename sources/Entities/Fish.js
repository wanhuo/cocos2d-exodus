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

Fish = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.fish.json, resources.main.fish.atlas, 1.0);

    /**
     *
     * 
     *
     */
    this.parameters = {
      animations: {
      },
      skins: [
        '1',
        '2',
        '3'
      ],
      speed :{
        x: 0,
        y: 0
      },
      vector :{
        x: 0,
        y: 0,
        setup: {
          x: 1,
          y: 1
        },
        descrease: {
          x: 0,
          y: 2.0
        }
      }
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
    this.setSkin(this.parameters.skins.random());

    /**
     *
     * 
     *
     */
    this.destroy = function(param) {
      if(param === Node.destroy.visible || param === true) {
        return Entity.prototype.destroy.call(this, param);
      }

      /**
       *
       * 
       *
       */
      return false;
    }.bind(this);

    /**
     *
     *
     *
     */
    Spine.prototype.onCreateTextures.call(this);
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
    this.parameters.position = probably(50);

    /**
     *
     *
     *
     */
    this.parameters.speed.x = random(200, 800);
    this.parameters.speed.y = random(200, 800);

    /**
     *
     *
     *
     */
    this.x = (this.parameters.position ? random(Game.parameters.camera.x, Game.parameters.camera.x + Game.parameters.camera.width / 2) : random(Game.parameters.camera.x + Game.parameters.camera.width / 2, Game.parameters.camera.x + Game.parameters.camera.width));
    this.y = 130 + (Game.parameters.ad.disabled ? 0 : 100);

    /**
     *
     *
     *
     */
    this.parameters.vector.x = this.parameters.vector.setup.x;
    this.parameters.vector.y = this.parameters.vector.setup.y;

    /**
     *
     *
     *
     */
    this.setScaleX(-1);

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
  onCreateTextures: function() {
  },
  onDestroyTextures: function() {
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
    time *= Character.parameters.time;

    /**
     *
     *
     *
     */
    this.x += (this.parameters.vector.x * this.parameters.speed.x * time) * (this.parameters.position ? 1 : -1);
    this.y += this.parameters.vector.y * this.parameters.speed.y * time;

    /**
     *
     *
     *
     */
    this.rotation = Math.atan2(this.parameters.vector.x * (this.parameters.position ? 1 : -1), this.parameters.vector.y) * 180 / Math.PI - 90;

    /**
     *
     *
     *
     */
    this.parameters.vector.y -= this.parameters.vector.descrease.y * time;

    /**
     *
     *
     *
     */
    if(this.y < 0) {
      this.destroy(true);
    }
  },

  /**
   *
   *
   *
   */
  deepCopy: function() {
    return new Fish;
  }
});
