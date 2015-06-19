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

Coin = TiledEntity.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.points.texture, 1, 3);

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
    this.motion = new Motion(resources.main.coin.particle, Game.backgrounds.c, this.width);
  },

  /**
   *
   *
   *
   */
  onCreate: function(element, motion) {
    this._super();

    /**
     *
     *
     *
     */
    if(element instanceof cc.Node) {
      element.destroy();
    }

    /**
     *
     *
     *
     */
    var position = Character.convertToWorldSpace(cc.zero);

    /**
     *
     *
     *
     */
    this.x = position.x;
    this.y = position.y;

    /**
     *
     *
     *
     */
    this.motion.create();
  },
  onDestroy: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.motion.destroy();
  },

  /**
   *
   *
   *
   */
  setCurrentFrameIndexAction: function(index) {
    this.setCurrentFrameIndex(index);

    /**
     *
     *
     *
     */
    switch(index) {
      case 0:

      /**
       *
       *
       *
       */
      Sound.play(resources.main.sound.counter.count.random());

      /**
       *
       *
       *
       */
      this.runAction(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.BezierTo.create(1.0, [
              {
                x: this.x,
                y: this.y
              },
              {
                x: random(0, Camera.center.x / 2),
                y: Camera.center.y
              },
              {
                x: Camera.center.x,
                y: Counter.y + Counter.parent.y
              }
            ])
          ),
          cc.CallFunc.create(this.destroy, this),
          cc.CallFunc.create(function() {

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

            /**
             *
             *
             *
             */
            Counter.updateTextData();
          })
        )
      );
      break;
      case 2:

      /**
       *
       *
       *
       */
      Counter.onCoin();

      /**
       *
       *
       *
       */
      this.runAction(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.BezierTo.create(1.0, [
              {
                x: this.x,
                y: this.y
              },
              {
                x: random(0, Camera.width),
                y: Camera.center.y
              },
              {
                x: Counter.coins.x - Counter.coins.width / 4,
                y: Camera.height - 40
              }
            ])
          ),
          cc.CallFunc.create(this.destroy, this),
          cc.CallFunc.create(function() {

            /**
             *
             *
             *
             */
            Counter.coins.stopAllActions();

            /**
             *
             *
             *
             */
            Counter.coins.scale = 1.0;

            /**
             *
             *
             *
             */
            Counter.coins.runAction(
              cc.Sequence.create(
                cc.EaseSineInOut.create(
                  cc.ScaleTo.create(0.06, 1.1)
                ),
                cc.EaseSineInOut.create(
                  cc.ScaleTo.create(0.06, 1.0)
                )
              )
            );

            /**
             *
             *
             *
             */
            Counter.values.coins.current++;

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
            Sound.play(resources.main.sound.coins.collect);
          })
        )
      );
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
    this.scale = (2.0 * Game.backgrounds.d.scale) * Game.h.scale;

    /**
     *
     *
     *
     */
    this.motion.setStroke(this.width * this.scale);

    /**
     *
     *
     *
     */
    this.motion.x = this.x;
    this.motion.y = this.y;
  },

  /**
   *
   *
   *
   */
  deepCopy: function() {
    return new Coin;
  }
});
