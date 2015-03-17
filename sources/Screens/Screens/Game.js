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
        game: 3,
        loss: 4
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
    this.backgrounds.menu = new Background(this.backgrounds.game);

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
      background: new Entity(resources.main.background, this.backgrounds.s, true),
      parallaxes: [
        new ParallaxEntity.Infinity(resources.main.clouds[0], this.backgrounds.game).addEntity(new Cloud),
        new ParallaxEntity.Infinity(resources.main.mountains[0], this.backgrounds.game).addEntity(new Mountain),
        new ParallaxEntity.Infinity(resources.main.mountains[0], this.backgrounds.game).addEntity(new Mountain),
        new ParallaxEntity.Infinity(resources.main.trees[0], this.backgrounds.game).addEntity(new Tree(resources.main.trees[0])),
        new ParallaxEntity.Infinity(resources.main.trees[1], this.backgrounds.game).addEntity(new Tree(resources.main.trees[1])),
        new ParallaxEntity.Infinity(resources.main.trees[2], this.backgrounds.game).addEntity(new Tree(resources.main.trees[2]))
      ],
      ground: new ParallaxEntity.Infinity(resources.main.ground, this.backgrounds.game).addEntity(new Ground),
      water3: new ParallaxEntity.Infinity(resources.main.water[2], this.backgrounds.game).addEntity(
        new Parallax(
          resources.main.water[2], 1, 1,
          {
            x: 100,
            y: 0
          },
          {
            x: 0,
            y: 250
          }
        )
      ),
      water2: new ParallaxEntity.Infinity(resources.main.water[1], this.backgrounds.game).addEntity(
        new Parallax(
          resources.main.water[1], 1, 1,
          {
            x: -100,
            y: 0
          },
          {
            x: 0,
            y: 200
          }
        )
      ),
      water1: new ParallaxEntity.Infinity(resources.main.water[0], this.backgrounds.game).addEntity(
        new Parallax(
          resources.main.water[0], 1, 1,
          {
            x: 100,
            y: 0
          }
        )
      ),
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
      //settings: new Button(resources.main.buttons.settings, this.backgrounds.b, 1, 1, 1, 1, this.onSettings.bind(this)),
      leaderboard: new Button(resources.main.buttons.leaderboard, this.backgrounds.b, 1, 1, 1, 1, this.onLeaderboard.bind(this)),
      achievements: new Button(resources.main.buttons.achievements, this.backgrounds.b, 1, 1, 1, 1, this.onAchievements.bind(this)),
      sound: new Button(resources.main.buttons.sound, this.backgrounds.b, 1, 1, 2, 1, this.onSound.bind(this))
    };

    /**
     *
     * 
     *
     */
    this.backgrounds.menu.setLocalZOrder(100);
    this.backgrounds.game.setLocalZOrder(200);

    /**
     *
     * 
     *
     */
    this.backgrounds.s.setLocalZOrder(100);
    this.backgrounds.d.setLocalZOrder(200);
    this.backgrounds.b.setLocalZOrder(300);

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
      y: Camera.center.y - 160
    });
    this.buttons.sound.create().attr({
      x: Camera.center.x - 37,
      y: Camera.center.y - 160
    });
    this.buttons.leaderboard.create().attr({
      x: Camera.center.x + 37,
      y: Camera.center.y - 160
    });
    this.buttons.achievements.create().attr({
      x: Camera.center.x + 111,
      y: Camera.center.y - 160
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
    this.elements.background.setBlendFunc(gl.ONE, gl.ZERO);

    /**
     *
     *
     *
     */
    this.elements.background.setOrientationConfig(new OrientationConfig({
      portrait: {
        on: function() {

          /**
           *
           *
           *
           */
          this.setScaleX(Camera.width / this.width);
          this.setScaleY(Camera.height / this.height);
        }.bind(this.elements.background)
      },
      landscape: {
        on: function() {

          /**
           *
           *
           *
           */
          this.setScaleX(Camera.width / this.width);
          this.setScaleY(Camera.height / this.height);
        }.bind(this.elements.background)
      }
    }));

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
    this.backgrounds.game.y = -160;
    this.backgrounds.menu.y = 160;

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
    if(this.parameters.state === this.parameters.states.game) {

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
    if(this.parameters.state === this.parameters.states.game) {

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
      cc.EaseSineInOut.create(
        cc.MoveTo.create(1.0, {
          x: this.buttons.like.x,
          y: Camera.height - 50
        })
      )
    );
    this.buttons.sound.runAction(
      cc.EaseSineInOut.create(
        cc.MoveTo.create(1.0, {
          x: this.buttons.sound.x,
          y: Camera.height - 50
        })
      )
    );
    this.buttons.leaderboard.runAction(
      cc.EaseSineInOut.create(
        cc.MoveTo.create(1.0, {
          x: this.buttons.leaderboard.x,
          y: Camera.height - 50
        })
      )
    );
    this.buttons.achievements.runAction(
      cc.EaseSineInOut.create(
        cc.MoveTo.create(1.0, {
          x: this.buttons.achievements.x,
          y: Camera.height - 50
        })
      )
    );

    /**
     *
     *
     *
     */
    this.changeState(this.parameters.states.animation);
  },
  onSettings: function() {

    /**
     *
     *
     *
     */
    // TODO:
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
    this.elements.counter.create();

    /**
    *
    *
    *
    */
    this.changeState(this.parameters.states.game);

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
    Ad.Admob.show(cc.Ad.Banner, {
    success: function() {
    }.bind(this),
    error: function() {
    }
    });
  },
  onGame: function() {

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
    Analytics.sendEvent('System events', 'Game start', '', '');
  },
  onLoss: function() {

    /**
     *
     *
     *
     */
    this.splash.runAction(
      cc.Sequence.create(
        cc.FadeIn.create(0.2),
        cc.DelayTime.create(0.1),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.elements.character.create().setElement(this.elements.boxes.last(), true);

          /**
           *
           *
           *
           */
          this.backgrounds.game.runAction(
            cc.EaseSineInOut.create(
              cc.MoveTo.create(0.2 * this.elements.counter.values.scores.current, {
                x: -this.elements.character.x + 100,
                y: 0
              })
            )
          );

          /**
           *
           *
           *
           */
          this.changeState(this.parameters.states.game);
        }.bind(this)),
        cc.DelayTime.create(0.1),
        cc.FadeOut.create(0.5)
      )
    );

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
  updateLoss: function(time) {
  },
  updateGame: function(time) {
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
      case this.parameters.states.loss:
      this.updateLoss(time);
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
