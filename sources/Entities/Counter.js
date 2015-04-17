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

Counter = Button.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.counter.texture, 1, 1, Game.backgrounds.b, this.onTouch.bind(this));

    /**
     *
     *
     *
     */
    Counter = this;

    /**
     *
     *
     *
     */
    this.coins = new Entity(resources.main.counter.coins, this);

    /**
     *
     *
     *
     */
    this.text = {
      value: new Text('counter', this),
      best: new Text('best', Game.backgrounds.b),
      jumps: new Text('jumps', Game.backgrounds.b),
      deaths: new Text('deaths', Game.backgrounds.b),
      start: new Text('start', Game.backgrounds.b),
      status: new Text('fail', Game.backgrounds.b),
      coins: new Text('coins', this.coins),
      decoration: new Text('decoration-0', Game.backgrounds.b),
      share: new Text('share', Game.backgrounds.b)
    };

    /**
     *
     *
     *
     */
    this.manager = new Manager(1, new Entity(resources.main.counter.texture), this, false, -1);

    /**
     *
     *
     *
     */
    this.coins.create().attr({
      x: this.width / 2,
      y: 15
    });

    /**
     *
     *
     *
     */
    this.text.value.create().attr({
      x: this.width / 2,
      y: this.height / 2
    });
    this.text.best.attr({
      x: Camera.center.x,
      y: Camera.height - 140 + 300
    });
    this.text.jumps.attr({
      x: Camera.center.x,
      y: Camera.height - 180 + 300
    });
    this.text.deaths.attr({
      x: Camera.center.x,
      y: Camera.height - 220 + 300
    });
    this.text.coins.create().attr({
      x: this.coins.width / 2,
      y: this.coins.height / 2
    });

    /**
     *
     *
     *
     */
    this.text.status.setLocalZOrder(-2);
    this.text.decoration.setLocalZOrder(-2);

    /**
     *
     *
     *
     */
    this.values = {
      coins: {
        current: 0,
        total: round(Data.get(false, properties.coins))
      },
      scores: {
        current: 0,
        best: round(Data.get(false, properties.scores.best))
      },
      info: {
        jumps: round(Data.get(false, properties.scores.jumps)),
        deaths: round(Data.get(false, properties.scores.deaths))
      }
    };

    /**
     *
     *
     *
     */
    this.disableOrientationsChangesForChildren();
  },

  /**
   *
   *
   *
   */
  onCreate: function() {
    Entity.prototype.onCreate.call(this);

    /**
     *
     *
     *
     */
    this.values = {
      coins: {
        current: 0,
        total: round(Data.get(false, properties.coins))
      },
      scores: {
        current: 0,
        best: round(Data.get(false, properties.scores.best))
      },
      info: {
        jumps: round(Data.get(false, properties.scores.jumps)),
        deaths: round(Data.get(false, properties.scores.deaths))
      }
    };

    /**
     *
     *
     *
     */
    this.manager.clear();

    /**
     *
     *
     *
     */
    this.scale = 0;

    /**
     *
     *
     *
     */
    this.x = Camera.center.x;
    this.y = Camera.height - 400;

    /**
     *
     *
     *
     */
    this.runAction(
      cc.EaseSineInOut.create(
        cc.ScaleTo.create(0.5, 1.0)
      )
    );

    /**
     *
     *
     *
     */
    this.text.best.create().runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0),
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.text.best.x,
            y: this.text.best.y - 300
          })
        )
      )
    );
    this.text.jumps.create().runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.2),
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.text.jumps.x,
            y: this.text.jumps.y - 300
          })
        )
      )
    );
    this.text.deaths.create().runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.4),
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.text.deaths.x,
            y: this.text.deaths.y - 300
          })
        )
      )
    );

    /**
     *
     *
     *
     */
    this.updateTextData();
  },
  onDestroy: function() {
    Entity.prototype.onDestroy.call(this);

    /**
     *
     *
     *
     */
    this.manager.clear();
  },

  /**
   *
   * 
   *
   */
  onEnter: function() {
    this._super();
  },
  onExit: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.text.status.destroy();
    this.text.decoration.destroy();
    this.text.share.destroy();
  },

  /**
   *
   * 
   *
   */
  onSwipe: function() {
    return true;
  },

  /**
   *
   * 
   *
   */
  onSwipeRight: function() {
  },
  onSwipeLeft: function() {
  },
  onSwipeUp: function() {

    /**
     *
     *
     *
     */
    if(Game.backgrounds.b.y <= 0 && (Game.backgrounds.b.getNumberOfRunningActions() < 1 || Game.backgrounds.b.swipeAction)) {

      /**
       *
       *
       *
       */
      Game.backgrounds.b.stopAllActions();

      /**
       *
       *
       *
       */
      Game.backgrounds.b.runAction(
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.25, {
            x: 0,
            y: 270
          })
        )
      );
    }
  },
  onSwipeDown: function() {

    /**
     *
     *
     *
     */
    if(Game.backgrounds.b.y > 0 && Game.backgrounds.b.getNumberOfRunningActions() < 1) {

      /**
       *
       *
       *
       */
      Game.backgrounds.b.swipeAction = true;

      /**
       *
       *
       *
       */
      Game.backgrounds.b.runAction(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.MoveTo.create(0.25, {
              x: 0,
              y: 0
            })
          ),
          cc.DelayTime.create(2.0),
          cc.EaseSineInOut.create(
            cc.MoveTo.create(0.25, {
              x: 0,
              y: 270
            })
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
  onTouchStart: function() {
    this.stopAllActions();
    this.runAction(
      cc.ScaleTo.create(0.1, 0.9)
    );
  },
  onTouchFinish: function(touch, e) {
    this.stopAllActions();
    this.runAction(
      cc.Sequence.create(
        cc.ScaleTo.create(0.1, 1.0),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          if(touch) {

            /**
             *
             *
             *
             */
            this.onTouch();

            /**
             *
             *
             *
             */
            Sound.play(resources.main.sound.touch);
          }
        }.bind(this))
      )
    );
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
    var text = new Text('share-message');

    /**
     *
     *
     *
     */
    text.format([this.values.scores.best]);

    /**
     *
     *
     *
     */
    Screenshot.save();

    /**
     *
     *
     *
     */
    Social.share({
      screenshot: {
        width: Camera.width,
        height: Camera.width,
        x: 0,
        y: 0
      },
      message: text.getString(),
      url: (function() {
        if(cc.sys.isNative) {
          switch(cc.sys.os) {
            case cc.sys.OS_ANDROID:
            return Config.links.android;
            break;
            case cc.sys.OS_IOS:
            return Config.links.apple;
            break;
          }
        } else {
          return 'http://www.tooflya.com';
        }
      })()
    });

    /**
     *
     *
     *
     */
    Analytics.sendEvent('System events', 'Share', '', '');
  },

  /**
   *
   *
   *
   */
  onCount: function() {

    /**
     *
     *
     *
     */
    var element = this.manager.create();

    /**
     *
     *
     *
     */
    element.x = this.width / 2;
    element.y = this.height / 2;

    /**
     *
     *
     *
     */
    element.scale = 1.0;
    element.opacity = 255;

    /**
     *
     *
     *
     */
    element.setLocalZOrder(-1);

    /**
     *
     *
     *
     */
    element.runAction(
      cc.FadeOut.create(0.3)
    );
    element.runAction(
      cc.Sequence.create(
        cc.ScaleTo.create(0.3, 1.7),
        cc.CallFunc.create(element.destroy, element)
      )
    );

    /**
     *
     *
     *
     */
    if(Game.elements.character.y >= 2000 && probably(30)) {
      if(this.text.decoration.getNumberOfRunningActions() < 1) {

        this.text.decoration.setText('decoration-' + random(0, 2, true));

        this.text.decoration.create().attr({
          x: Camera.center.x,
          y: this.y - 180,
          opacity: 0
        });
        this.text.decoration.runAction(
          cc.Sequence.create(
            cc.FadeIn.create(1.0),
            cc.DelayTime.create(1.0),
            cc.FadeOut.create(1.0),
            cc.CallFunc.create(this.text.decoration.destroy, this.text.decoration)
          )
        );
      }
    }

    /**
     *
     *
     *
     */
    this.updateTextData(true);
  },
  onJump: function() {

    /**
     *
     *
     *
     */
    this.values.info.jumps++;
  },
  onDeath: function() {

    /**
     *
     *
     *
     */
    this.values.info.deaths++;
  },

  /**
   *
   *
   *
   */
  onMistake: function() {
    this.text.status.stopAllActions();

    this.text.status.setText('mistake');

    this.text.status.create().attr({
      x: Camera.center.x,
      y: this.y - 250,
      scale: 0,
      opacity: 255
    });
    this.text.status.runAction(
      cc.Sequence.create(
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        ),
        cc.DelayTime.create(1.5),
        cc.FadeOut.create(0.2),
        cc.CallFunc.create(this.text.status.destroy, this.text.status)
      )
    );

    /**
     *
     * 
     *
     */
    Sound.play(resources.main.sound.counter.fail);
  },

  /**
   *
   *
   *
   */
  onFail: function() {
    this.text.status.stopAllActions();

    this.text.status.setText('fail');

    this.text.status.create().attr({
      x: Camera.center.x,
      y: this.y - 250,
      scale: 0,
      opacity: 255
    });
    this.text.status.runAction(
      cc.Sequence.create(
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        ),
        cc.DelayTime.create(1.5),
        cc.FadeOut.create(0.2),
        cc.CallFunc.create(this.text.status.destroy, this.text.status)
      )
    );

    /**
     *
     * 
     *
     */
    Sound.play(resources.main.sound.counter.fail);
  },

  /**
   *
   *
   *
   */
  onCoin: function() {

    /**
     *
     *
     *
     */
    this.values.coins.current++;

    /**
     *
     * 
     *
     */
    Sound.play(resources.main.sound.counter.coins);
  },

  /**
   *
   *
   *
   */
  count: function() {

    /**
     *
     *
     *
     */
    this.values.scores.current++;

    /**
     *
     *
     *
     */
    this.onCount();

    /**
     *
     * 
     *
     */
    Sound.play(resources.main.sound.counter.count.random());
  },

  /**
   *
   *
   *
   */
  clear: function() {

    /**
     *
     *
     *
     */
    Analytics.sendEvent('Game events', 'Finish: ' + this.values.scores.current + ' / ' + this.values.scores.best, '', '');

    /**
     *
     *
     *
     */
    this.values.scores.best = max(this.values.scores.best, this.values.scores.current);

    /**
     *
     * Manage achievements.
     *
     */
    if(this.values.scores.current >= 100) {
      Services.achievements.update(Config.services.achievements.scores[4]);
    }
    if(this.values.scores.current >= 20) {
      Services.achievements.update(Config.services.achievements.scores[3]);
    }
    if(this.values.scores.current >= 10) {
      Services.achievements.update(Config.services.achievements.scores[2]);
    }
    if(this.values.scores.current >= 5) {
      Services.achievements.update(Config.services.achievements.scores[1]);
    }
    if(this.values.scores.current >= 1) {
      Services.achievements.update(Config.services.achievements.scores[0]);
    }

    /**
     *
     * Manage scores.
     *
     */
    Services.scores.update(Config.services.leaderboards.best, this.values.scores.best);

    /**
     *
     *
     *
     */
    this.values.scores.current = 0;

    /**
     *
     *
     *
     */
    Data.set(false, [properties.scores.best, properties.scores.jumps, properties.scores.deaths], [
      this.values.scores.best,
      this.values.info.jumps,
      this.values.info.deaths
    ]);

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
    if(probably(20)) {
      if(this.text.share.getNumberOfRunningActions() > 0) return false;

      this.text.share.create().attr({
        x: Camera.center.x,
        y: this.y - 180,
        opacity: 0
      });
      this.text.share.runAction(
        cc.Sequence.create(
          cc.FadeIn.create(1.0),
          cc.DelayTime.create(5.0),
          cc.FadeOut.create(1.0),
          cc.CallFunc.create(this.text.share.destroy, this.text.share)
        )
      );
    } else {
      if(this.text.start.getNumberOfRunningActions() > 0) return false;

      this.text.start.create().attr({
        x: Camera.center.x,
        y: this.y - 180,
        opacity: 0
      });
      this.text.start.runAction(
        cc.Sequence.create(
          cc.FadeIn.create(1.0),
          cc.DelayTime.create(1.0),
          cc.FadeOut.create(1.0),
          cc.CallFunc.create(this.text.start.destroy, this.text.start)
        )
      );
    }
  },

  /**
   *
   *
   *
   */
  updateTextData: function(simple) {

    /**
     *
     *
     *
     */
    this.text.value.format([this.values.scores.current]);

    /**
     *
     *
     *
     */
    this.text.coins.format([this.values.coins.current + this.values.coins.total]);

    /**
     *
     *
     *
     */
    if(!simple) {

      /**
       *
       *
       *
       */
      this.text.best.format([max(this.values.scores.current, this.values.scores.best)]);
      this.text.jumps.format([this.values.info.jumps]);
      this.text.deaths.format([this.values.info.deaths]);
    }
  }
});
