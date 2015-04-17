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

Reward = Popup.extend({

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
    Reward = this;

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
      }
    };

    /**
     *
     *
     *
     */
    this.coins = new Manager(10, new Entity(resources.main.reward.coin), this, true);

    /**
     *
     *
     *
     */
    this.elements = {
      rocket: new Spine(resources.main.character.json, resources.main.character.atlas, 1.0, this),
      hide: new Entity(resources.main.reward.pig.hide, this),
      hand: new Entity(resources.main.reward.hand, this),
      decoration: new Entity(resources.main.reward.decorations[0], this),
      pig: new Entity(resources.main.reward.pig.texture, this)
    };

    /**
     *
     *
     *
     */
    this.buttons = {
      continue: new Button(resources.main.reward.buttons.continue, 1, 2, this, this.hide.bind(this)),
      like: new Button(resources.main.reward.buttons.like, 1, 2, this, Game.onLike.bind(Game)),
      share: new Button(resources.main.reward.buttons.share, 1, 2, this, Counter.onTouch.bind(Counter)),
      leaderboard: new Button(resources.main.reward.buttons.leaderboard, 1, 2, this, Game.onLeaderboard.bind(Game)),
      achievements: new Button(resources.main.reward.buttons.achievements, 1, 2, this, Game.onAchievements.bind(Game)),
      store: new Button(resources.main.reward.buttons.store, 1, 2, this, Game.onStore.bind(Game)),
      coins: new Button(resources.main.buttons.coins, 1, 2, this, this.onCoins.bind(this)),
      never: new Button(resources.main.buttons.bottom, 1, 1, this, this.hide.bind(this))
    };

    /**
     *
     *
     *
     */
    this.textes = {
      coins: new Text('button-text-coins', this.buttons.coins),
      never: new Text('never-show-me', this)
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
    this.buttons.never.setLocalZOrder(1);

    /**
     *
     *
     *
     */
    this.textes.never.setLocalZOrder(1);

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
      y: 100
    });
    this.elements.pig.create().attr({
      x: Camera.center.x,
      y: 190 - this.elements.pig.height / 2
    });
    this.elements.hide.create().attr({
      x: Camera.center.x,
      y: 190 - this.elements.pig.height / 2
    });

    /**
     *
     *
     *
     */
    this.buttons.coins.create().attr({
      x: Camera.center.x,
      y: 370
    });
    this.buttons.never.create().attr({
      x: Camera.center.x,
      y: 40
    });
    this.buttons.continue.attr({
      x: Camera.center.x,
      y: Camera.center.y - 30
    });
    this.buttons.like.attr({
      x: Camera.center.x - 148,
      y: Camera.center.y - 270
    });
    this.buttons.share.attr({
      x: Camera.center.x - 74,
      y: Camera.center.y - 270
    });
    this.buttons.leaderboard.attr({
      x: Camera.center.x,
      y: Camera.center.y - 270
    });
    this.buttons.achievements.attr({
      x: Camera.center.x + 74,
      y: Camera.center.y - 270
    });
    this.buttons.store.attr({
      x: Camera.center.x + 148,
      y: Camera.center.y - 270
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
    this.textes.never.create().attr({
      x: Camera.center.x,
      y: 40
    });

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
      if(this.elements.hand.getNumberOfRunningActions() > 0 ) return false;

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
      this.finishAnimation();
    }
  },
  onAnimationFinish: function() {

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
  show: function() {
    this._super();

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
  },
  hide: function() {

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
        cc.CallFunc.create(this.removeFromParent, this)
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
      cc.EaseBounceOut.create(
        cc.MoveTo.create(1.0, {
          x: 0,
          y: 90
        })
      )
    );
  },
  hideCounter: function() {

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
    Game.addChild(Game.backgrounds.b);
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
    this.elements.rocket.x = Camera.center.x - 128 - 500;
    this.elements.rocket.y = Camera.center.y - 158 - 500;

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
    this.buttons.achievements.create().scale = 0;
    this.buttons.achievements.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.4),
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
        cc.DelayTime.create(0.5),
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
        )
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
    this.buttons.share.destroy();
    this.buttons.leaderboard.destroy();
    this.buttons.achievements.destroy();
    this.buttons.store.destroy();
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
    this.textes.coins.format([Counter.values.coins.total]);
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
          this.parameters.coins.time.current = random(0.0, 0.5);
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
                Reward.updateTextData();

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
