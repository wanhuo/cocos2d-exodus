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

Continue = Popup.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(cc.color(132, 209, 223));

    /**
     *
     *
     *
     */
    Continue = this;

    /**
     *
     *
     *
     */
    this.parameters = {
      popup: {
        scheduler: true
      },
      action: false,
      price: {
        setup: 10,
        current: 0
      },
      count: 1,
      time: {
        current: 7,
        elapsed: 0
      },
      sound: false
    };

    /**
     *
     *
     *
     */
    this.manager = new Manager(1, new Entity(resources.main.continue.background), this, true);

    /**
     *
     *
     *
     */
    this.elements = {
      background: new Entity(resources.main.continue.background, this, true)
    };

    /**
     *
     *
     *
     */
    this.elements.element = new cc.ProgressTimer(new cc.Sprite(resources.main.continue.element));

    /**
     *
     *
     *
     */
    this.buttons = {
      play: new Button(resources.main.buttons.coins, 1, 2, this, this.onPlay.bind(this)),
      stop: new Button(resources.main.buttons.empty, 1, 2, this, this.onStop.bind(this)),
      never: new Button(resources.main.buttons.bottom, 1, 1, this, this.hide.bind(this))
    };

    /**
     *
     *
     *
     */
    this.text = {
      action: new Text('continue-action', this),
      time: new Text('continue-time', this.elements.background),
      play: new Text('button-text-coins', this.buttons.play),
      stop: new Text('button-text-nope', this.buttons.stop),
      never: new Text('never-show-me', this)
    };

    /**
     *
     *
     *
     */
    this.elements.element.type = cc.ProgressTimer.TYPE_RADIAL;
    this.elements.background.addChild(this.elements.element);
    this.elements.element.x = this.elements.background.width / 2;
    this.elements.element.y = this.elements.background.height / 2;
    this.elements.element.setReverseDirection(true);

    /**
     *
     *
     *
     */
    this.text.time.create().attr({
      x: this.elements.background.width / 2,
      y: this.elements.background.height / 2
    });
    this.text.play.create().attr({
      x: this.buttons.play.width / 2,
      y: this.buttons.play.height / 2
    });
    this.text.stop.create().attr({
      x: this.buttons.stop.width / 2,
      y: this.buttons.stop.height / 2
    });
    this.text.never.create().attr({
      x: Camera.center.x,
      y: 40
    });

    /**
     *
     *
     *
     */
    this.buttons.never.create().attr({
      x: Camera.center.x,
      y: 40
    });

    /**
     *
     *
     *
     */
    this.text.time.setLocalZOrder(10);

    /**
     *
     *
     *
     */
    this.setLocalZOrder(-1);
    this.elements.background.setLocalZOrder(10);

    /**
     *
     *
     *
     */
    this.buttons.play.onTouch = function() {

      /**
       *
       *
       *
       */
      if(Counter.values.coins.total >= this.parameters.price.current) {

        /**
         *
         *
         *
         */
        this.onPlay();

        /**
         *
         *
         *
         */
        Sound.play(resources.main.sound.store.purchase);
      } else {

        /**
         *
         *
         *
         */
        Store.show(true);

        /**
         *
         *
         *
         */
        Sound.play(resources.main.sound.store.more);
      }
    }.bind(this);
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
    this.text.action.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.2),
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.buttons.play.x,
            y: this.buttons.play.y - 500
          })
        ),
        cc.CallFunc.create(this.onPlayProceed, this)
      )
    );

    /**
     *
     *
     *
     */
    this.buttons.play.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.1),
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.buttons.play.x,
            y: this.buttons.play.y - 500
          })
        )
      )
    );
    this.buttons.stop.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(0.0),
        cc.EaseSineInOut.create(
          cc.MoveTo.create(0.2, {
            x: this.buttons.stop.x,
            y: this.buttons.stop.y - 500
          })
        )
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
  },
  onStop: function() {

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
    this.hide();
  },

  /**
   *
   *
   *
   */
  onPlayProceed: function() {

    /**
     *
     *
     *
     */
    Counter.values.coins.total -= this.parameters.price.current;
    Counter.updateTextData();

    /**
     *
     *
     *
     */
    this.parameters.action = false;

    /**
     *
     *
     *
     */
    this.parameters.count++;

    /**
     *
     *
     *
     */
    this.hide();

    /**
     *
     *
     *
     */
    Character.resumeSchedulerAndActions();

    /**
     *
     *
     *
     */
    Character.parameters.time = 1;
    Character.parameters.speed.state = true;

    /**
     *
     *
     *
     */
    Character.parameters.state = Character.parameters.states.game;

    /**
     *
     *
     *
     */
    Character.updateTraectory();

    /**
     *
     *
     *
     */
    Game.h.stopAllActions();
    Game.h.runAction(
      cc.EaseSineInOut.create(
        cc.ScaleTo.create(0.2, 1.0)
      )
    );
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
    this.parameters.time.elapsed = 0;
    this.parameters.price.current = this.parameters.price.setup * (this.parameters.count * this.parameters.count);

    /**
     *
     *
     *
     */
    this.buttons.play.create().attr({
      x: Camera.center.x,
      y: Camera.center.y - 420 - 500
    });
    this.buttons.stop.create().attr({
      x: Camera.center.x,
      y: Camera.center.y - 480 - 500
    });

    /**
     *
     *
     *
     */
    this.text.action.create().attr({
      x: Camera.center.x,
      y: Camera.center.y - 300
    });

    /**
     *
     *
     *
     */
    this.elements.background.scale = 0;
    this.elements.background.runAction(
      cc.Sequence.create(
        cc.EaseBounceOut.create(
          cc.ScaleTo.create(1.0, 1.0)
        ),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.parameters.sound = Sound.play(resources.main.sound.continue);

          /**
           *
           *
           *
           */
          this.elements.element.runAction(
            cc.ProgressFromTo.create(this.parameters.time.current, 100, 0)
          );

          /**
           *
           *
           *
           */
          this.runAction(
            cc.Sequence.create(
              cc.Repeat.create(
                cc.Sequence.create(
                  cc.DelayTime.create(1.0),
                  cc.CallFunc.create(this.onAnimation, this)
                ),
                this.parameters.time.current
              ),
              cc.CallFunc.create(this.hide, this)
            )
          );

          /**
           *
           *
           *
           */
          this.buttons.play.runAction(
            cc.EaseSineInOut.create(
              cc.MoveTo.create(0.5, {
                x: this.buttons.play.x,
                y: this.buttons.play.y + 500
              })
            )
          );
          this.buttons.stop.runAction(
            cc.EaseSineInOut.create(
              cc.MoveTo.create(0.5, {
                x: this.buttons.stop.x,
                y: this.buttons.stop.y + 500
              })
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
    this.elements.element.setPercentage(100);

    /**
     *
     *
     *
     */
    this.text.time.format([round(this.parameters.time.current)]);
    this.text.play.format([this.parameters.price.current]);
  },
  onExit: function() {
    this._super();

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
    this.buttons.play.destroy();
    this.buttons.stop.destroy();

    /**
     *
     *
     *
     */
    this.text.action.destroy();

    /**
     *
     *
     *
     */
    Sound.stop(this.parameters.sound);
  },

  /**
   *
   *
   *
   */
  onAnimation: function() {

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
    element.x = Camera.center.x;
    element.y = Camera.center.y;

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
    this.parameters.time.elapsed++;

    /**
     *
     *
     *
     */
    this.text.time.format([this.parameters.time.current - this.parameters.time.elapsed]);
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
    this.parameters.count = 1;

    /**
     *
     *
     *
     */
    this.parameters.action = false;
  },

  /**
   *
   *
   *
   */
  show: function() {

    /**
     *
     *
     *
     */
    this.parameters.action = true;

    /**
     *
     *
     *
     */
    Game.backgrounds.b.addChild(this);

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.FadeTo.create(0.2, 255)
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
    this.elements.background.runAction(
      cc.Sequence.create(
        cc.EaseSineIn.create(
          cc.ScaleTo.create(0.2, 0.0)
        ),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.runAction(
            cc.Sequence.create(
              cc.EaseSineInOut.create(
                cc.FadeTo.create(0.2, 0)
              ),
            cc.CallFunc.create(this.removeFromParent, this)
            )
          );
        }.bind(this))
      )
    );
  },

  /**
   *
   *
   *
   */
  pauseSchedulerAndActions: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.elements.element.pauseSchedulerAndActions();

    /**
     *
     *
     *
     */
    Sound.pause(this.parameters.sound);
  },
  resumeSchedulerAndActions: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.elements.element.resumeSchedulerAndActions();

    /**
     *
     *
     *
     */
    Sound.resume(this.parameters.sound);
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
    this.y = -this.parent.y;
  }
});
