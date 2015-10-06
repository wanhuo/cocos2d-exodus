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

Finish = Popup.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(cc.color(132, 209, 200));

    /**
     *
     *
     *
     */
    Finish = this;

    /**
     *
     *
     *
     */
    this.parameters = {
      popup: {
        scheduler: true
      },
      animation: true,
      coins: {
        time: {
          current: 0,
          elapsed: 0
        }
      },
      disable: false,
      reward: {
        current: 0,
        total: 4
      },
      gift: {
        current: random(0, 15),
        total: 15
      }
    };

    /**
     *
     *
     *
     */
    this.coins = new Manager(10, new Entity(resources.main.finish.coin), this, true);

    /**
     *
     *
     *
     */
    this.elements = {
      rocket: new Spine(resources.main.character.json, resources.main.character.atlas, 1.0, this),
      hide: new Entity(resources.main.finish.pig.hide, this),
      hand: new Entity(resources.main.finish.hand, this),
      decoration: new Entity(resources.main.finish.decorations[0], this),
      pig: new Entity(resources.main.finish.pig.texture, this)
    };

    /**
     *
     *
     *
     */
    this.buttons = {
      continue: new Button(resources.main.finish.buttons.continue, 1, 2, this, this.hide.bind(this)),
      like: new Button(resources.main.buttons.like, 1, 2, this, Game.onLike.bind(Game)),
      rate: new Button(resources.main.buttons.rate, 1, 2, this, Game.onRate.bind(Game)),
      share: new Button(resources.main.buttons.share, 1, 2, this, Game.onShare.bind(this)),
      leaderboard: new Button(resources.main.buttons.leaderboard, 1, 2, this, Game.onLeaderboard.bind(Game)),
      achievements: new Button(resources.main.buttons.achievements, 1, 2, this, Game.onAchievements.bind(Game)),
      store: new Shop(resources.main.buttons.store, 1, 2, this, Game.onStore.bind(Game)),
      coins: new Button(resources.main.counter.coins, 1, 1, this, this.onCoins.bind(this)),
      noad: new Button(resources.main.buttons.lnoad, 1, 2, this, Game.onDisableAds.bind(Game)),
      sound: new Button(resources.main.buttons.sound, 2, 2, this, this.onSound.bind(this))
    };

    /**
     *
     *
     *
     */
    this.textes = {
      coins: new Text('button-text-coins', this.buttons.coins)
    };

    /**
     *
     *
     *
     */
    this.elements.pig.anchorY = 0;
    this.elements.hide.anchorY = -this.elements.pig.height / this.elements.hide.height;

    /**
     *
     *
     *
     */
    this.coins.setLocalZOrder(2);

    /**
     *
     *
     *
     */
    this.elements.hide.setLocalZOrder(1);
    this.elements.pig.setLocalZOrder(2);
    this.elements.hand.setLocalZOrder(2);
    this.elements.decoration.setLocalZOrder(2);

    /**
     *
     *
     *
     */
    this.buttons.continue.setLocalZOrder(1);
    this.buttons.like.setLocalZOrder(1);
    this.buttons.rate.setLocalZOrder(1);
    this.buttons.share.setLocalZOrder(1);
    this.buttons.leaderboard.setLocalZOrder(1);
    this.buttons.achievements.setLocalZOrder(1);
    this.buttons.store.setLocalZOrder(1);
    this.buttons.noad.setLocalZOrder(1);
    this.buttons.sound.setLocalZOrder(1);

    /**
     *
     *
     *
     */
    this.elements.hand.create().attr({
      x: Camera.center.x + 20,
      y: Camera.height - this.elements.hand.height / 2
    });
    this.elements.decoration.create().attr({
      x: Camera.center.x + 10,
      y: 40 + (Game.parameters.ad.disabled ? 0 : 100)
    });
    this.elements.pig.create().attr({
      x: Camera.center.x,
      y: 130 - this.elements.pig.height / 2 + (Game.parameters.ad.disabled ? 0 : 100)
    });
    this.elements.hide.create().attr({
      x: Camera.center.x,
      y: 130 - this.elements.pig.height / 2 + (Game.parameters.ad.disabled ? 0 : 100)
    });

    /**
     *
     *
     *
     */
    this.buttons.coins.create().attr({
      x: Camera.center.x,
      y: 420
    });
    this.buttons.continue.attr({
      x: Camera.center.x,
      y: Camera.center.y - 30 + (Game.parameters.ad.disabled ? 0 : 100)
    });
    this.buttons.sound.attr({
      x: Camera.center.x - 240,
      y: Camera.center.y - 90 + (Game.parameters.ad.disabled ? 0 : 100)
    });
    this.buttons.noad.attr({
      x: Camera.center.x - 240,
      y: Camera.center.y - 90 + (Game.parameters.ad.disabled ? 0 : 100)
    });
    this.buttons.like.attr({
      x: Camera.center.x - 200,
      y: Camera.center.y - 200 + (Game.parameters.ad.disabled ? 0 : 100)
    });
    this.buttons.rate.attr({
      x: Camera.center.x - 110,
      y: Camera.center.y - 270 + (Game.parameters.ad.disabled ? 0 : 100)
    });
    this.buttons.share.attr({
      x: Camera.center.x,
      y: Camera.center.y - 290 + (Game.parameters.ad.disabled ? 0 : 100)
    });
    this.buttons.leaderboard.attr({
      x: Camera.center.x + 110,
      y: Camera.center.y - 270 + (Game.parameters.ad.disabled ? 0 : 100)
    });
    this.buttons.achievements.attr({
      x: Camera.center.x + 200,
      y: Camera.center.y - 200 + (Game.parameters.ad.disabled ? 0 : 100)
    });
    this.buttons.store.attr({
      x: Camera.center.x + 240,
      y: Camera.center.y - 90 + (Game.parameters.ad.disabled ? 0 : 100)
    });

    /**
     *
     *
     *
     */
    this.textes.coins.create().attr({
      x: this.buttons.coins.width / 2,
      y: this.buttons.coins.height / 2
    });

    /**
     *
     *
     *
     */
    this.buttons.continue.unregister();

    /**
     *
     *
     *
     */
    this.elements.rocket.setLocalZOrder(0);

    /**
     *
     *
     *
     */
    this.elements.rocket.needScheduleUpdate = true;
  },

  /**
   *
   *
   *
   */
  onTouch: function() {

    /**
     *
     *
     *
     */
    if(this.parameters.animation) {

      /**
       *
       *
       *
       */
      if(this.elements.hand.getNumberOfRunningActions() > 0) return false;

      /**
       *
       *
       *
       */
      Counter.values.coins.total += Counter.values.coins.current;
      Counter.values.coins.current = 0;

      /**
       *
       *
       *
       */
      this.finishAnimation();
    }
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
    this.startAnimation();

    /**
     *
     * 
     *
     */
    this.updateSoundState();
  },
  onExit: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.hideButtons();

    /**
     *
     *
     *
     */
    this.hideCounter();

    /**
     *
     *
     *
     */
    this.buttons.continue.unregister();
  },

  /**
   *
   *
   *
   */
  onCoins: function() {
  },

  /**
   *
   *
   *
   */
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
  onAnimationStart: function() {

    /**
     *
     *
     *
     */
    this.updateTextData();

    /**
     *
     *
     *
     */
    this.parameters.animation = true;

    /**
     *
     *
     *
     */
    this.elements.hand.y = Camera.height + this.elements.hand.height / 2;

    /**
     *
     *
     *
     */
    if(Counter.values.coins.current > 0) {

      /**
       *
       *
       *
       */
      this.buttons.coins.opacity = 255;

      /**
       *
       *
       *
       */
      this.elements.hand.runAction(
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.elements.hand.x,
            y: Camera.height - this.elements.hand.height / 2
          })
        )
      );
    } else {

      /**
       *
       *
       *
       */
      this.buttons.coins.opacity = 0;

      /**
       *
       *
       *
       */
      this.finishAnimation();
    }
  },
  onAnimationFinish: function() {

    /**
     *
     *
     *
     */
    Counter.updateTextData();

    /**
     *
     *
     *
     */
    this.parameters.animation = false;

    /**
     *
     *
     *
     */
    this.buttons.coins.runAction(
      cc.EaseSineInOut.create(
        cc.FadeOut.create(0.1)
      )
    );

    /**
     *
     *
     *
     */
    this.elements.hand.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.elements.hand.x,
            y: Camera.height + this.elements.hand.height / 2
          })
        ),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.showButtons();

          /**
           *
           *
           *
           */
          this.showCounter();
        }.bind(this))
      )
    );

    /**
     *
     *
     *
     */
    Data.set(false, properties.coins, Counter.values.coins.total);
  },

  /**
   *
   *
   *
   */
  startAnimation: function() {

    /**
     *
     *
     *
     */
    this.onAnimationStart();
  },
  finishAnimation: function() {

    /**
     *
     *
     *
     */
    this.onAnimationFinish();
  },

  /**
   *
   *
   *
   */
  show: function(disable) {
    this._super();

    /**
     *
     *
     *
     */
    this.buttons.continue.create();
    this.buttons.continue.setLocalZOrder(10);
    this.buttons.continue.setScale(0);

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.FadeIn.create(0.2)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.parameters.disable = (disable === true);
  },
  hide: function(callback) {

    /**
     *
     *
     *
     */
    this.buttons.continue.destroy();

    /**
     *
     *
     *
     */
    this.elements.rocket.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.elements.rocket.x + 500,
            y: this.elements.rocket.y + 500
          })
        ),
        cc.CallFunc.create(this.elements.rocket.destroy, this.elements.rocket)
      )
    );

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.FadeOut.create(0.2)
        ),
        cc.CallFunc.create(this.removeFromParent, this),
        cc.CallFunc.create(callback ? callback : function() {
        })
      )
    );
  },

  /**
   *
   *
   *
   */
  showCounter: function() {

    /**
     *
     *
     *
     */
    Game.backgrounds.b.y = 600;

    /**
     *
     *
     *
     */
    Game.backgrounds.b.removeFromParent();

    /**
     *
     *
     *
     */
    this.addChild(Game.backgrounds.b);

    /**
     *
     *
     *
     */
    Game.backgrounds.b.runAction(
      cc.Sequence.create(
        cc.EaseBounceOut.create(
          cc.MoveTo.create(1.0, {
            x: 0,
            y: 110
          })
        )
      )
    );

    /**
     *
     *
     *
     */
    if(!this.parameters.disable) {

      /**
       *
       *
       *
       */
      this.parameters.reward.current++;
      this.parameters.gift.current++;

      /**
       *
       *
       *
       */
      if(this.parameters.reward.current >= this.parameters.reward.total) {

        /**
         *
         *
         *
         */
        this.parameters.reward.current = 0;

        /**
         *
         *
         *
         */
        if(Plugins.heyzap.available(Plugins.ad.types.video)) {
          Counter.video.create();
        }
      } else {

        /**
         *
         *
         *
         */
        if(this.parameters.gift.current >= this.parameters.gift.total) {
          this.parameters.gift.current = 0;

          /**
           *
           *
           *
           */
          Counter.gift.create(function() {

            /**
             *
             *
             *
             */
            this.elements.pig.visible = false;
            this.elements.decoration.visible = false;
          }.bind(this));
        }
      }
    }
  },
  hideCounter: function() {

    /**
     *
     *
     *
     */
    Game.backgrounds.b.removeFromParent();
    Game.backgrounds.b.y = 0;

    /**
     *
     *
     *
     */
    Game.addChild(Game.backgrounds.b);

    /**
     *
     *
     *
     */
    Counter.gift.destroy();
    Counter.video.destroy();

    /**
     *
     *
     *
     */
    Counter.clear();
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
      this.buttons.sound.setCurrentFrameIndex(0);
    } else {
      Music.changeState(true);
      Sound.changeState(true);

      /**
       *
       *
       *
       */
      this.buttons.sound.setCurrentFrameIndex(2);
    }
  },

  /**
   *
   *
   *
   */
  showButtons: function() {

    /**
     *
     *
     *
     */
    this.elements.rocket.setSkin(Character.getSkin());

    /**
     *
     *
     *
     */
    this.elements.rocket.create();

    /**
     *
     *
     *
     */
    this.elements.rocket.x = Camera.center.x - parameters.character.positions.finish[Character.parameters.skins.indexOf(Character.parameters.skin)].x - 500;
    this.elements.rocket.y = Camera.center.y - parameters.character.positions.finish[Character.parameters.skins.indexOf(Character.parameters.skin)].y - 500 + (Game.parameters.ad.disabled ? 0 : 100);

    /**
     *
     *
     *
     */
    this.elements.rocket.rotation = 45;

    /**
     *
     *
     *
     */
    this.elements.rocket.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.elements.rocket.x + 500,
            y: this.elements.rocket.y + 500
          })
        )
      )
    );

    /**
     *
     *
     *
     */
    if(Game.parameters.ad.disabled) {

      /**
       *
       *
       *
       */
      this.buttons.noad.destroy();
      this.buttons.sound.create().scale = 0;
      this.buttons.sound.runAction(
        cc.Sequence.create(
          cc.DelayTime.create(0.05),
          cc.EaseSineOut.create(
            cc.ScaleTo.create(0.2, 1.0)
          )
        )
      );
    } else {

      /**
       *
       *
       *
       */
      this.buttons.sound.destroy();
      this.buttons.noad.create().scale = 0;
      this.buttons.noad.runAction(
        cc.Sequence.create(
          cc.DelayTime.create(0.05),
          cc.EaseSineOut.create(
            cc.ScaleTo.create(0.2, 1.0)
          )
        )
      );
    }

    /**
     *
     *
     *
     */
    this.buttons.like.create().scale = 0;
    this.buttons.like.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.1),
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.buttons.rate.create().scale = 0;
    this.buttons.rate.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.15),
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.buttons.share.create().scale = 0;
    this.buttons.share.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.2),
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.buttons.leaderboard.create().scale = 0;
    this.buttons.leaderboard.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.25),
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.buttons.achievements.create().scale = 0;
    this.buttons.achievements.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.3),
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.buttons.store.create().scale = 0;
    this.buttons.store.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.35),
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        )
      )
    );

    /**
     *
     *
     *
     */
    this.buttons.continue.create().scale = 0;
    this.buttons.continue.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.6),
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        ),
        cc.CallFunc.create(this.buttons.continue.register, this.buttons.continue)
      )
    );
  },
  hideButtons: function() {

    /**
     *
     *
     *
     */
    this.elements.rocket.destroy();

    /**
     *
     *
     *
     */
    this.buttons.continue.destroy();
    this.buttons.like.destroy();
    this.buttons.rate.destroy();
    this.buttons.share.destroy();
    this.buttons.leaderboard.destroy();
    this.buttons.achievements.destroy();
    this.buttons.store.destroy();
    this.buttons.noad.destroy();
    this.buttons.sound.destroy();
  },

  /**
   *
   *
   *
   */
  updateTextData: function() {

    /**
     *
     *
     *
     */
    this.textes.coins.format(Counter.values.coins.total);
  },

  /**
   *
   *
   *
   */
  pauseSchedulerAndActions: function() {
    this._super();
  },
  resumeSchedulerAndActions: function() {
    /**
     *
     *
     *
     */
    if(this._super()) {

      /**
       *
       *
       *
       */
      this.buttons.store.updateTextData();
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
    if(this.parameters.animation) {

      /**
       *
       *
       *
       */
      if(this.elements.hand.getNumberOfRunningActions() > 0) return;

      /**
       *
       *
       *
       */
      if(Counter.values.coins.current > 0) {

        /**
         *
         *
         *
         */
        this.parameters.coins.time.elapsed += time;
        if(this.parameters.coins.time.elapsed >= this.parameters.coins.time.current) {
          this.parameters.coins.time.current = random(0.0, 0.1);
          this.parameters.coins.time.elapsed = 0;

          /**
           *
           *
           *
           */
          Counter.values.coins.current--;

          /**
           *
           *
           *
           */
          Counter.values.coins.total++;

          /**
           *
           *
           *
           */
          var element = this.coins.create();

          /**
           *
           *
           *
           */
          element.x = Camera.center.x;
          element.y = Camera.height - 310;

          /**
           *
           *
           *
           */
          element.runAction(
            cc.Sequence.create(
              cc.EaseSineInOut.create(
                cc.MoveTo.create(random(0.5, 1.0), {
                  x: element.x - 10,
                  y: this.elements.pig.y + this.elements.pig.height / 2
                })
              ),
              cc.CallFunc.create(element.destroy, element),
              cc.CallFunc.create(function() {

                /**
                 *
                 *
                 *
                 */
                Finish.updateTextData();

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
                this.scale = 0.95;

                /**
                 *
                 *
                 *
                 */
                this.runAction(
                  cc.Sequence.create(
                    cc.EaseSineInOut.create(
                      cc.ScaleTo.create(0.2, 1.0)
                    )
                  )
                );

                /**
                 *
                 *
                 *
                 */
                Sound.play(resources.main.sound.coins.animation.finish);
              }.bind(this.elements.pig))
            )
          );
        }
      } else {

        /**
         *
         *
         *
         */
        this.finishAnimation();
      }
    }

    /**
     *
     *
     *
     */
    this.elements.hide.scale = this.elements.pig.scale;

    /**
     *
     *
     *
     */
    Visiblities.update();
  }
});
