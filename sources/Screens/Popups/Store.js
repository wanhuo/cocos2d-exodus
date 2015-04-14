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

Store = Popup.extend({

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
    Store = this;

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
    this.buttons = {
      close: new Button(resources.main.buttons.bottom, 1, 1, this, this.hide.bind(this))
    };

    /**
     *
     *
     *
     */
    this.textes = {
      close: new Text('close', this)
    };

    /**
     *
     *
     *
     */
    this.buttons.close.create().attr({
      x: Camera.center.x,
      y: 40
    });

    /**
     *
     *
     *
     */
    this.textes.close.create().attr({
      x: Camera.center.x,
      y: 40
    });
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
  },

  /**
   *
   *
   *
   */
  show: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.FadeIn.create(0.2)
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
    this.runAction(
      cc.Sequence.create(
        cc.EaseSineInOut.create(
          cc.FadeOut.create(0.2)
        ),
        cc.CallFunc.create(this.removeFromParent, this)
      )
    );
  },

  /**
   *
   *
   *
   */
  update: function(time) {
    this._super(time);
  }
});
