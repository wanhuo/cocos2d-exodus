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
        loss: 6,
        tutorial: 7
      },
      water: {
        speed: [
          0,

          0,
          0,
          20,
          30,
          100,
          0
        ],
        y: [
          0,

          0,
          0,
          240,
          240,
          100,
          0
        ]
      },
      offset: {
        x: {
          min: 0,
          max: Camera.center.x / 4
        },
        y: {
          min: 0,
          max: Camera.center.y / 4
        }
      },
      scale: {
        min: 0.35,
        max: 1.0,
        position: {
          min: 450,
          max: 2560
        }
      },
      backgrounds: {
        position: {
          min: -1280,
          max: 0,
          ratio: 3
        }
      },
      camera: {
        center: 450,
        x: 0,
        y: 0,
        width: Camera.width,
        height: Camera.height
      },
      tutorial: {
        state: false,
        current: false
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
    this.h = new Background(this);

    /**
     *
     * 
     *
     */
    this.backgrounds = {
      d: new Background(this.h),
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
    this.splash = new BackgroundColor(false, cc.color.WHITE);
    this.splash.retain();

    /**
     *
     * 
     *
     */
    this.elements = {};
    this.elements.backgrounds = [
      new Entity(resources.main.backgrounds[0], this.backgrounds.g),
      new Entity(resources.main.backgrounds[1], this.backgrounds.g)
    ];
    this.elements.parallaxes = {
      clouds1: new ParallaxEntity.Infinity(resources.main.clouds[0], this.backgrounds.game).addEntity(new Cloud(resources.main.clouds[0])),
      clouds2: new ParallaxEntity.Infinity(resources.main.clouds[1], this.backgrounds.game).addEntity(new Cloud(resources.main.clouds[1])),
      stars1: new ParallaxEntity.Infinity(resources.main.stars[0], this.backgrounds.game).addEntity(new Star(resources.main.stars[0])),
      stars2: new ParallaxEntity.Infinity(resources.main.stars[1], this.backgrounds.game).addEntity(new Star(resources.main.stars[1])),
      mountains1: new ParallaxEntity.Infinity(resources.main.mountain, this.backgrounds.game).addEntity(new Mountain),
      mountains2: new ParallaxEntity.Infinity(resources.main.mountain, this.backgrounds.game).addEntity(new Mountain),
      trees1: new ParallaxEntity.Infinity(resources.main.trees[0], this.backgrounds.game).addEntity(new Tree(resources.main.trees[0])),
      trees2: new ParallaxEntity.Infinity(resources.main.trees[1], this.backgrounds.game).addEntity(new Tree(resources.main.trees[1])),
      trees3: new ParallaxEntity.Infinity(resources.main.trees[2], this.backgrounds.game).addEntity(new Tree(resources.main.trees[2])),
      slides: new ParallaxEntity.Infinity(resources.main.slide, this.backgrounds.game).addEntity(new Slide)
    };
    this.elements.ground = new ParallaxEntity.Infinity(resources.main.ground, this.backgrounds.game).addEntity(new Ground);
    this.elements.water3 = new ParallaxEntity.Infinity(resources.main.water[2], this.backgrounds.w).addEntity(
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
    );
    this.elements.water2 = new ParallaxEntity.Infinity(resources.main.water[1], this.backgrounds.w).addEntity(
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
    );
    this.elements.fishes = new Manager(2, new Fish, this.backgrounds.w);
    this.elements.water1 = new ParallaxEntity.Infinity(resources.main.water[0], this.backgrounds.w).addEntity(
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
    );
    this.elements.explanation = new Explanation;
    this.elements.baloons = new Manager(1, new Baloon, this.backgrounds.game);
    this.elements.people = new Manager(10, new People, this.backgrounds.game);
    this.elements.points = new Points;
    this.elements.name = new Name;
    this.elements.character = new Character;
    this.elements.moon = new Moon;
    this.elements.counter = new Counter;

    /**
     *
     * 
     *
     */
    this.buttons = {
      play: new Button(resources.main.buttons.play, 1, 1, this.backgrounds.menu, this.onPlay.bind(this)),
      like: new Button(resources.main.buttons.like, 1, 1, this.backgrounds.b, this.onLike.bind(this)),
      leaderboard: new Button(resources.main.buttons.leaderboard, 1, 1, this.backgrounds.b, this.onLeaderboard.bind(this)),
      achievements: new Button(resources.main.buttons.achievements, 1, 1, this.backgrounds.b, this.onAchievements.bind(this)),
      sound: new Button(resources.main.buttons.sound, 2, 1, this.backgrounds.b, this.onSound.bind(this))
    };

    /**
     *
     * 
     *
     */
    this.elements.ground.setBlendFunc(gl.ONE, gl.ZERO);

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
    this.h.setLocalZOrder(200);

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
      this.elements.backgrounds[i].setScaleX((Camera.width + 100) / this.elements.backgrounds[i].width);
      this.elements.backgrounds[i].setScaleY((Camera.height + 100) / this.elements.backgrounds[i].height);

      /**
       *
       *
       *
       */
      this.elements.backgrounds[i].setLocalZOrder(i);

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
    Visiblities.setup();

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
  onEnter: function() {
    this._super();

    /**
     *
     *
     *
     */
    Music.play(resources.main.music.background, true);

    /**
     *
     *
     *
     */
    this.changeState(this.parameters.states.menu);
  },
  onExit: function() {
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
      Character.onTouchBegan(touch, e);
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
        this.elements.people.get(i).parameters.time++;
      }
    }

    /**
     *
     *
     *
     */
    else if(this.parameters.state === this.parameters.states.tutorial) {

      /**
       *
       *
       *
       */
      this.parameters.tutorial.current.onAction();
    }

    /**
     *
     *
     *
     */
    return Entity.prototype.onTouchBegan.call(this, touch, e);
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
      Character.onTouchEnded(touch, e);
    }

    /**
     *
     *
     *
     */
    return Entity.prototype.onTouchEnded.call(this, touch, e);
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
    Services.scores.show(Config.services.leaderboards.best);

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
    Character.onSave();

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
    Character.changeState(Character.parameters.states.animation);

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
    Character.changeState(Character.parameters.states.prepare);

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
    this.updateCamera();

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
    this.backgrounds.b.stopAllActions();
    this.backgrounds.b.y = 0;

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
    this.elements.baloons.clear();

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
    if(!Tutorial.show(1)) {

      /**
       *
       *
       *
       */
      Plugins.admob.show(Plugins.ad.types.banner);
    }
  },
  onStart: function() {

    /**
     *
     *
     *
     */
    if(this.backgrounds.b.getNumberOfRunningActions() < 1) {

      /**
       *
       *
       *
       */
      this.backgrounds.b.runAction(
        cc.Sequence.create(
          cc.EaseBounceOut.create(
            cc.MoveTo.create(1.0, {
                x: 0,
                y: 270
              }
            )
          )
        )
      );
    }

    /**
     *
     *
     *
     */
    Tutorial.show(2);
  },
  onGame: function() {

    /**
     *
     *
     *
     */
    Character.changeState(Character.parameters.states.game);

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
    this.backgrounds.w.stopAllActions();

    /**
     *
     *
     *
     */
    if(!this.splash.parent) this.addChild(this.splash);

    /**
     *
     *
     *
     */
    this.splash.stopAllActions();

    /**
     *
     *
     *
     */
    this.splash.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(Character.state.create ? 0.0 : 0.5),
        cc.FadeTo.create(0.2, 255),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          Character.setSlotsToSetupPoseCustom();

          /**
           *
           *
           *
           */
          this.changeState(this.parameters.states.prepare);

          /**
           *
           *
           *
           */
          this.resetParallaxes();

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
            Plugins.admob.show(Plugins.ad.types.interstitial);
          }
        }.bind(this)),
        cc.DelayTime.create(0.5),
        cc.FadeOut.create(0.5),
        cc.CallFunc.create(this.splash.removeFromParent, this.splash)
      )
    );

    /**
     *
     *
     *
     */
    Analytics.sendEvent('System events', 'Game finish', '', '');
  },
  onTutorial: function(reverse) {

    /**
     *
     * 
     *
     */
    if(reverse) {

      /**
       *
       * 
       *
       */
     this.parameters.state = this.parameters.tutorial.state;

      /**
       *
       * 
       *
       */
     this.parameters.tutorial.state = false;

      /**
       *
       * 
       *
       */
      this.elements.people.resumeSchedulerAndActions();
      Character.resumeSchedulerAndActions();

      /**
       *
       * 
       *
       */
      this.backgrounds.d.resumeSchedulerAndActions();

      /**
       *
       * 
       *
       */
      this.scheduleUpdate();
    } else {

      /**
       *
       * 
       *
       */
      this.elements.people.pauseSchedulerAndActions();
      Character.pauseSchedulerAndActions();

      /**
       *
       * 
       *
       */
      this.backgrounds.d.pauseSchedulerAndActions();

      /**
       *
       * 
       *
       */
      this.unscheduleUpdate();
    }
  },

  /**
   *
   *
   *
   */
  resetParallaxes: function() {

    /**
     *
     *
     *
     */
    this.backgrounds.game.children.each(function(element) {
      if(element.reset) {
        element.reset();
      }
    });

    /**
     *
     *
     *
     */
    this.elements.water1.reset();
    this.elements.water2.reset();
    this.elements.water3.reset();
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
      case this.parameters.states.tutorial:
      this.onTutorial();
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
  updateTutorial: function(time) {
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
    this.backgrounds.w.y += this.parameters.water.speed[this.parameters.state] * time;
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
      if(probably(1)) {
        this.elements.baloons.create();
      }
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
    if(!this.elements.water1.parent) return false;

    /**
     *
     *
     *
     */
    if(this.elements.fishes.count().count < this.elements.fishes.count().capacity) {
      if(probably(50)) {
        this.elements.fishes.create();
      }
    }
  },

  /**
   *
   * 
   *
   */
  updateCamera: function(time) {

    /**
     *
     *
     *
     */
    this.backgrounds.game.x = -Character.x + Camera.center.x;
    this.backgrounds.game.y = min(-this.backgrounds.w.y, -Character.y + Camera.center.y / this.backgrounds.d.scale);

    /**
     *
     *
     *
     */
    this.backgrounds.d.scale = max(1.0 - 1.0 / (this.parameters.scale.position.max / (Character.y - this.backgrounds.w.y - this.parameters.scale.position.min)), this.parameters.scale.min);

    /**
     *
     *
     *
     */
    this.backgrounds.g.y = min(0, max(this.parameters.backgrounds.position.min, -(Character.y - (Camera.center.y / this.parameters.scale.min)) / this.parameters.backgrounds.position.ratio));

    /**
     *
     *
     *
     */
    this.h.x = max(-this.parameters.offset.x.max, this.parameters.offset.x.max / max(1000 / this.backgrounds.game.x)) * this.parallax.scale();
    this.h.y = max(-this.parameters.offset.y.max, this.parameters.offset.y.max / max(1000 / this.backgrounds.game.y)) * this.parallax.scale();

    /**
     *
     *
     *
     */
    this.parameters.camera.x = abs(this.backgrounds.game.x);
    this.parameters.camera.y = abs(this.backgrounds.game.y);

    /**
     *
     *
     *
     */
    this.parameters.camera.width = Camera.width / this.backgrounds.d.scale;
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
      case this.parameters.states.tutorial:
      this.updateTutorial(time);
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
      this.updateWater(time);

      /**
       *
       * 
       *
       */
      this.updateCamera(time);
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

    /**
     *
     * 
     *
     */
    Visiblities.update();
  },

  /**
   *
   * 
   *
   */
  update: function(time) {
    this._super(time * Character.parameters.time);

    /**
     *
     * 
     *
     */
    this.updateStates(time * Character.parameters.time);
  },

  /**
   *
   * 
   *
   */
  parallax: {

    /**
     *
     * 
     *
     */
    scale: function() {
      return (Game.parameters.state === Game.parameters.states.game ? (1.0 + (1.0 - Game.backgrounds.d.getScale())) : 1);
    },

    /**
     *
     * 
     *
     */
    convertation: function() {
      return Game.backgrounds.game.x - Camera.width * Game.parallax.scale();
    },

    /**
     *
     * 
     *
     */
    reset: function() {
      return abs(Game.backgrounds.game.x);
    }
  }
});
