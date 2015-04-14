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

Coins = Popup.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(cc.color(21, 176, 191));

    /**
     *
     *
     *
     */
    Coins = this;

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
    this.background = new Background(this);

    /**
     *
     *
     *
     */
    this.elements = {
      view: new ccui.PageView
    };

    /**
     *
     *
     *
     */
    this.elements.holders = [
      new Entity(resources.main.coins.holders[0]),
      new Entity(resources.main.coins.holders[1]),
      new Entity(resources.main.coins.holders[2])
    ];

    /**
     *
     *
     *
     */
    this.buttons = {
      cancel: new Button(resources.main.buttons.bottom, 1, 1, this.background, this.hide.bind(this))
    };

    /**
     *
     *
     *
     */
    this.textes = {
      cancel: new Text('cancel', this.buttons.cancel)
    };

    /**
     *
     *
     *
     */
    this.elements.view.setTouchEnabled(true);
    this.elements.view.setContentSize({
      width: Camera.width,
      height: Camera.height
    });
    this.background.addChild(this.elements.view);

    /**
     *
     *
     *
     */
    for(var i = 0; i < this.elements.holders.length; i++) {

      /**
       *
       *
       *
       */
      var l = new ccui.Layout;

      /**
       *
       *
       *
       */
      l.addChild(this.elements.holders[i]);

      /**
       *
       *
       *
       */
      this.elements.holders[i].create().attr({
        x: Camera.center.x,
        y: Camera.center.y - 150
      });

      /**
       *
       *
       *
       */
      this.elements.view.addPage(l);
    }

    /**
     *
     *
     *
     */
    this.buttons.cancel.create().attr({
      x: Camera.center.x,
      y: 40
    });

    /**
     *
     *
     *
     */
    this.textes.cancel.create().attr({
      x: this.buttons.cancel.width / 2,
      y: this.buttons.cancel.height / 2
    });

    /**
     *
     *
     *
     */
    this.setLocalZOrder(-1);

    /**
     *
     *
     *
     */
   this.background.setLocalZOrder(11);
  },

  /**
   *
   *
   *
   */
  onTouch: function() {
    this.hide();
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
    this.elements.view.addPage(new ccui.Layout);

    /**
     *
     *
     *
     */
    setTimeout(function() {

      /**
       *
       *
       *
       */
      this.elements.view.getPages().each(function(element) {
        element.width /= 1.5;
        element.x /= 1.5;
      });
    }.bind(this), 10);
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
    this.stopAllActions();

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
