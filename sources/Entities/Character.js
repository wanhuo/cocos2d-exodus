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
      element: false,
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
        }
      },
      skins: [
        '1'
      ],
      vector: {
        x: 0,
        y: 0,
        setup: {
          x: 1,
          y: 1
        }
      },
      speed: {
        x: 0,
        y: 0,
        setup: {
          x: 1600,
          y: 2000
        }
      },
      gravity: {
        x: 0,
        y: 5.0
      }
    };

    /**
     *
     * 
     *
     */
    this.setLocalZOrder(10);

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
  },
  onDestroy: function() {
    this._super();

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
    this.create();

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
    if(!this.created) {
      this.create();
    }

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
    this.x = Camera.center.x;
    this.y = 450;

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
  },
  onGame: function() {
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
      // TODO: Check points.
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
    this.parameters.vector.y -= 0.01;

    /**
     *
     *
     *
     */
    this.x += this.parameters.vector.x * this.parameters.speed.x * time;
    this.y += this.parameters.vector.y * this.parameters.speed.y * time;

    /**
     *
     *
     *
     *
     */
    this.rotation = atan2(this.parameters.vector.x, this.parameters.vector.y) * 180 / Math.PI;

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
