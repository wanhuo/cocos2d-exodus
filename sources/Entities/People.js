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

People = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.people.json, resources.main.people.atlas, 1.0, Game.backgrounds.game);

    /**
     *
     * 
     *
     */
    this.parameters = {
      animations: {
        run: {
          index: 1,
          name: 'run',
          time: 1.0,
          loop: true
        }
      },
      skins: [
        '1',
        '2',
        '3',
        '4'
      ],
      up: 1
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
    this.setLocalZOrder(10);
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
    setTimeout(function() {

      /**
       *
       * 
       *
       */
      this.setAnimation(this.parameters.animations.run.index, this.parameters.animations.run.name, true);
    }.bind(this), random(0, 500));

    /**
     *
     * 
     *
     */
    this.parameters.up = 1;

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
    this.x = this.parameters.position ? random(0, Camera.center.x / 2) : random(Camera.width - Camera.center.x / 2, Camera.width);
    this.y = 340;

    /**
     *
     * 
     *
     */
    this.parameters.speed = {
      x: random(50, 100),
      y: 0
    };

    /**
     *
     * 
     *
     */
    this.setScaleX(this.parameters.position ? 1 : -1);
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
  onAnimationFinish: function(index) {
    if(this._super(index)) {
    }
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
    this.x += (this.parameters.speed.x * time * (this.parameters.position ? 1 : -1)) * this.parameters.up;

    /**
     *
     *
     *
     */
    if(this.parameters.position) {
      if(this.x > Camera.center.x) {
        this.destroy();
      }
    } else {
      if(this.x < Camera.center.x) {
        this.destroy();
      }
    }
  },

  /**
   *
   *
   *
   */
  deepCopy: function() {
    return new People;
  }
});
