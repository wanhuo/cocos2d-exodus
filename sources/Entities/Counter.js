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

Counter = Button.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.counter, 1, 1, Game.backgrounds.b, this.onTouch.bind(this));

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
    this.textes = {
      value: new Text('counter', this),
      best: new Text('best', Game.backgrounds.b),
      jumps: new Text('jumps', Game.backgrounds.b),
      deaths: new Text('deaths', Game.backgrounds.b),
      start: new Text('start', Game.backgrounds.b),
      status: new Text('fail', Game.backgrounds.b),
      decoration: new Text('decoration-0', Game.backgrounds.b),
      share: new Text('share', Game.backgrounds.b)
    };

    /**
     *
     *
     *
     */
    this.manager = new Manager(1, new Entity(resources.main.counter), this, false, -1);

    /**
     *
     *
     *
     */
    this.textes.value.create().attr({
      x: this.width / 2,
      y: this.height / 2
    });
    this.textes.best.attr({
      x: Camera.center.x,
      y: Camera.height - 140 + 300
    });
    this.textes.jumps.attr({
      x: Camera.center.x,
      y: Camera.height - 180 + 300
    });
    this.textes.deaths.attr({
      x: Camera.center.x,
      y: Camera.height - 220 + 300
    });

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
      scores: {
        current: 0,
        best: Data.get(false, properties.scores.best)
      },
      info: {
        jumps: Data.get(false, properties.scores.jumps),
        deaths: Data.get(false, properties.scores.deaths)
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
    this.setScale(0);

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
    this.textes.best.create().runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0),
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.textes.best.x,
            y: this.textes.best.y - 300
          })
        )
      )
    );
    this.textes.jumps.create().runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.2),
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.textes.jumps.x,
            y: this.textes.jumps.y - 300
          })
        )
      )
    );
    this.textes.deaths.create().runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.4),
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.textes.deaths.x,
            y: this.textes.deaths.y - 300
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
      if(this.textes.decoration.getNumberOfRunningActions() > 0) return false;

      this.textes.decoration.setText('decoration-' + random(0, 2, true));

      this.textes.decoration.create().attr({
        x: Camera.center.x,
        y: this.y - 180,
        opacity: 0
      });
      this.textes.decoration.runAction(
        cc.Sequence.create(
          cc.FadeIn.create(1.0),
          cc.DelayTime.create(1.0),
          cc.FadeOut.create(1.0),
          cc.CallFunc.create(this.textes.decoration.destroy, this.textes.decoration)
        )
      );
    }

    /**
     *
     * 
     *
     */
    Sound.play(resources.main.sound.counter.count.random());
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
    this.textes.status.stopAllActions();

    this.textes.status.setText('mistake');

    this.textes.status.create().attr({
      x: Camera.center.x,
      y: this.y - 250,
      scale: 0,
      opacity: 255
    });
    this.textes.status.runAction(
      cc.Sequence.create(
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        ),
        cc.DelayTime.create(1.5),
        cc.FadeOut.create(0.2),
        cc.CallFunc.create(this.textes.status.destroy, this.textes.status)
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
    this.textes.status.stopAllActions();

    this.textes.status.setText('fail');

    this.textes.status.create().attr({
      x: Camera.center.x,
      y: this.y - 250,
      scale: 0,
      opacity: 255
    });
    this.textes.status.runAction(
      cc.Sequence.create(
        cc.EaseSineOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        ),
        cc.DelayTime.create(1.5),
        cc.FadeOut.create(0.2),
        cc.CallFunc.create(this.textes.status.destroy, this.textes.status)
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
  count: function() {

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
    this.values.scores.current++;

    /**
     *
     *
     *
     */
    this.updateTextData(true);
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
      if(this.textes.share.getNumberOfRunningActions() > 0) return false;

      this.textes.share.create().attr({
        x: Camera.center.x,
        y: this.y - 180,
        opacity: 0
      });
      this.textes.share.runAction(
        cc.Sequence.create(
          cc.FadeIn.create(1.0),
          cc.DelayTime.create(5.0),
          cc.FadeOut.create(1.0),
          cc.CallFunc.create(this.textes.share.destroy, this.textes.share)
        )
      );
    } else {
      if(this.textes.start.getNumberOfRunningActions() > 0) return false;

      this.textes.start.create().attr({
        x: Camera.center.x,
        y: this.y - 180,
        opacity: 0
      });
      this.textes.start.runAction(
        cc.Sequence.create(
          cc.FadeIn.create(1.0),
          cc.DelayTime.create(1.0),
          cc.FadeOut.create(1.0),
          cc.CallFunc.create(this.textes.start.destroy, this.textes.start)
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
    this.textes.value.format([this.values.scores.current]);

    /**
     *
     *
     *
     */
    if(!simple) {
      this.textes.best.format([max(this.values.scores.current, this.values.scores.best)]);
      this.textes.jumps.format([this.values.info.jumps]);
      this.textes.deaths.format([this.values.info.deaths]);
    }
  }
});
