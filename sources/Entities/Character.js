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
        prepare: 2
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
        y: 0
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
    this.create();

    /**
     *
     * 
     *
     */
    this.x = Camera.center.x;
    this.y = Camera.center.y + 90;
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
    this.changeState(this.parameters.states.menu);
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
  },
  onPrepare: function() {

    /**
     *
     * 
     *
     */
    this.setAnimation(this.parameters.animations.scale.index, this.parameters.animations.scale.name, false);
  },

  /**
   *
   * 
   *
   */
  onTouchBegan: function(touch, e) {
  },
  onTouchEnded: function(touch, e) {
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
      case this.parameters.states.prepare:
      this.onPrepare();
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
  updatePrepare: function(time) {
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
      case this.parameters.states.prepare:
      this.updatePrepare(time);
      break;
    }

    /**
     *
     *
     *
     */
    if(this.y < -this.height / 2) {
      this.destroy();
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
