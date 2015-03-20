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

Point = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.point.json, resources.main.point.atlas, 1.0);

    /**
     *
     * 
     *
     */
    this.parameters = {
      active: true,
      animations: {
        animation: {
          index: 1,
          name: 'animation',
          time: 1.0,
          loop: true
        },
        destroy: {
          index: 2,
          name: 'destroy',
          time: 1.0,
          loop: false
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
    this.setNeedScheduleUpdate(true);

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
    this.setLocalZOrder(5);

    /**
     *
     * 
     *
     */
    this.destroy = function(params) {
      if(params === true) {

        /**
         *
         *
         *
         */
        this.parameters.active = false;

        /**
         *
         *
         *
         */
        this.setAnimation(this.parameters.animations.destroy.index, this.parameters.animations.destroy.name, false);

        /**
         *
         *
         *
         */
        return this;
      }

      /**
       *
       * 
       *
       */
      return Entity.prototype.destroy.call(this, params);
    }.bind(this);
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
    this.parameters.active = true;

    /**
     *
     * 
     *
     */
    this.scale = 0;

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
    this.setAnimation(this.parameters.animations.animation.index, this.parameters.animations.animation.name, true);
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   * 
   *
   */
  onAnimationFinish: function(index) {
    if(this._super(index)) {
      switch(index) {
        case this.parameters.animations.destroy.index:
        this.destroy();
        break;
      }
    }
  },

  /**
   *
   *
   *
   */
  setSkin: function(skin) {
    this._super(skin);

    /**
     *
     *
     *
     */
    this.parameters.skin = skin;
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
    var position = abs(Game.backgrounds.game.x);

    /**
     *
     *
     *
     */
    if(this.getNumberOfRunningActions() < 1) {
      if(this.x < position) {
          this.runAction(
            cc.Sequence.create(
              cc.EaseSineInOut.create(
                cc.ScaleTo.create(0.2, 0.0)
              ),
              cc.CallFunc.create(this.destroy, this)
            )
          );
      }
    }
  },

  /**
   *
   *
   *
   */
  deepCopy: function() {
    return new Point;
  }
});

/**
 *
 *
 *
 */
Points = Manager.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(10, new Point, Game.backgrounds.game);
  },

  /**
   *
   *
   *
   */
  clear: function(animated) {

    /**
     *
     *
     *
     */
    if(animated) {

      /**
       *
       *
       *
       */
      var time = 0;

      /**
       *
       *
       *
       */
      this.elements.each(function(element) {

        /**
         *
         *
         *
         */
        if(element.created) {
          element.runAction(
            cc.Sequence.create(
              cc.DelayTime.create(time),
              cc.EaseSineInOut.create(
                cc.ScaleTo.create(0.2, 0.0)
              ),
              cc.CallFunc.create(element.destroy, element)
            )
          );

          /**
           *
           *
           *
           */
          time += 0.01;
        }
      }.bind(this));
    } else {
      this._super();
    }
  }
});