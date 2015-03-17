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

Character = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.character.json, resources.main.character.atlas, 1.0, Game.backgrounds.game);

    /**
     *
     * 
     *
     */
    this.parameters = {
      state: 0,
      states: {
        menu: 1,
        animation: 2,
        prepare: 3,
        game: 4
      },
      animations: {
        scale: {
          index: 1,
          name: 'scale',
          time: 1.0,
          loop: false
        },
        people: {
          index: 2,
          name: 'people',
          time: 1.0,
          loop: false
        }
      },
      skins: [
        '1'
      ],
      vector: {
        x: 1,
        y: 1,
        setup: {
          x: 1,
          y: 1
        }
      },
      speed: {
        state: true,
        x: 0,
        y: 0,
        max: {
          x: 1500,
          y: 500
        },
        min: {
          x: 0,
          y: -2000
        },
        increase: {
          x: 0.0,
          y: 5.0,
          increase: {
            x: 0.1,
            y: 0.0
          }
        },
        decrease: {
          x: 0.0,
          y: 4.5
        },
        setup: {
          x: 0,
          y: 0
        }
      }
    };

    /**
     *
     * 
     *
     */
    this.shadow = new Entity(resources.main.character.shadow, Game.backgrounds.game);

    /**
     *
     * 
     *
     */
    this.setLocalZOrder(10);
    this.shadow.setLocalZOrder(9);

    /**
     *
     *
     *
     */
    this.changeState(this.parameters.states.menu);
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
    this.shadow.create().attr({
      x: this.x,
      y: 340
    });
  },
  onDestroy: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.shadow.destroy();

    /**
     *
     *
     *
     */
    Counter.onDeath();

    /**
     *
     *
     *
     */
    Game.changeState(Game.parameters.states.loss);

    /**
     *
     *
     *
     */
    Sound.play(resources.main.sound.character.destroy);
  },

  /**
   *
   * 
   *
   */
  onSave: function() {

    /**
     *
     * 
     *
     */
    this.setAnimation(this.parameters.animations.people.index, this.parameters.animations.people.name, false);
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
  onMenu: function() {

    /**
     *
     * 
     *
     */
    this.x = Camera.center.x;
    this.y = 450;

    /**
     *
     * 
     *
     */
    this.setScale(0.25);

    /**
     *
     * 
     *
     */
    this.create();
  },
  onAnimation: function() {

    /**
     *
     * 
     *
     */
    this.setAnimation(this.parameters.animations.scale.index, this.parameters.animations.scale.name, false);

    /**
     *
     * 
     *
     */
    this.runAction(
      cc.ScaleTo.create(0.5, 1.0)
    );
  },
  onPrepare: function() {

    /**
     *
     * 
     *
     */
    this.rotation = 0;

    /**
     *
     * 
     *
     */
    this.y = 450;

    /**
     *
     * 
     *
     */
    if(!this.created) {
      this.create();
    }

    /**
     *
     * 
     *
     */
    this.parameters.speed.state = true;

    /**
     *
     * 
     *
     */
    this.parameters.speed.x = this.parameters.speed.setup.x;
    this.parameters.speed.y = this.parameters.speed.setup.y;

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
    this.parameters.speed.increase.x = 0;
  },
  onGame: function() {

    /**
     *
     *
     *
     */
    this.updateTraectory();
  },

  /**
   *
   * 
   *
   */
  onTouchBegan: function(touch, e) {

    /**
     *
     *
     *
     */
    if(this.parameters.state === this.parameters.states.prepare) {
      if(this.getNumberOfRunningActions() > 0) return false;

      /**
       *
       *
       *
       */
      this.runAction(
        cc.Sequence.create(
          cc.DelayTime.create(1.0),
          cc.CallFunc.create(function() {

            /**
             *
             *
             *
             */
            Game.changeState(Game.parameters.states.game);
          })
        )
      );
    }

    /**
     *
     *
     *
     */
    else if(this.parameters.state === this.parameters.states.game) {
      if(true) {

        /**
         *
         *
         *
         */
        this.updateTraectory();

        /**
         *
         *
         *
         */
        Counter.onJump();

        /**
         *
         *
         *
         */
        Counter.count();
      }
    }
  },
  onTouchEnded: function(touch, e) {
  },

  /**
   *
   *
   *
   */
  setSlotsToSetupPose: function() {
  },

  /**
   *
   *
   *
   */
  changeState: function(state) {
    if(this.parameters.state === state) return false;

    /**
     *
     *
     *
     */
    this.parameters.state = state;

    /**
     *
     *
     *
     */
    switch(this.parameters.state) {
      case this.parameters.states.menu:
      this.onMenu();
      break;
      case this.parameters.states.animation:
      this.onAnimation();
      break;
      case this.parameters.states.prepare:
      this.onPrepare();
      break;
      case this.parameters.states.game:
      this.onGame();
      break;
    }
  },

  /**
   *
   *
   *
   */
  updateMenu: function(time) {
  },
  updateAnimation: function(time) {
  },
  updatePrepare: function(time) {
  },
  updateGame: function(time) {

    /**
     *
     * 
     *
     */
    if(this.parameters.speed.x < this.parameters.speed.max.x) {
      this.parameters.speed.x += this.parameters.speed.increase.x;
      this.parameters.speed.increase.x += this.parameters.speed.increase.increase.x;
    }

    /**
     *
     * 
     *
     */
    if(this.parameters.speed.state) {

      /**
       *
       * 
       *
       */
      if(this.parameters.speed.y < this.parameters.speed.max.y) {
        this.parameters.speed.y += this.parameters.speed.increase.y;
      } else {
        this.parameters.speed.state = false;
      }
    } else {

      /**
       *
       * 
       *
       */
      if(this.parameters.speed.x > this.parameters.speed.min.x) {
        this.parameters.speed.x -= this.parameters.speed.decrease.x;
      } else {
        this.parameters.speed.state = false;
      }

      /**
       *
       * 
       *
       */
      if(this.parameters.speed.y > this.parameters.speed.min.y) {
        this.parameters.speed.y -= this.parameters.speed.decrease.y;
      } else {
        this.parameters.speed.state = false;
      }
    }

    /**
     *
     *
     *
     */
    this.rotation = Math.atan2(this.parameters.speed.x, this.parameters.speed.y) * 180 / Math.PI;

    /**
     *
     *
     *
     */
    this.x += this.parameters.vector.x * this.parameters.speed.x * (1.0 / 60.0);
    this.y += this.parameters.vector.y * this.parameters.speed.y * (1.0 / 60.0);

    /**
     *
     *
     *
     */
    if(this.y < 0) {
      this.destroy();
    }
  },

  /**
   *
   *
   *
   */
  updateTraectory: function() {
    this.parameters.speed.state = true;
  },

  /**
   *
   *
   *
   */
  updateStates: function(time) {

    /**
     *
     *
     *
     */
    switch(this.parameters.state) {
      case this.parameters.states.menu:
      this.updateMenu(time);
      break;
      case this.parameters.states.animation:
      this.updateAnimation(time);
      break;
      case this.parameters.states.prepare:
      this.updatePrepare(time);
      break;
      case this.parameters.states.game:
      this.updateGame(time);
      break;
    }

    /**
     *
     *
     *
     */
    this.shadow.visible = this.y >= 450;

    /**
     *
     *
     *
     */
    if(this.shadow.visible) {

      /**
       *
       *
       *
       */
      this.shadow.x = this.x;

      /**
       *
       *
       *
       */
      if(this.y <= 650 && this.y >= 450) {
        this.shadow.setScaleX(1.0 - 1.0 / (200 / (this.y - 450)));
      } else {
        this.shadow.setScaleX(0);
      }
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
    this.updateStates(time);
  }
});
