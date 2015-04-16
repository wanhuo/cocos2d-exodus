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

StoreBackground = Background.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.setCascadeOpacityEnabled(true);

    /**
     *
     *
     *
     */
    this.retain();
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
    var time = 0;

    /**
     *
     *
     *
     */
    this.children.each(function(element) {

      /**
       *
       *
       *
       */
      element.x -= Camera.width;

      /**
       *
       *
       *
       */
      element.runAction(
        cc.Sequence.create(
          cc.DelayTime.create(time),
          cc.EaseSineInOut.create(
            cc.MoveTo.create(0.2, {
              x: element.x + Camera.width,
              y: element.y
            })
          )
        )
      );

      /**
       *
       *
       *
       */
      time += 0.05;
    });

    /**
     *
     *
     *
     */
    this.parent.runAction(
      cc.DelayTime.create(time + 0.2)
    );

    /**
     *
     *
     *
     */
    this.runAction(
      cc.DelayTime.create(time + 0.2)
    );
  },
  onExit: function() {
    this._super();
  },

  /**
   *
   *
   *
   */
  onSwipeLeft: function() {
  },
  onSwipeRight: function() {
  }
});
