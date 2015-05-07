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

Unlock = Popup.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(cc.color.BLACK);

    /**
     *
     *
     *
     */
    Unlock = this;

    /**
     *
     *
     *
     */
    this.setCascadeOpacityEnabled(false);

    /**
     *
     *
     *
     */
    this.parameters = {
      popup: {
        scheduler: true
      }
    };

    /**
     *
     *
     *
     */
    this.elements = {
      confetti: new Manager(200, new Confetti, this, true)
    };

    /**
     *
     *
     *
     */
    this.background = new Entity(resources.main.unlock.background, this);

    /**
     *
     *
     *
     */
    this.background.motion = new Motion(resources.main.coin.particle, this, 82);

    /**
     *
     *
     *
     */
    this.text = {
      strings: [
        new Text('unlock-string-1', this),
        new Text('unlock-string-2', this)
      ]
    };

    /**
     *
     *
     *
     */
    this.text.strings[0].x = Camera.center.x;
    this.text.strings[0].y = Camera.center.y - 380;

    /**
     *
     *
     *
     */
    this.text.strings[1].x = Camera.center.x;
    this.text.strings[1].y = Camera.center.y - 450;

    /**
     *
     *
     *
     */
    this.background.setLocalZOrder(10);

    /**
     *
     *
     *
     */
    this.needScheduleUpdate = true;
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
    this.elements.confetti.clear();

    /**
     *
     *
     *
     */
    for(var i = 0; i < this.elements.confetti.count().capacity; i++) {
      this.elements.confetti.create();
    }
  },
  onExit: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.text.strings[0].destroy();
    this.text.strings[1].destroy();
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
    var achievement = false;

    /**
     *
     *
     *
     */
    for(var i = 0; i < Items.length; i++) {
      for(var j = 0; j < Items[i].length; j++) {

        /**
         *
         *
         *
         */
        var element = Items[i][j];

        /**
         *
         *
         *
         */
        if(!element.achieved) {
          if(Counter.values.scores.best >= element.unlock) {

            /**
             *
             *
             *
             */
            achievement = element;

            /**
             *
             *
             *
             */
            achievement.i = i;
            achievement.j = j;

            /**
             *
             *
             *
             */
            Items[i][j].achieved = true;
          }
        }
      }
    }

    /**
     *
     *
     *
     */
    if(achievement) {
      this._super();

      /**
       *
       *
       *
       */
      this.elements.item = achievement.item.deepCopy();

      /**
       *
       *
       *
       */
      this.background.addChild(this.elements.item.create());

      /**
       *
       *
       *
       */
      this.background.create();
      this.background.motion.create();

      /**
       *
       *
       *
       */
      this.elements.item.correctPositionForUnlock();

      /**
       *
       *
       *
       */
      this.background.x = Camera.center.x;
      this.background.y = Camera.center.y;

      /**
       *
       *
       *
       */
      this.background.scale = 0;

      /**
       *
       *
       *
       */
      this.background.runAction(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.ScaleTo.create(0.2, 1.0)
          ),
          cc.CallFunc.create(function() {

            /**
             *
             *
             *
             */
            this.text.strings[0].opacity = 0;
            this.text.strings[1].opacity = 0;

            /**
             *
             *
             *
             */
            this.text.strings[0].create().runAction(
              cc.Sequence.create(
                cc.EaseSineInOut.create(
                  cc.FadeIn.create(1.0)
                ),
                cc.EaseSineInOut.create(
                  cc.FadeOut.create(1.0)
                )
              )
            );

            /**
             *
             *
             *
             */
            this.text.strings[1].create().runAction(
              cc.Sequence.create(
                cc.DelayTime.create(0.2),
                cc.EaseSineInOut.create(
                  cc.FadeIn.create(1.0)
                ),
                cc.EaseSineInOut.create(
                  cc.FadeOut.create(1.0)
                ),
                cc.CallFunc.create(function() {

                  /**
                   *
                   *
                   *
                   */
                  this.runAction(
                    cc.Sequence.create(
                      cc.FadeOut.create(0.5)
                    )
                  );

                  /**
                   *
                   *
                   *
                   */
                  this.background.runAction(
                    cc.Spawn.create(
                      cc.Sequence.create(
                        cc.EaseSineInOut.create(
                          cc.ScaleTo.create(1.0, 0.15)
                        )
                      ),
                      cc.Sequence.create(
                        cc.EaseSineInOut.create(
                          cc.BezierTo.create(1.0, [
                            {x: this.background.x, y: this.background.y},
                            {x: random(0, Camera.width), y: random(0, Camera.height)},
                            {x: Reward.buttons.store.x, y: Reward.buttons.store.y}
                          ])
                        ),
                        cc.CallFunc.create(function() {

                          /**
                           *
                           *
                           *
                           */
                          this.background.destroy();
                          this.background.motion.destroy();

                          /**
                           *
                           *
                           *
                           */
                          var element = Game.elements.rockets.particles[1].create();

                          /**
                           *
                           *
                           *
                           */
                          element.x = this.background.x;
                          element.y = this.background.y;

                          /**
                           *
                           *
                           *
                           */
                          element.scale = 0;

                          /**
                           *
                           *
                           *
                           */
                          element.opacity = 255;

                          /**
                           *
                           *
                           *
                           */
                          element.runAction(
                            cc.Spawn.create(
                              cc.Sequence.create(
                                cc.EaseSineInOut.create(
                                  cc.ScaleTo.create(0.2, 5.0)
                                ),
                                cc.CallFunc.create(element.destroy, element)
                              ),
                              cc.Sequence.create(
                                cc.DelayTime.create(0.1),
                                cc.FadeOut.create(0.1)
                              )
                            )
                          );

                          /**
                           *
                           *
                           *
                           */
                          this.hide();
                        }.bind(this))
                      )
                    )
                  );
                }.bind(this))
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
      this.runAction(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.FadeIn.create(0.2)
          ),
          cc.DelayTime.create(15.0),
          cc.CallFunc.create(this.hide, this)
        )
      );
    }
  },
  hide: function() {

    /**
     *
     *
     *
     */
    this.elements.item.removeFromParent();

    /**
     *
     *
     *
     */
    this.elements.item.release();

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
        cc.CallFunc.create(this.show, this)
      )
    );
  },

  /**
   *
   *
   *
   */
  update: function(time) {
    this._super(true);

    /**
     *
     *
     *
     */
    this.background.motion.x = this.background.x;
    this.background.motion.y = this.background.y;
  }
});
