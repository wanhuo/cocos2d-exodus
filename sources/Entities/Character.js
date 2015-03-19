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
        animation: {
          index: 1,
          name: 'animation',
          time: 1.0,
          loop: false
        },
        save: {
          index: 2,
          name: 'save',
          time: 1.0,
          loop: false
        },
        engine: {
          start: {
            index: 3,
            name: 'engine-start',
            time: 1.0,
            loop: false
          },
          finish: {
            index: 4,
            name: 'engine-finish',
            time: 1.0,
            loop: false
          },
          repeat: {
            index: 5,
            name: 'engine-repeat',
            time: 1.0,
            loop: false
          },
          complete: {
            index: 5,
            name: 'engine-start-complete',
            time: 1.0,
            loop: false
          }
        }
      },
      shadow: {
        scale: {
          position: {
            min: 200,
            max: 450
          }
        }
      },
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
      },
      active: true,
      launches: 0,
      collision: {
        x: 125,
        y: 125
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
    this.smokes = new Manager(100, new Smoke, Game.backgrounds.game);

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
    this.setSkin(this.parameters.skins.random());

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
    this.smokes.clear();

    /**
     *
     *
     *
     */
    this.shadow.create().attr({
      x: this.x,
      y: 340
    });

    /**
     *
     * 
     *
     */
    this.setSkin(this.parameters.skins.random());
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
    this.setAnimation(this.parameters.animations.save.index, this.parameters.animations.save.name, false);
  },

  /**
   *
   * 
   *
   */
  onAnimationFinish: function(index) {
    if(this._super(index)) {
      switch(this.parameters.state) {
        case this.parameters.states.prepare:

        /**
         *
         *
         *
         */
        switch(index) {
          case this.parameters.animations.engine.start.index:

          /**
           *
           * 
           *
           */
          this.setAnimation(this.parameters.animations.engine.complete.index, this.parameters.animations.engine.complete.name, false);

          /**
           *
           *
           *
           */
          Game.changeState(Game.parameters.states.game);
          break;
        }
        case this.parameters.states.game:

        /**
         *
         *
         *
         */
        switch(index) {
          case this.parameters.animations.engine.repeat.index:

          /**
           *
           * 
           *
           */
          this.setAnimation(this.parameters.animations.engine.repeat.index, this.parameters.animations.engine.repeat.name, false);
          break;
        }
        break;
      }
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
    this.y = Game.parameters.camera.center;

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
    this.setAnimation(this.parameters.animations.animation.index, this.parameters.animations.animation.name, false);

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
    if(this.parameters.launches > 0) {
      this.setSlotsToSetupPose();
    }

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
    this.y = Game.parameters.camera.center;

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
    this.parameters.launches++;

    /**
     *
     * 
     *
     */
    this.stopAllActions();

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
    Ad.Admob.hide(cc.Ad.Banner, {
      success: function() {
      }.bind(this),
      error: function() {
      }
    });
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
      this.setAnimation(this.parameters.animations.engine.start.index, this.parameters.animations.engine.start.name, false);
      this.setAnimation(this.parameters.animations.engine.repeat.index, this.parameters.animations.engine.repeat.name, false);

      /**
       *
       * 
       *
       */
      this.runAction(cc.DelayTime.create(Number.MAX_VALUE));
    }

    /**
     *
     *
     *
     */
    else if(this.parameters.state === this.parameters.states.game && this.parameters.active) {
      switch(this.detectPoint()) {
        case '1':

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
        break;
        default:

        /**
         *
         *
         *
         */
        this.parameters.active = false;
        case '2':

        /**
         *
         *
         *
         */
        this.parameters.speed.state = false;

        /**
         *
         *
         *
         */
        this.parameters.speed.y = this.parameters.speed.min.y;
        break;
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

    /**
     *
     * 
     *
     */
    this.clearTracks();

    /**
     *
     * 
     *
     */
    this.setAnimation(this.parameters.animations.engine.finish.index, this.parameters.animations.engine.finish.name, false);
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
    this.smokes.create(this);

    /**
     *
     * 
     *
     */
    var position = this.updatePosition(this.parameters);

    /**
     *
     *
     *
     */
    this.x += position.x;
    this.y += position.y;

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
    if(this.y < 0) {
      this.destroy();
    }
  },

  /**
   *
   *
   *
   */
  updatePosition: function(parameters) {

    /**
     *
     * 
     *
     */
    var time = 1.0 / 60.0;

    /**
     *
     * 
     *
     */
    if(parameters.speed.x < parameters.speed.max.x) {
      parameters.speed.x += parameters.speed.increase.x;

      /**
       *
       * 
       *
       */
      parameters.speed.increase.x += parameters.speed.increase.increase.x;
    }

    /**
     *
     * 
     *
     */
    if(parameters.speed.state) {

      /**
       *
       * 
       *
       */
      if(parameters.speed.y < parameters.speed.max.y) {
        parameters.speed.y += parameters.speed.increase.y;
      } else {
        parameters.speed.state = false;
      }
    } else {

      /**
       *
       * 
       *
       */
      if(parameters.speed.x > parameters.speed.min.x) {
        parameters.speed.x -= parameters.speed.decrease.x;
      } else {
        parameters.speed.state = false;
      }

      /**
       *
       * 
       *
       */
      if(parameters.speed.y > parameters.speed.min.y) {
        parameters.speed.y -= parameters.speed.decrease.y;
      } else {
        parameters.speed.state = false;
      }
    }

    /**
     *
     *
     *
     */
    var x = parameters.vector.x * parameters.speed.x * time;
    var y = parameters.vector.y * parameters.speed.y * time;

    /**
     *
     *
     *
     */
    return {
      x: x,
      y: y
    };
  },

  /**
   *
   *
   *
   */
  updateTraectory: function() {

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
    Game.elements.points.clear();

    /**
     *
     * 
     *
     */
    var probably = 100;

    /**
     *
     * 
     *
     */
    var count = probably;

    /**
     *
     * 
     *
     */
    var x = this.x;
    var y = this.y;

    /**
     *
     * 
     *
     */
    var parameters = cc.clone(this.parameters);

    /**
     *
     *
     *
     */
    while(y > 0) {

      /**
       *
       * 
       *
       */
      var position = this.updatePosition(parameters);

      /**
       *
       *
       *
       */
      x += position.x;
      y += position.y;

      /**
       *
       *
       *
       */
      if(count % probably === 0) {

        /**
         *
         *
         *
         */
        Game.elements.points.create().attr({
          x: x,
          y: y
        });
      }

      /**
       *
       *
       *
       */
      count++;
    }
  },

  /**
   *
   *
   *
   */
  detectPoint: function() {

    /**
     *
     *
     *
     */
    for(var i = 0; i < Game.elements.points.count().count; i++) {
      var point = Game.elements.points.get(i);

      /**
       *
       *
       *
       */
      if(abs(this.x - point.x) <= this.parameters.collision.x && abs(this.y - point.y) <= this.parameters.collision.y) {
        return point.parameters.skin;
      }
    }

    /**
     *
     *
     *
     */
    return false;
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
    this.shadow.visible = this.y >= Game.parameters.camera.center;

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
      if(this.y <= (this.parameters.shadow.scale.position.min + this.parameters.shadow.scale.position.max) && this.y >= Game.parameters.camera.center) {
        this.shadow.setScaleX(1.0 - 1.0 / (this.parameters.shadow.scale.position.min / (this.y - this.parameters.shadow.scale.position.max)));
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
