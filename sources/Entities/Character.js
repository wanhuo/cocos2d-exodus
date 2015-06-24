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
    Character = this;

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
        game: 4,
        loss: 5,
        restore: 6
      },
      status: false,
      scheduler: 0,
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
          }
        },
        status: {
          start: {
            index: 6,
            name: 'status-start',
            time: 1.0,
            loop: false
          },
          finish: {
            index: 7,
            name: 'status-finish',
            time: 1.0,
            loop: false
          }
        }
      },
      skin: false,
      skins: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        //'11',
        //'12',
        //'13',
        '14',
        //'15',
        '16',
        '17',
        '18',
        '19',
        '20',
        //'21',
        //'22',
        //'23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36'
      ],
      high: false,
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
        maximum: {
          x: 1500,
          y: 0
        },
        max: {
          x: 0,
          y: 0,
          increase: {
            x: 100,
            y: 0.0
          },
          setup: {
            x: 850,
            y: 500
          }
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
          y: 3.0,
          max: {
            x: 0.0,
            y: 10.0,
          }
        },
        setup: {
          x: 0,
          y: 0
        }
      },
      shake: {
        current: 0.0,
        increase: 0.001
      },
      smokes: {
        time: {
          current: 0.015,
          elapsed: 0
        }
      },
      active: true,
      locked: true,
      collision: {
        x: 75,
        y: 75
      },
      time: 1.0,
      sound: {
        id: {
          start: false,
          repeat: false
        },
        handler: false,
        time: 5300
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
    this.smokes = new Manager(100, new Smoke, Game.backgrounds.game, true);

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
    this.shadow.setLocalZOrder(9);

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
  reset: function() {

    /**
     *
     * 
     *
     */
    this.parameters.time = 1;

    /**
     *
     *
     *
     */
    this.parameters.scheduler = 0;

    /**
     *
     *
     *
     */
    this.parameters.active = true;
    this.parameters.locked = true;
    this.parameters.speed.state = true;

    /**
     *
     *
     *
     */
    this.onShakeFinish();

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
    this.parameters.speed.max.x = this.parameters.speed.max.setup.x;
    this.parameters.speed.max.y = this.parameters.speed.max.setup.y;

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
    this.shadow.create();

    /**
     *
     *
     *
     */
    this.parameters.high = false;

    /**
     *
     *
     *
     */
    this.setSkin(this.parameters.skins[round(Data.get(false, properties.rocket))]);
  },
  onDestroy: function() {
    this._super();

    /**
     *
     *
     *
     */
    clearInterval(this.parameters.sound.handler);

    /**
     *
     *
     *
     */
    Sound.stop(this.parameters.sound.id.start);
    Sound.stop(this.parameters.sound.id.repeat);

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
    this.onShakeFinish();

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

    /**
     *
     * 
     *
     */
    Sound.play(resources.main.sound.save);
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
          Game.changeState(Game.parameters.states.game);
          break;
        }
        case this.parameters.states.game:
        case this.parameters.states.loss:

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
    this.create();

    /**
     *
     * 
     *
     */
    this.x = Camera.center.x + parameters.character.positions.menu[this.parameters.skins.indexOf(this.parameters.skin)].x;
    this.y = parameters.character.positions.menu[this.parameters.skins.indexOf(this.parameters.skin)].y;

    /**
     *
     * 
     *
     */
    this.scale = 0.25;
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
      cc.Spawn.create(
        cc.ScaleTo.create(0.5, 1.0),
        cc.MoveTo.create(0.5, {
          x: Camera.center.x,
          y: Game.parameters.camera.center
        })
      )
    );
  },
  onPrepare: function() {

    /**
     *
     *
     *
     */
    clearTimeout(this.parameters.creation);

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
    this.y = Game.parameters.camera.center;

    /**
     *
     *
     *
     */
    this.shadow.x = this.x;
    this.shadow.y = 340;

    /**
     *
     *
     *
     */
    this.reset();
  },
  onGame: function() {

    /**
     *
     *
     *
     */
    clearInterval(this.parameters.sound.handler);

    /**
     *
     *
     *
     */
    Sound.stop(this.parameters.sound.id.start);
    Sound.stop(this.parameters.sound.id.repeat);

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
    this.parameters.creation = setTimeout(function() {

      /**
       *
       *
       *
       */
      this.parameters.locked = false;
      this.parameters.creation = false;

      /**
       *
       *
       *
       */
      this.updateTraectory();
   }.bind(this), 2500);

    /**
     *
     *
     *
     */
    this.updateSound();
  },
  onLoss: function() {

    /**
     *
     *
     *
     */
    Game.elements.coins.clear();

    /**
     *
     *
     *
     */
    this.smokes.pauseSchedulerAndActions();

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
    this.onShakeFinish();

    /**
     *
     *
     *
     */
    Game.h.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.5, 1.0 / Game.backgrounds.d.scale)
        ),
        cc.DelayTime.create(2.0),
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.5, 1.0)
        ),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.smokes.resumeSchedulerAndActions();

          /**
           *
           *
           *
           */
          Game.elements.explanation.runAction(
            cc.Sequence.create(
              cc.EaseSineInOut.create(
                cc.FadeOut.create(0.5)
              ),
              cc.CallFunc.create(Game.elements.explanation.destroy, Game.elements.explanation)
            )
          );
        }.bind(this))
      )
    );

    /**
     *
     *
     *
     */
    Game.elements.explanation.create();

    /**
     *
     *
     *
     */
    Game.elements.explanation.x = parameters.character.anchor[this.parameters.skins.indexOf(this.parameters.skin)].x;
    Game.elements.explanation.y = parameters.character.anchor[this.parameters.skins.indexOf(this.parameters.skin)].y;
  },
  onRestore: function() {

    /**
     *
     *
     *
     */
    this.reset();
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
    if(Game.h.getNumberOfRunningActions() > 0) {

      /**
       *
       *
       *
       */
      if(Game.elements.explanation.getNumberOfRunningActions() > 1) return false;

      /**
       *
       *
       *
       */
      Game.h.stopAllActions();

      /**
       *
       *
       *
       */
      Game.h.runAction(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.ScaleTo.create(0.5, 1.0)
          ),
          cc.CallFunc.create(function() {

            /**
             *
             *
             *
             */
            this.resumeSchedulerAndActions();
          }.bind(this))
        )
      );

      /**
       *
       *
       *
       */
      Game.elements.explanation.runAction(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.FadeOut.create(0.5)
          ),
          cc.CallFunc.create(Game.elements.explanation.destroy, Game.elements.explanation)
        )
      );

      /**
       *
       *
       *
       */
      return;
    }

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
      this.parameters.sound.id.start = Sound.play(resources.main.sound.character.engine.start);

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
    else if(this.parameters.state === this.parameters.states.game) {
      if(this.parameters.locked) return false;

      /**
       *
       *
       *
       */
      this.proceedPoint();
    }

    /**
     *
     *
     *
     */
    else if(this.parameters.state === this.parameters.states.loss) {

      /**
       *
       *
       *
       */
      if(Game.backgrounds.w.getNumberOfRunningActions() > 0) {
        if(Splurge.getNumberOfRunningActions() > 0) return false;

        /**
         *
         *
         *
         */
        Splurge.animation2();
      } else {

        /**
         *
         *
         *
         */
        Game.backgrounds.w.runAction(
          cc.EaseSineInOut.create(
            cc.MoveTo.create(1.0, {
              x: 0,
              y: this.y
            })
          )
        );
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
  onShakeFinish: function() {

    /**
     *
     *
     *
     */
    this.parameters.shake.current = 0;

    /**
     *
     *
     *
     */
    if(this.shake) {

      /**
       *
       *
       *
       */
      this.shake.lx = false;
      this.shake.ly = false;

      /**
       *
       *
       *
       */
      this.shake.enabled = false;
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
  getSkin: function() {
    return this.parameters.skin;
  },

  /**
   *
   * 
   *
   */
  setShake: function(duration, strength) {
    if(!this.shake) {
      this.shake = {
        duration: 0,
        strength: 0,
        x: 0,
        y: 0
      };
    }

    this.shake.duration = duration;
    this.shake.strength = strength;
    this.shake.x = this.x;
    this.shake.y = this.y;

    this.onShakeStart();
  },

  /**
   *
   *
   *
   */
  setSlotsToSetupPoseCustom: function() {

    /**
     *
     *
     *
     */
    clearInterval(this.parameters.sound.handler);
    clearTimeout(this.parameters.creation);

    /**
     *
     *
     *
     */
    Sound.stop(this.parameters.sound.id.start);
    Sound.stop(this.parameters.sound.id.repeat);

    /**
     *
     * 
     *
     */
    if(!this.state.create) {
      this.create();
    }

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
    this.stopAllActions();

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
  showStatus: function() {

    /**
     *
     *
     *
     */
    //this.clearTrack(this.parameters.animations.status.start.index);
    //this.clearTrack(this.parameters.animations.status.finish.index);

    /**
     *
     *
     *
     */
    this.setAnimation(this.parameters.animations.status.start.index, this.parameters.animations.status.start.name, false);
  },
  hideStatus: function() {

    /**
     *
     *
     *
     */
    //this.clearTrack(this.parameters.animations.status.start.index);
    //this.clearTrack(this.parameters.animations.status.finish.index);

    /**
     *
     *
     *
     */
    this.setAnimation(this.parameters.animations.status.finish.index, this.parameters.animations.status.finish.name, false);
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
      case this.parameters.states.loss:
      this.onLoss();
      break;
      case this.parameters.states.restore:
      this.onRestore();
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
  updateGame: function(time, scale) {

    /**
     *
     *
     *
     */
    this.parameters.smokes.time.elapsed += time;

    /**
     *
     *
     *
     */
    if(this.parameters.smokes.time.elapsed >= this.parameters.smokes.time.current) {
      this.parameters.smokes.time.elapsed = 0;

      /**
       *
       *
       *
       */
      var element = this.smokes.create(this);

      /**
       *
       *
       *
       */
      if(this.shake && this.shake.enabled) {
        element.setCurrentFrameIndex(1);
      } else {
        element.setCurrentFrameIndex(0);
      }
    }

    /**
     *
     *
     *
     */
    //this.updateShadow(time);

    /**
     *
     *
     *
     */
    this.updateHigh(time);

    /**
     *
     * 
     *
     */
    var position = this.updatePosition(this.parameters, scale);

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
  },
  updateLoss: function(time) {

    /**
     *
     *
     *
     */
    if(Game.h.getNumberOfRunningActions() < 1) {

      /**
       *
       *
       *
       */
      this.updateGame(time, 2);
    }
  },
  updateRestore: function(time) {

    /**
     *
     *
     *
     */
    this.updateGame(time);
  },

  /**
   *
   *
   *
   */
  updatePosition: function(parameters, scale) {

    /**
     *
     * 
     *
     */
    var time = (1.0 / 60.0) * this.parameters.time;

    /**
     *
     * 
     *
     */
    if(this.parameters.state === this.parameters.states.game) {

      /**
       *
       * 
       *
       */
      if(parameters.speed.x < parameters.speed.max.x) {
        parameters.speed.x += parameters.speed.increase.x * this.parameters.time;

        /**
         *
         * 
         *
         */
        parameters.speed.increase.x += parameters.speed.increase.increase.x * this.parameters.time;
        parameters.speed.increase.y += parameters.speed.increase.increase.y * this.parameters.time;
      }
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
        parameters.speed.y += this.parameters.time * parameters.speed.increase.y * max(1, Creatures.current[0] / 10);
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
        parameters.speed.x -= parameters.speed.decrease.x * this.parameters.time;
      } else {
        parameters.speed.state = false;
      }

      /**
       *
       * 
       *
       */
      if(parameters.speed.y > parameters.speed.min.y) {

        /**
         *
         *
         *
         */
        if(scale) {
            parameters.speed.y -= parameters.speed.decrease.max.y * scale * this.parameters.time;
        } else {
          if(this.parameters.active) {
            parameters.speed.y -= parameters.speed.decrease.y * this.parameters.time;
          } else {
            parameters.speed.y -= parameters.speed.decrease.max.y * this.parameters.time;
          }
        }
      } else {
        parameters.speed.state = false;
      }

      /**
       *
       *
       *
       */
      if(this.parameters.state === this.parameters.states.loss) {
        if(parameters.speed.x > 0) parameters.speed.x -= 5 * scale * this.parameters.time;
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
    Game.elements.points.bonus = [];

    /**
     *
     *
     *
     */
    Game.elements.points.animator.destroy();

    /**
     *
     * TODO: We have a performance issue here.
     *
     */
    Game.elements.points.clear(/*true*/false);

    /**
     *
     * 
     *
     */
    var bonus = 0;

    /**
     *
     * 
     *
     */
    var capacity = 16;

    /**
     *
     * 
     *
     */
    var count = -capacity / 2;

    /**
     *
     * 
     *
     */
    var time = 0.1;

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
    var coins = Game.parameters.coins.current >= Game.parameters.coins.repeat / (Bonuses.states[1] ? 2 : 1);
    var coinses = 0;

    /**
     *
     * 
     *
     */
    if(coins) {

      /**
       *
       *
       *
       */
      Game.parameters.coins.current = 0;
    }

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
      if(!bonus) {

        /**
         *
         *
         *
         */
        bonus = (Game.backgrounds.d.scale <= Game.parameters.scale.min && x > Game.parameters.camera.x + Game.parameters.camera.width && probably(1)) ? 4 : 0;
      }

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
      if(count > 0 && count % capacity === 0) {

        /**
         *
         *
         *
         */
        var element = Game.elements.points.create();

        /**
         *
         *
         *
         */
        element.x = x;
        element.y = y;

        /**
         *
         *
         *
         */
        if(coins) {

          /**
           *
           *
           *
           */
          coinses++;

          /**
           *
           *
           *
           */
          element.setCurrentFrameIndex(2);

          /**
           *
           *
           *
           */
          coins = coinses < Game.parameters.coins.count;
        } else if(bonus > 0) {

          /**
           *
           *
           *
           */
          bonus--;

          /**
           *
           *
           *
           */
          element.setCurrentFrameIndex(0);

          /**
           *
           *
           *
           */
          Game.elements.points.bonus.push(element);
        }

        /**
         *
         *
         *
         */
        if(x < Game.parameters.camera.x + Game.parameters.camera.width * 2) {

          /**
           *
           *
           *
           */
          element.runAction(
            cc.Sequence.create(
              cc.DelayTime.create(time),
              cc.EaseSineInOut.create(
                cc.ScaleTo.create(0.5, 2.0)
              )
            )
          );
        } else {
          element.scale = 2;
        }

        /**
         *
         *
         *
         */
        time += 0.05;
      }

      /**
       *
       *
       *
       */
      count++;
    }

    /**
     *
     *
     *
     */
    if(Game.elements.points.bonus.length >= 4) {
      if(Game.elements.points.bonus[3].y < Game.elements.points.bonus[0].y) {

        /**
         *
         *
         *
         */
        Game.elements.points.bonus = [];

        /**
         *
         *
         *
         */
        Game.elements.points.animator.destroy();
      }
    } else {

      /**
       *
       *
       *
       */
      Game.elements.points.animator.destroy();
    }

    /**
     *
     *
     *
     */
    if(Game.elements.points.bonus.length >= 4) {

      /**
       *
       *
       *
       */
      Game.elements.points.animator.create().reset();

      /**
       *
       *
       *
       */
      Game.elements.points.animator.x = Game.elements.points.bonus[0].x;
      Game.elements.points.animator.y = Game.elements.points.bonus[0].y;

      /**
       *
       *
       *
       */
      Game.elements.points.animator.runAction(
        cc.RepeatForever.create(
          cc.Sequence.create(
            cc.BezierTo.create(0.2,
            [
              {x: Game.elements.points.bonus[0].x, y: Game.elements.points.bonus[0].y},
              {x: Game.elements.points.bonus[2].x, y: Game.elements.points.bonus[2].y},
              {x: Game.elements.points.bonus[3].x, y: Game.elements.points.bonus[3].y}
            ]),
            cc.BezierTo.create(0.2,
            [
              {x: Game.elements.points.bonus[3].x, y: Game.elements.points.bonus[3].y},
              {x: Game.elements.points.bonus[1].x, y: Game.elements.points.bonus[1].y},
              {x: Game.elements.points.bonus[0].x, y: Game.elements.points.bonus[0].y}
            ])
          )
        )
      );
    }
  },

  /**
   *
   *
   *
   */
  updatePoint: function() {

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
      if(point.parameters.active) {

        /**
         *
         *
         *
         */
        if(abs(this.x - point.x) <= this.parameters.collision.x && abs(this.y - point.y) <= this.parameters.collision.y) {
          return point;
        }
      }
    }

    /**
     *
     *
     *
     */
    return false;
  },
  proceedPoint: function(index) {

    /**
     *
     *
     *
     */
    var element = (index || index === 0) ? index : this.updatePoint();

    /**
     *
     *
     *
     */
    switch(element ? element.getCurrentFrameIndex() : element) {
      default:

      /**
       *
       *
       *
       */
      if(this.isOnSpecialZone()) {

        /**
         *
         *
         *
         */
        return this.proceedPoint(0);
      }

      /**
       *
       *
       *
       */
      this.changeState(this.parameters.states.loss);

      /**
       *
       *
       *
       */
      Counter.onFail();
      break;
      case 0:

      /**
       *
       *
       *
       */
      if(this.isOnSpecialZone()) {

        /**
         *
         *
         *
         */
        Game.elements.coins.create().setCurrentFrameIndexAction(0);
      } else {

        /**
         *
         *
         *
         */
        Game.parameters.coins.current++;

        /**
         *
         *
         *
         */
        this.parameters.active = this.parameters.speed.state = true;

        /**
         *
         * 
         *
         */
        if(this.parameters.speed.x < this.parameters.speed.maximum.x) {
          this.parameters.speed.max.x += this.parameters.speed.max.increase.x / Creatures.current[2];
          this.parameters.speed.max.y += this.parameters.speed.max.increase.y;
        } else {

          /**
           *
           *
           *
           */
          this.parameters.shake.current += this.parameters.shake.increase / Creatures.current[3];

          /**
           *
           *
           *
           */
          this.setShake(Number.MAX_VALUE, this.parameters.shake.current);
        }

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
        if(element instanceof cc.Node) Game.elements.coins.create().setCurrentFrameIndexAction(0);
      }
      break;
      case 1:

      /**
       *
       *
       *
       */
      this.parameters.active = this.parameters.speed.state = false;

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
      Counter.onMistake();
      break;
      case 2:

      /**
       *
       *
       *
       */
      Game.elements.coins.create(element).setCurrentFrameIndexAction(2);
      break;
    }
  },

  /**
   *
   *
   *
   */
  isOnSpecialZone: function() {

    /**
     *
     *
     *
     */
    if(Game.elements.points.bonus.length) {

      /**
       *
       *
       *
       */
      if(this.x >= (Game.elements.points.bonus[0].x - this.parameters.collision.x) && this.x <= (Game.elements.points.bonus[3].x + this.parameters.collision.x)) {
        return true;
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
  updateStatus: function() {

    /**
     *
     *
     *
     */
    if(this.isOnSpecialZone()) {

      /**
       *
       *
       *
       */
      return this.showStatus();
    }

    /**
     *
     *
     *
     */
    var element = this.updatePoint();

    /**
     *
     *
     *
     */
    switch(element ? element.getCurrentFrameIndex() : false) {
      default:
      this.hideStatus();
      break;
      case 0:
      this.showStatus();
      break;
      case 1:
      this.hideStatus();
      break;
      case 2:

      /**
       *
       *
       *
       */
      if(true /*Bonuses.states[0]*/) {

        /**
         *
         *
         *
         */
        this.proceedPoint(element);
      } else {

        /**
         *
         *
         *
         */
        this.showStatus();
      }
      break;
    }
  },

  /**
   *
   *
   *
   */
  updateShadow: function(time) {

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
  updateShake: function(time) {

    /**
     *
     *
     *
     */
    if(this.shake && this.shake.enabled) {

      /**
       *
       *
       *
       */
      if(this.shake.lx || this.shake.ly) {
        this.x -= this.shake.lx;
        this.y -= this.shake.ly;
      }

      /**
       *
       *
       *
       */
      this.shake.lx = random(-Camera.width, Camera.width) * this.shake.strength;
      this.shake.ly = random(-Camera.height, Camera.height) * this.shake.strength;

      /**
       *
       *
       *
       */
      this.x += this.shake.lx;
      this.y += this.shake.ly;

      /**
       *
       *
       *
       */
      this.shake.duration -= time;

      /**
       *
       *
       *
       */
      if(this.shake.duration <= 0) {
        this.onShakeFinish();
      }
    }
  },

  /**
   *
   *
   *
   */
  updateHigh: function() {

    /**
     *
     *
     *
     */
    if(!this.parameters.high) {
      if(Counter.values.position > 0) {
        if(this.y > Counter.values.position) {
          this.parameters.high = true;

          /**
           *
           *
           *
           */
          Sound.play(resources.main.sound.awesome);
        }
      } else {

        /**
         *
         *
         *
         */
        this.parameters.high = true;
      }
    }

    /**
     *
     *
     *
     */
    Counter.values.position = max(Counter.values.position, this.y);
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
      case this.parameters.states.loss:
      this.updateLoss(time);
      break;
      case this.parameters.states.restore:
      this.updateRestore(time);
      break;
    }

    /**
     *
     *
     *
     */
    switch(this.parameters.state) {
      case this.parameters.states.menu:
      case this.parameters.states.animation:
      case this.parameters.states.prepare:
      case this.parameters.states.game:
      case this.parameters.states.loss:
      case this.parameters.states.restore:

      /**
       *
       * 
       *
       */
      if(Game.backgrounds.w.y + Game.parameters.water.y[Game.parameters.state] > this.y) {
        switch(this.parameters.state) {
          case this.parameters.states.prepare:
          case this.parameters.states.start:
          Game.changeState(Game.parameters.states.loss);
          break;
          case this.parameters.states.game:
          case this.parameters.states.loss:

          /**
           *
           * TODO: We have a performance issue here.
           *
           */
          Game.elements.points.clear(true);

          /**
           *
           *
           *
           */
          Game.backgrounds.w.stopAllActions();

          /**
           *
           *
           *
           */
          if(this.saveFromWater()) {

            /**
             *
             *
             *
             */
            this.changeState(this.parameters.states.restore);
          } else {

            /**
             *
             *
             *
             */
            Game.setShake(0.5, 0.01);

            /**
             *
             *
             *
             */
            this.destroy();
          }
          break;
        }
      } else if(this.y > Game.backgrounds.w.y + Game.parameters.water.y[Game.parameters.state] + 50) {

        /**
         *
         *
         *
         */
        switch(this.parameters.state) {
          case this.parameters.states.restore:

          /**
           *
           *
           *
           */
          this.changeState(this.parameters.states.game);
          break;
        }
      }
      break;
    }

    /**
     *
     *
     *
     */
    switch(this.parameters.state) {
      case this.parameters.states.game:

      /**
       *
       *
       *
       */
      this.updateStatus(time);
      break;
      case this.parameters.states.loss:

      /**
       *
       *
       *
       */
      this.hideStatus();
      break;
    }
  },

  /**
   *
   *
   *
   */
  updateSound: function() {

    /**
     *
     *
     *
     */
    this.parameters.sound.id.repeat = Sound.play(resources.main.sound.character.engine.repeat);

    /**
     *
     *
     *
     */
    this.parameters.sound.f = function() {

      /**
       *
       *
       *
       */
      if(this.parameters.state === this.parameters.states.game || this.parameters.state === this.parameters.states.loss) {

        /**
         *
         *
         *
         */
        this.parameters.sound.id.repeat = Sound.play(resources.main.sound.character.engine.repeat);
      } else {

        /**
         *
         *
         *
         */
        clearInterval(this.parameters.sound.handler);
      }
    }.bind(this);
    this.parameters.sound.handler = setInterval(this.parameters.sound.f, this.parameters.sound.time);
  },

  /**
   *
   *
   *
   */
  saveFromWater: function() {
    /**
     *
     *
     *
     */
    var count = Data.get(false, properties.creatures[1]);

    /**
     *
     *
     *
     */
    for(var i = 0; i < count; i++) {
      if(probably(25)) {

        /**
         *
         *
         *
         */
        Game.stegosaurus.x = this.x - 200;
        Game.stegosaurus.y = this.y;

        /**
         *
         *
         *
         */
        Game.stegosaurus.create().runAction(
          cc.Sequence.create(
            cc.EaseSineInOut.create(
              cc.MoveBy.create(0.2, {
                x: 0,
                y: 180
              })
            ),
            cc.DelayTime.create(0.5),
            cc.EaseSineInOut.create(
              cc.MoveBy.create(0.2, {
                x: 0,
                y: -180
              })
            ),
            cc.CallFunc.create(Game.stegosaurus.destroy, Game.stegosaurus)
          )
        );

        /**
         *
         *
         *
         */
        Sound.play(resources.main.sound.creatures.stegosaurus);

        /**
         *
         *
         *
         */
        return true;
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
  pauseSchedulerAndActions: function() {

    /**
     *
     *
     *
     */
    this.parameters.scheduler++;

    /**
     *
     *
     *
     */
    if(this.parameters.scheduler === 1) {

      /**
       *
       *
       *
       */
      this._super();

      /**
       *
       *
       *
       */
      this.smokes.pauseSchedulerAndActions();

      /**
       *
       *
       *
       */
      clearInterval(this.parameters.sound.handler);

      /**
       *
       *
       *
       */
      Sound.stop(this.parameters.sound.id.repeat);
    }
  },
  resumeSchedulerAndActions: function() {

    /**
     *
     *
     *
     */
    this.parameters.scheduler--;

      /**
       *
       *
       *
       */
      if(this.parameters.scheduler === 0) {

      /**
       *
       *
       *
       */
      this._super();

      /**
       *
       *
       *
       */
      this.smokes.resumeSchedulerAndActions();

      /**
       *
       *
       *
       */
      if(this.state.create && (this.parameters.state == this.parameters.states.game || this.parameters.state == this.parameters.states.loss)) {
        this.updateSound();
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
    this.updateStates(time * this.parameters.time);
  }
});
