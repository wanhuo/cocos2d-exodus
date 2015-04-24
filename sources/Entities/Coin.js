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

Coin = Entity.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.coin.texture);

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
  onCreate: function() {
    this._super();

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
              x: Camera.center.x,
              y: Counter.y + Game.backgrounds.b.y
            }
          ])
        ),
        cc.CallFunc.create(this.destroy, this),
        cc.CallFunc.create(Counter.onCount, Counter),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          Sound.play(resources.main.sound.coins.collect);
        })
      )
    );

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
