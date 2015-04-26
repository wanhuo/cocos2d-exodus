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

Splurge = Popup.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(cc.color.WHITE);

    /**
     *
     *
     *
     */
    Splurge = this;

    /**
     *
     *
     *
     */
    this.parameters = {
      popup: {
        scheduler: false
      }
    };
  },

  /**
   *
   *
   *
   */
  animation1: function() {

    /**
     *
     *
     *
     */
    this.show();

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(Character.state.create ? 0.0 : 0.5),
        cc.FadeTo.create(0.2, 255),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          if(Counter.values.scores.current > 0) {

            /**
             *
             *
             *
             */
            Reward.show();
          }
        }),
        cc.DelayTime.create(0.1),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          Counter.clear();

          /**
           *
           *
           *
           */
          Character.setSlotsToSetupPoseCustom();

          /**
           *
           *
           *
           */
          this.changeState(this.parameters.states.prepare);

          /**
           *
           *
           *
           */
          this.resetParallaxes();

          /**
           *
           *
           *
           */
          cc.sys.garbageCollect();

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
            Plugins.admob.show(Plugins.ad.types.interstitial);
          }
        }.bind(Game)),
        cc.DelayTime.create(0.5),
        cc.FadeOut.create(0.5),
        cc.CallFunc.create(this.hide, this)
      )
    );
  },
  animation2: function() {

    /**
     *
     *
     *
     */
    this.show();

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
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          Character.destroy();
        })
      )
    );
  }
});
