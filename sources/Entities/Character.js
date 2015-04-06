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
        loss: 5
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
            index: 6,
            name: 'engine-start-complete',
            time: 1.0,
            loop: false
          }
        }
      },
      skins: [
        '1',
        '2',
        '3'
      ],
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
          x: 0,
          y: 0,
          increase: {
            x: 100,
            y: 0.0
          },
          setup: {
            x: 1250 / 1.5,
            y: 750 / 1.5
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
          y: 4.5 / 1.5,
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
        id: false,
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
    this.setSkin(this.parameters.skins.random());

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
    this.status = new Entity(resources.main.character.status, this);this.status.setColor(cc.color.GREEN);

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
    this.shadow.create();

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
    this.setSkin(this.parameters.skins.random());
  },
  onDestroy: function() {
    this._super();

    /**
     *
     *
     *
     */
    if(this.parameters.sound.handler) {
      clearInterval(this.parameters.sound.handler);
    }

    /**
     *
     *
     *
     */
    if(this.parameters.sound.id) {

      /**
       *
       *
       *
       */
      Sound.stop(this.parameters.sound.id);

      /**
       *
       *
       *
       */
      this.parameters.sound.id = false
    }

    /**
     *
     *
     *
     */
    this.shadow.destroy();
    this.status.destroy();

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
    if(this.parameters.creation) {
      clearTimeout(this.parameters.creation);
    }

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
    this.parameters.active = true;
    this.parameters.locked = true;
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
  onGame: function() {

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
      Tutorial.show(3);

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

      /**
       *
       *
       *
       */
      this.status.create().attr({
        x: 0,
        y: 21,
        opacity: 0
      });
   }.bind(this), 2500);

    /**
     *
     *
     *
     */
    this.parameters.sound.id = Sound.play(resources.main.sound.character.engine.repeat);

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
        this.parameters.sound.id = Sound.play(resources.main.sound.character.engine.repeat);
      } else {

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
        this.parameters.sound.handler = false;
      }
    }.bind(this);
    this.parameters.sound.handler = setInterval(this.parameters.sound.f, this.parameters.sound.time);

    /**
     *
     *
     *
     */
    Plugins.admob.hide(Plugins.ad.types.banner);
  },
  onLoss: function() {

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
    this.parameters.time = 0;

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
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          Tutorial.show(5);
        }),
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.5, 1.0)
        ),
        cc.CallFunc.create(function() {

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
    Game.elements.explanation.x = this.x;
    Game.elements.explanation.y = this.y;
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
      if(Tutorial.show(5)) return false;

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
            this.parameters.time = 1.0;

            /**
             *
             *
             *
             */
            this.smokes.resumeSchedulerAndActions();
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
      Sound.play(resources.main.sound.character.engine.start);

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
      switch(this.updatePoint()) {
        default:

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
        this.parameters.active = this.parameters.speed.state = true;

        /**
         *
         * 
         *
         */
        this.parameters.speed.max.x += this.parameters.speed.max.increase.x;
        this.parameters.speed.max.y += this.parameters.speed.max.increase.y;

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
        case 1:

        /**
         *
         *
         *
         */
        Tutorial.show(4);

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
      }
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
        if(Game.splash.getNumberOfRunningActions() > 0) return false;

        /**
         *
         *
         *
         */
        if(!Game.splash.parent) Game.addChild(Game.splash);

        /**
         *
         *
         *
         */
        Game.splash.runAction(
          cc.Sequence.create(
            cc.EaseSineInOut.create(
              cc.FadeIn.create(0.2)
            ),
            cc.CallFunc.create(function() {

              /**
               *
               *
               *
               */
              this.destroy();
            }.bind(this))
          )
        );
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
  setSlotsToSetupPoseCustom: function() {

    /**
     *
     *
     *
     */
    if(this.parameters.sound.handler) {
      clearInterval(this.parameters.sound.handler);
    }

    /**
     *
     *
     *
     */
    if(this.parameters.sound.id) {

      /**
       *
       *
       *
       */
      Sound.stop(this.parameters.sound.id);

      /**
       *
       *
       *
       */
      this.parameters.sound.id = false
    }

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
      this.smokes.create(this);
    }

    /**
     *
     *
     *
     */
    this.updateStatus();

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
    this.updateGame(time, 2);
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
        parameters.speed.y += parameters.speed.increase.y * this.parameters.time;
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
     * TODO: Whe have a performance issue here.
     *
     */
    Game.elements.points.clear(/*true*/false);

    /**
     *
     * 
     *
     */
    var probably = 16;

    /**
     *
     * 
     *
     */
    var count = -probably / 2;

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
      if(count > 0 && count % probably === 0) {

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
          return point.getCurrentFrameIndex();
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
    switch(this.updatePoint()) {
      default:
      this.status.opacity = 0;
      break;
      case 0:
      this.status.opacity = 255;
      break;
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
      case this.parameters.states.loss:
      this.updateLoss(time);
      break;
    }

    /**
     *
     * 
     *
     */
    if(Game.backgrounds.w.y + Game.parameters.water.y[Game.parameters.state] >= this.y) {
      switch(Game.parameters.state) {
        case Game.parameters.states.prepare:
        case Game.parameters.states.start:
        Game.changeState(Game.parameters.states.loss);
        break;
        case Game.parameters.states.game:

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
        break;
      }
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
  resumeSchedulerAndActions: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.smokes.resumeSchedulerAndActions();
  },
  pauseSchedulerAndActions: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.smokes.pauseSchedulerAndActions();
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
