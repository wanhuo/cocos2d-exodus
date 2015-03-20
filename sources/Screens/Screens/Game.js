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

Game = Screen.extend({

  /**
   *
   * 
   *
   */
  ctor: function() {
    this._super();

    /**
     *
     * 
     *
     */
    Game = this;

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
        start: 4,
        game: 5,
        loss: 6
      },
      water: {
        speed: 30.0,
        y: 180
      },
      scale: {
        min: 0.25,
        max: 1.0,
        position: {
          min: 450,
          max: 2000
        }
      },
      camera: {
        center: 450
      },
      ad: {
        interstitial: {
          current: 0,
          times: 8
        }
      }
    };

    /**
     *
     * 
     *
     */
    this.backgrounds = {
      d: new Background(this),
      s: new Background(this),
      b: new Background(this)
    };

    /**
     *
     * 
     *
     */
    this.backgrounds.game = new Background(this.backgrounds.d);
    this.backgrounds.menu = new Background(this.backgrounds.d);

    /**
     *
     * 
     *
     */
    this.backgrounds.w = new Background(this.backgrounds.d);
    this.backgrounds.g = new Background(this.backgrounds.s);

    /**
     *
     * 
     *
     */
    this.splash = new BackgroundColor(this, cc.color.WHITE);

    /**
     *
     * 
     *
     */
    this.elements = {
      backgrounds: [
        new Entity(resources.main.backgrounds[0], this.backgrounds.g),
        new Entity(resources.main.backgrounds[1], this.backgrounds.g)
      ],
      parallaxes: [
        new ParallaxEntity.Infinity(resources.main.clouds[0], this.backgrounds.game).addEntity(new Cloud),
        new ParallaxEntity.Infinity(resources.main.mountains[0], this.backgrounds.game).addEntity(new Mountain),
        new ParallaxEntity.Infinity(resources.main.mountains[0], this.backgrounds.game).addEntity(new Mountain),
        new ParallaxEntity.Infinity(resources.main.trees[0], this.backgrounds.game).addEntity(new Tree(resources.main.trees[0])),
        new ParallaxEntity.Infinity(resources.main.trees[1], this.backgrounds.game).addEntity(new Tree(resources.main.trees[1])),
        new ParallaxEntity.Infinity(resources.main.trees[2], this.backgrounds.game).addEntity(new Tree(resources.main.trees[2]))
      ],
      ground: new ParallaxEntity.Infinity(resources.main.ground, this.backgrounds.game).addEntity(new Ground),
      water3: new ParallaxEntity.Infinity(resources.main.water[2], this.backgrounds.w).addEntity(
        new Water(
          resources.main.water[2],
          {
            x: 100,
            y: 0
          },
          {
            x: 0,
            y: 180
          }
        )
      ),
      water2: new ParallaxEntity.Infinity(resources.main.water[1], this.backgrounds.w).addEntity(
        new Water(
          resources.main.water[1],
          {
            x: -100,
            y: 0
          },
          {
            x: 0,
            y: 140
          }
        )
      ),
      fishes: new Manager(2, new Fish, this.backgrounds.w),
      water1: new ParallaxEntity.Infinity(resources.main.water[0], this.backgrounds.w).addEntity(
        new Water(
          resources.main.water[0],
          {
            x: 100,
            y: 0
          },
          {
            x: 0,
            y: -50
          }
        )
      ),
      explanation: new Explanation,
      baloons: new Manager(1, new Baloon, this.backgrounds.game),
      people: new Manager(10, new People, this.backgrounds.b),
      points: new Points,
      name: new Name,
      character: new Character,
      counter: new Counter
    };

    /**
     *
     * 
     *
     */
    this.buttons = {
      play: new Button(resources.main.buttons.play, this.backgrounds.menu, 1, 1, 1, 1, this.onPlay.bind(this)),
      like: new Button(resources.main.buttons.like, this.backgrounds.b, 1, 1, 1, 1, this.onLike.bind(this)),
      leaderboard: new Button(resources.main.buttons.leaderboard, this.backgrounds.b, 1, 1, 1, 1, this.onLeaderboard.bind(this)),
      achievements: new Button(resources.main.buttons.achievements, this.backgrounds.b, 1, 1, 1, 1, this.onAchievements.bind(this)),
      sound: new Button(resources.main.buttons.sound, this.backgrounds.b, 1, 1, 2, 1, this.onSound.bind(this))
    };

    /**
     *
     * 
     *
     */
    this.backgrounds.menu.setLocalZOrder(300);
    this.backgrounds.game.setLocalZOrder(200);

    /**
     *
     * 
     *
     */
    this.backgrounds.s.setLocalZOrder(100);
    this.backgrounds.d.setLocalZOrder(200);
    this.backgrounds.b.setLocalZOrder(300);
    this.backgrounds.w.setLocalZOrder(400);

    /**
     *
     * 
     *
     */
    this.backgrounds.w.retain();

    /**
     *
     * 
     *
     *
     *
     *
     *
     */
    this.buttons.play.create().attr({
      x: Camera.center.x,
      y: Camera.center.y + 110
    });
    this.buttons.like.create().attr({
      x: Camera.center.x - 111,
      y: Camera.center.y - 150
    });
    this.buttons.sound.create().attr({
      x: Camera.center.x - 37,
      y: Camera.center.y - 150
    });
    this.buttons.leaderboard.create().attr({
      x: Camera.center.x + 37,
      y: Camera.center.y - 150
    });
    this.buttons.achievements.create().attr({
      x: Camera.center.x + 111,
      y: Camera.center.y - 150
    });

    /**
     *
     * 
     *
     */
    this.elements.water1.runAction(
      cc.RepeatForever.create(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.MoveTo.create(3.0, {
              x: 0,
              y: 30
            })
          ),
          cc.EaseSineInOut.create(
            cc.MoveTo.create(3.0, {
              x: 0,
              y: 0
            })
          )
        )
      )
    );
    this.elements.water2.runAction(
      cc.RepeatForever.create(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.MoveTo.create(3.0, {
              x: 0,
              y: 20
            })
          ),
          cc.EaseSineInOut.create(
            cc.MoveTo.create(3.0, {
              x: 0,
              y: 0
            })
          )
        )
      )
    );
    this.elements.water3.runAction(
      cc.RepeatForever.create(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.MoveTo.create(3.0, {
              x: 0,
              y: 10
            })
          ),
          cc.EaseSineInOut.create(
            cc.MoveTo.create(3.0, {
              x: 0,
              y: 0
            })
          )
        )
      )
    );

    /**
     *
     *
     *
     */
    this.elements.water1.setLocalZOrder(10);

    /**
     *
     *
     *
     */
    this.elements.backgrounds[0].create().attr({
      x: Camera.center.x,
      y: Camera.center.y
    });
    this.elements.backgrounds[1].create().attr({
      x: Camera.center.x,
      y: Camera.center.y + Camera.height
    });

    /**
     *
     *
     *
     */
    for(var i = 0; i < this.elements.backgrounds.length; i++) {

      /**
       *
       *
       *
       */
      this.elements.backgrounds[i].setScaleX(Camera.width / this.elements.backgrounds[i].width);
      this.elements.backgrounds[i].setScaleY(Camera.height / this.elements.backgrounds[i].height);

      /**
       *
       *
       *
       */
      this.elements.backgrounds[i].setBlendFunc(gl.ONE, gl.ZERO);
    }

    /**
     *
     *
     *
     */
    this.splash.setLocalZOrder(1000);
    this.splash.setOpacity(0);

    /**
     *
     * 
     *
     */
    this.backgrounds.game.setScale(4.0);

    /**
     *
     * 
     *
     */
    this.backgrounds.game.y = 690;

    /**
     *
     * 
     *
     */
    this.updateSoundState();
  },

  /**
   *
   * 
   *
   */
  onShow: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.changeState(this.parameters.states.menu);
  },
  onHide: function() {
    this._super();
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
    if(this.parameters.state === this.parameters.states.start || this.parameters.state === this.parameters.states.game) {

      /**
       *
       *
       *
       */
      this.elements.character.onTouchBegan(touch, e);
    }

    /**
     *
     *
     *
     */
    else if(this.parameters.state === this.parameters.states.prepare) {

      /**
       *
       *
       *
       */
      for(var i = 0; i < this.elements.people.count().count; i++) {
        this.elements.people.get(i).parameters.up++;
      }
    }

    /**
     *
     *
     *
     */
    this.touch.touched = true;

    /**
     *
     *
     *
     */
    return true;
  },
  onTouchEnded: function(touch, e) {

    /**
     *
     *
     *
     */
    if(this.parameters.state === this.parameters.states.start || this.parameters.state === this.parameters.states.game) {

      /**
       *
       *
       *
       */
      this.elements.character.onTouchEnded(touch, e);

      /**
       *
       *
       *
       */
      Analytics.sendEvent('Game events', 'Click', '', '');
    }

    /**
     *
     *
     *
     */
    this.touch.touched = false;
  },

  /**
   *
   * 
   *
   */
  onPlay: function() {

    /**
     *
     *
     *
     */
    this.buttons.play.unregister();
    this.buttons.like.unregister();
    this.buttons.sound.unregister();
    this.buttons.leaderboard.unregister();
    this.buttons.achievements.unregister();

    /**
     *
     *
     *
     */
    this.buttons.like.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.2, 0.0)
        ),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.y = Camera.height - 50;
        }.bind(this.buttons.like)),
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.5, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.buttons.sound.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.2, 0.0)
        ),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.y = Camera.height - 50;
        }.bind(this.buttons.sound)),
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.5, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.buttons.leaderboard.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.2, 0.0)
        ),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.y = Camera.height - 50;
        }.bind(this.buttons.leaderboard)),
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.5, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.buttons.achievements.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.2, 0.0)
        ),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.y = Camera.height - 50;
        }.bind(this.buttons.achievements)),
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.5, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.changeState(this.parameters.states.animation);
  },
  onLeaderboard: function() {

    /**
     *
     *
     *
     */
    Services.scores.show();

    /**
     *
     *
     *
     */
    Analytics.sendEvent('System events', 'Leaderboard open', '', '');
  },
  onAchievements: function() {

    /**
     *
     *
     *
     */
    Services.achievements.show();

    /**
     *
     *
     *
     */
    Analytics.sendEvent('System events', 'Achievements open', '', '');
  },
  onLike: function() {

    /**
     *
     *  
     *
     */
    Media.openStore();

    /**
     *
     *
     *
     */
    Analytics.sendEvent('System events', 'Store open', '', '');
  },
  onSound: function() {

    /**
     *
     *
     *
     */
    if(!Music.enabled || !Sound.enabled) {
      Music.changeState(true);
      Sound.changeState(true);
    } else {
      Music.changeState(false);
      Sound.changeState(false);
    }

    /**
     *
     *
     *
     */
    this.updateSoundState();

    /**
     *
     *
     *
     */
    Analytics.sendEvent('System events', 'Sound state was changed', '', '');
  },

  /**
   *
   * 
   *
   */
  updateSoundState: function() {

    /**
     *
     *
     *
     */
    if(!Music.enabled || !Sound.enabled) {
      Music.changeState(false);
      Sound.changeState(false);

      /**
       *
       *
       *
       */
      this.buttons.sound.setCurrentFrameIndex(1);
    } else {
      Music.changeState(true);
      Sound.changeState(true);

      /**
       *
       *
       *
       */
      this.buttons.sound.setCurrentFrameIndex(0);
    }
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
    this.elements.character.onSave();

    /**
     *
     *
     *
     */
    if(this.elements.people.count().count === 0) {

      /**
       *
       *
       *
       */
      this.elements.counter.clear();

      /**
       *
       *
       *
       */
      this.changeState(this.parameters.states.start);
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
    Services.signin();

    /**
     *
     *
     *
     */
    Music.play(resources.main.music.background, true);
  },
  onAnimation: function() {

    /**
     *
     *
     *
     */
    this.backgrounds.menu.removeFromParent();

    /**
     *
     *
     *
     */
    this.elements.character.changeState(this.elements.character.parameters.states.animation);

    /**
     *
     *
     *
     */
    this.elements.counter.create();

    /**
     *
     *
     *
     */
    this.backgrounds.game.runAction(
      cc.ScaleTo.create(0.5, 1.0)
    );

    /**
     *
     *
     *
     */
    this.backgrounds.game.runAction(
      cc.Sequence.create(
        cc.MoveTo.create(0.5, {
          x: 0,
          y: 0
        }),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.changeState(this.parameters.states.prepare);
        }.bind(this))
      )
    );
  },
  onPrepare: function() {

    /**
     *
     *
     *
     */
    this.elements.character.changeState(this.elements.character.parameters.states.prepare);

    /**
     *
     *
     *
     */
    this.buttons.like.register();
    this.buttons.sound.register();
    this.buttons.leaderboard.register();
    this.buttons.achievements.register();

    /**
     *
     *
     *
     */
    this.backgrounds.w.removeFromParent();
    this.backgrounds.game.addChild(this.backgrounds.w);

    /**
     *
     *
     *
     */
    this.backgrounds.w.stopAllActions();

    /**
     *
     *
     *
     */
    this.backgrounds.w.y = 0;

    /**
     *
     *
     *
     */
    this.backgrounds.b.y = 0;

    /**
     *
     *
     *
     */
    Counter.register();

    /**
     *
     *
     *
     */
    Game.backgrounds.d.setAnchorPoint({
      x: 0.5,
      y: 0.0
    });

    /**
     *
     *
     *
     */
    this.elements.points.clear();
    this.elements.fishes.clear();

    /**
     *
     *
     *
     */
    for(var i = 0; i < this.elements.people.count().capacity; i++) {
      this.elements.people.create();
    }

    /**
     *
     *
     *
     */
    Ad.Admob.show(cc.Ad.Banner, {
      success: function() {
      }.bind(this),
      error: function() {
      }
    });
  },
  onStart: function() {

    /**
     *
     *
     *
     */
    this.backgrounds.b.runAction(
      cc.EaseBounceOut.create(
        cc.MoveTo.create(1.0, {
            x: 0,
            y: 270
          }
        )
      )
    );

    /**
     *
     *
     *
     */
    Counter.unregister();
  },
  onGame: function() {

    /**
     *
     *
     *
     */
    this.elements.character.changeState(this.elements.character.parameters.states.game);

    /**
     *
     *
     *
     */
    this.backgrounds.w.runAction(
      cc.EaseSineInOut.create(
        cc.MoveTo.create(1.5, {
          x: 0,
          y: 0
        })
      )
    );

    /**
     *
     *
     *
     */
    Analytics.sendEvent('System events', 'Game start', '', '');
  },
  onLoss: function() {

    /**
     *
     *
     *
     */
    this.elements.people.clear();

    /**
     *
     *
     *
     */
    if(this.elements.character.y <= 0) {
      this.setShake(0.5, 0.01);
    }

    /**
     *
     *
     *
     */
    this.splash.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(this.elements.character.y <= 0 ? 0.5 : 0.0),
        cc.FadeIn.create(0.2),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.parameters.ad.interstitial.current++;
          if(this.parameters.ad.interstitial.current >= this.parameters.ad.interstitial.times) {
            this.parameters.ad.interstitial.current = 0;

              /**
               *
               *
               *
               */
              Ad.Admob.show(cc.Ad.Interstitial, {
                success: function() {
                }.bind(this),
                error: function() {
                }
              });
          }

          /**
           *
           *
           *
           */
          this.changeState(this.parameters.states.prepare);
        }.bind(this)),
        cc.DelayTime.create(0.5),
        cc.FadeOut.create(0.5)
      )
    );

    /**
     *
     *
     *
     */
    Analytics.sendEvent('System events', 'Game finish', '', '');
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
      case this.parameters.states.start:
      this.onStart();
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
  updateStart: function(time) {
  },
  updateLoss: function(time) {
  },
  updateGame: function(time) {
  },

  /**
   *
   * 
   *
   */
  updateWater: function(time) {

    /**
     *
     * 
     *
     */
    this.backgrounds.w.y += this.parameters.water.speed * time;

    /**
     *
     * 
     *
     */
    if(this.backgrounds.w.y >= this.parameters.water.y) {
      this.changeState(this.parameters.states.loss);
    }
  },

  /**
   *
   * 
   *
   */
  updateBaloons: function(time) {

    /**
     *
     *
     *
     */
    if(this.elements.baloons.count().count < this.elements.baloons.count().capacity) {
      this.elements.baloons.create();
    }
  },

  /**
   *
   * 
   *
   */
  updateFishes: function(time) {

    /**
     *
     *
     *
     */
    if(this.elements.fishes.count().count < this.elements.fishes.count().capacity) {
      this.elements.fishes.create();
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
      case this.parameters.states.start:
      this.updateStart(time);
      break;
      case this.parameters.states.loss:
      this.updateLoss(time);
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
    switch(this.parameters.state) {
      case this.parameters.states.start:
      this.updateWater(time);
      break;
    }

    /**
     *
     * 
     *
     */
    switch(this.parameters.state) {
      case this.parameters.states.prepare:
      case this.parameters.states.start:
      case this.parameters.states.game:

      /**
       *
       *
       *
       */
      this.backgrounds.game.x = -this.elements.character.x + Camera.center.x;
      this.backgrounds.game.y = min(0, -(this.elements.character.y * Game.backgrounds.d.getScale()) + this.parameters.camera.center);

      /**
       *
       *
       *
       */
      if(this.backgrounds.d.getNumberOfRunningActions() == 0) {
        if(this.elements.character.y >= this.parameters.scale.position.min) {
          this.backgrounds.d.scale = max(1.0 - 1.0 / (this.parameters.scale.position.max / (this.elements.character.y - this.parameters.scale.position.min)), this.parameters.scale.min);
        } else {
          this.backgrounds.d.scale = this.parameters.scale.max;
        }
      }

      /**
       *
       *
       *
       */
      if(this.elements.character.y > this.parameters.scale.position.max) {
        this.backgrounds.game.y = -(this.elements.character.y - this.parameters.scale.position.max);
        this.backgrounds.g.y = -(this.elements.character.y - this.parameters.scale.position.max);
      } else {
        this.backgrounds.g.y = 0;
      }
      break;
    }

    /**
     *
     * 
     *
     */
    this.updateBaloons(time);

    /**
     *
     * 
     *
     */
    this.updateFishes(time);
  },

  /**
   *
   * 
   *
   */
  update: function(time) {
    this._super(time * this.elements.character.parameters.time);

    /**
     *
     * 
     *
     */
    this.updateStates(time * this.elements.character.parameters.time);
  },

  /**
   *
   * 
   *
   */
  parallax: {
    scale: function() {
      return (Game.parameters.state === Game.parameters.states.game ? (1.0 + (1.0 - Game.backgrounds.d.getScale())) : 1);
    }
  }
});
