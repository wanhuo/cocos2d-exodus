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

Smoke = Entity.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.character.smoke);

    /**
     *
     *
     *
     */
    this.parameters = {
    };

    /**
     *
     * 
     *
     */
    this.setLocalZOrder(6);
  },

  /**
   *
   *
   *
   */
  onCreate: function(element) {
    this._super();

    /**
     *
     *
     *
     */
    var angle = -element.rotation * Math.PI / 180.0;

    /**
     *
     *
     *
     */
    var dx = element.x;
    var dy = element.y - 100;

    /**
     *
     *
     *
     */
    var x = cos(angle) * (dx - element.x) - sin(angle) * (dy - element.y) + element.x;
    var y = sin(angle) * (dx - element.x) + cos(angle) * (dy - element.y) + element.y;

    /**
     *
     *
     *
     */
    this.x = x + random(-10, 10);
    this.y = y + random(-10, 10);

    /**
     *
     *
     *
     */
    this.rotation = random(0, 720);

    /**
     *
     *
     *
     */
    this.opacity = 255;

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
    this.runAction(
      cc.Sequence.create(
        cc.EaseSineIn.create(
          cc.ScaleTo.create(0.02, 1.0)
        ),
        cc.EaseSineInOut.create(
          cc.FadeOut.create(1.0)
        ),
        cc.CallFunc.create(this.destroy, this)
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
  deepCopy: function() {
    return new Smoke;
  }
});
