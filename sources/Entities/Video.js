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

Video = Spine.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.video.json, resources.main.video.atlas, 1.0, Finish);

    /**
     *
     * 
     *
     */
    this.parameters = {
      enable: true,
      animations: {
        animation: {
          index: 1,
          name: 'animation',
          loop: true
        },
        click: {
          index: 2,
          name: 'click',
          loop: false
        }
      },
      coins: 30
    };

    /**
     *
     *
     *
     */
    this.setLocalZOrder(100);

    /**
     *
     *
     *
     */
    this.width = 200;
    this.height = 200;

    /**
     *
     *
     *
     */
    this.setContentSize(this.width, this.height);

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
    this.register();
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
    this.x = Camera.center.x;
    this.y = 150;

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
    this.parameters.enable = true;

    /**
     *
     *
     *
     */
    this.setSlotsToSetupPose();
    this.setBonesToSetupPose();

    /**
     *
     *
     *
     */
    this.clearTracks();

    /**
     *
     *
     *
     */
    this.setAnimation(this.parameters.animations.animation.index, this.parameters.animations.animation.name, this.parameters.animations.animation.loop);

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(1.0),
        cc.EaseSineInOut.create(
          cc.ScaleTo.create(0.2, 1.0)
        )
      )
    );
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   *
   *
   */
  onTouchStart: function() {
    this.runAction(
      cc.ScaleTo.create(0.2, 0.8)
    );
  },
  onTouchFinish: function(touch, e) {
    this.stopAllActions();
    this.setScale(1.0);

    /**
     *
     *
     *
     */
    if(!touch) return false;
    if(!this.parameters.enable) return false;

    /**
     *
     *
     *
     */
    Sound.play(resources.main.sound.touch);

    /**
     *
     *
     *
     */
    this.parameters.enable = false;

    /**
     *
     *
     *
     */
    Plugins.heyzap.show(Plugins.ad.types.video, {

      /**
       *
       *
       *
       */
      success: function() {

        /**
         *
         *
         *
         */
        Game.parameters.ad.interstitial.current = 0;

        /**
         *
         *
         *
         */
        Counter.values.coins.current += 25;

        /**
         *
         *
         *
         */
        Game.parameters.scheduler++;

        /**
         *
         *
         *
         */
        Finish.hide(function() {

          /**
           *
           *
           *
           */
          Finish.show(true);

          /**
           *
           *
           *
           */
          Game.parameters.scheduler--;
        });
      }
    });
  }
});
