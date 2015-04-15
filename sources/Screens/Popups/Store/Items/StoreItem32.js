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

StoreItem32 = Entity.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(resources.main.store.items[2][1].texture);

    /**
     *
     *
     *
     */
    this.elements = {
      shadow: new Entity(resources.main.store.items[2][1].shadow, this)
    };

    /**
     *
     *
     *
     */
    this.elements.shadow.create().setLocalZOrder(-1);

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
    this.x = Camera.center.x;
    this.y = Camera.center.y - 200;

    /**
     *
     *
     *
     */
    this.elements.shadow.x = this.width / 2;
    this.elements.shadow.y = 0;

    /**
     *
     *
     *
     */
    this.elements.shadow.scale = 1.0;

    /**
     *
     *
     *
     */
    this.runAction(
      cc.RepeatForever.create(
        cc.Sequence.create(
          cc.DelayTime.create(1.0),
          cc.EaseSineInOut.create(
            cc.MoveTo.create(3.0, {
              x: this.x,
              y: this.y + 50
            })
          ),
          cc.EaseSineInOut.create(
            cc.MoveTo.create(3.0, {
              x: this.x,
              y: this.y
            })
          )
        )
      )
    );

    /**
     *
     *
     *
     */
    this.elements.shadow.runAction(
      cc.RepeatForever.create(
        cc.Sequence.create(
          cc.DelayTime.create(1.0),
          cc.EaseSineInOut.create(
            cc.MoveTo.create(3.0, {
              x: this.elements.shadow.x,
              y: this.elements.shadow.y - 50
            })
          ),
          cc.EaseSineInOut.create(
            cc.MoveTo.create(3.0, {
              x: this.elements.shadow.x,
              y: this.elements.shadow.y
            })
          )
        )
      )
    );

    /**
     *
     *
     *
     */
    this.elements.shadow.runAction(
      cc.RepeatForever.create(
        cc.Sequence.create(
          cc.DelayTime.create(1.0),
          cc.EaseSineInOut.create(
            cc.ScaleTo.create(3.0, 0.5)
          ),
          cc.EaseSineInOut.create(
            cc.ScaleTo.create(3.0, 1.0)
          )
        )
      )
    );
  }
});
