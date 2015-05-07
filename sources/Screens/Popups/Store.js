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
      index: 0,
      popup: {
        scheduler: true
      }
    };

    /**
     *
     *
     *
     */
    this.holder1 = new Background(this);
    this.holder2 = new Background(this);

    /**
     *
     *
     *
     */
    this.elements = {
      baloon: new Entity(resources.main.store.baloon, this.holder2),
      coins: new Entity(resources.main.store.coins, this.holder2),
      decorations: [
        new Entity(resources.main.store.decorations[0], this.holder2)
      ]
    };

    /**
     *
     *
     *
     */
    this.buttons = {
      rockets: new Switcher(resources.main.store.buttons.rockets, 1, 3, this.holder2, this.onBackground1.bind(this), 0),
      creatures: new Switcher(resources.main.store.buttons.creatures, 1, 3, this.holder2, this.onBackground2.bind(this), 1),
      bonuses: new Switcher(resources.main.store.buttons.bonuses, 1, 3, this.holder2, this.onBackground3.bind(this), 2),
      points: new Switcher(resources.main.store.buttons.points, 1, 3, this.holder2, this.onBackground4.bind(this), 3),
      coins: new Switcher(resources.main.store.buttons.coins, 1, 3, this.holder2, this.onBackground5.bind(this), 4),
      back: new Button(resources.main.store.buttons.back, 1, 2, this.holder2, this.hide.bind(this))
    };

    /**
     *
     *
     *
     */
    this.switchers = [
      this.buttons.rockets,
      this.buttons.creatures,
      this.buttons.bonuses,
      this.buttons.points,
      this.buttons.coins
    ];

    /**
     *
     *
     *
     */
    this.text = {
      coins: new Text('store-coins', this.elements.coins),
      baloon: new Text('store-title-0', this.elements.baloon)
    };

    /**
     *
     *
     *
     */
    this.elements.baloon.create().setAnchorPoint({
      x: 0.9,
      y: 0.0
    });
    this.elements.decorations[0].create().attr({
      x: Camera.center.x,
      y: Camera.height - 300
    });
    this.elements.coins.create().attr({
      x: Camera.width - 120,
      y: Camera.height - 50
    });

    /**
     *
     *
     *
     */
    this.buttons.rockets.create().attr({
      x: Camera.center.x - 230,
      y: Camera.height - 300
    });
    this.buttons.creatures.create().attr({
      x: Camera.center.x - 115,
      y: Camera.height - 300
    });
    this.buttons.bonuses.create().attr({
      x: Camera.center.x,
      y: Camera.height - 300
    });
    this.buttons.points.create().attr({
      x: Camera.center.x + 115,
      y: Camera.height - 300
    });
    this.buttons.coins.create().attr({
      x: Camera.center.x + 230,
      y: Camera.height - 300
    });
    this.buttons.back.create().attr({
      x: 65,
      y: Camera.height - 65
    });

    /**
     *
     *
     *
     */
    this.text.coins.create().attr({
      x: this.elements.coins.width / 2,
      y: this.elements.coins.height / 2
    });
    this.text.baloon.create().attr({
      x: this.elements.baloon.width / 2,
      y: this.elements.baloon.height / 2 + 10
    });

    /**
     *
     *
     *
     */
    this.holder1.setCascadeOpacityEnabled(true);
    this.holder2.setCascadeOpacityEnabled(true);

    /**
     *
     *
     *
     */
    this.holder1.setLocalZOrder(0);
    this.holder2.setLocalZOrder(1);

    /**
     *
     *
     *
     */
    this.backgrounds = [];

    /**
     *
     *
     *
     */
    for(var i = 0; i < 5; i++) {

      /**
       *
       *
       *
       */
      this.backgrounds.push(Items.items[i].length > 0 ? new StoreContentBackground(i) : new StoreBlankBackground);
    }
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
    this.updateTextData();

    /**
     *
     *
     *
     */
    this.elements.baloon.scaleY = 0;
  },
  onExit: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.backgrounds.each(function(element) {

      /**
       *
       *
       *
       */
      element.removeFromParent();
    });

    /**
     *
     *
     *
     */
    this.switchers.each(function(element) {

      /**
       *
       *
       *
       */
      element.setCurrentFrameIndex(0);
    });
  },

  /**
   *
   *
   *
   */
  onBackground: function(index) {

    /**
     *
     *
     *
     */
    if(this.backgrounds[this.parameters.index].getNumberOfRunningActions() < 1) {

      /**
       *
       *
       *
       */
      this.parameters.index = index;

      /**
       *
       *
       *
       */
      this.backgrounds.each(function(element) {

        /**
         *
         *
         *
         */
        element.removeFromParent();
      });

      /**
       *
       *
       *
       */
      this.switchers.each(function(element) {

        /**
         *
         *
         *
         */
        element.setCurrentFrameIndex(0);
      });

      /**
       *
       *
       *
       */
      this.switchers[this.parameters.index].setCurrentFrameIndex(2);

      /**
       *
       *
       *
       */
      this.elements.baloon.runAction(
        cc.Sequence.create(
          cc.EaseSineInOut.create(
            cc.ScaleTo.create(0.2, 1.0, 0.0)
          ),
          cc.CallFunc.create(function() {

            /**
             *
             *
             *
             */
            this.elements.baloon.setFlippedX(this.parameters.index != 4);

            /**
             *
             *
             *
             */
            this.elements.baloon.x = this.switchers[this.parameters.index].x + (this.elements.baloon.isFlippedX() ? this.elements.baloon.width * 0.8 : 0);
            this.elements.baloon.y = this.switchers[this.parameters.index].y + 60;

            /**
             *
             *
             *
             */
            this.text.baloon.setText('store-title-' + this.parameters.index);
          }.bind(this)),
          cc.EaseSineInOut.create(
            cc.ScaleTo.create(0.2, 1.0, 1.0)
          )
        )
      );

      /**
       *
       *
       *
       */
      this.addChild(this.backgrounds[this.parameters.index]);
      }
  },

  /**
   *
   *
   *
   */
  onBackground1: function() { this.onBackground(0); },
  onBackground2: function() { this.onBackground(1); },
  onBackground3: function() { this.onBackground(2); },
  onBackground4: function() { this.onBackground(3); },
  onBackground5: function() { this.onBackground(4); },

  /**
   *
   *
   *
   */
  onSwipe: function() {

    /**
     *
     *
     *
     */
    return true;
  },

  /**
   *
   *
   *
   */
  onSwipeLeft: function() {

    /**
     *
     *
     *
     */
    this.backgrounds[this.parameters.index].onSwipeLeft();
  },
  onSwipeRight: function() {

    /**
     *
     *
     *
     */
    this.backgrounds[this.parameters.index].onSwipeRight();
  },

  /**
   *
   *
   *
   */
  show: function(coins) {
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
        ),
        cc.CallFunc.create(function() {

          /**
           *
           *
           *
           */
          this.onBackground(coins === true ? 4 : 0);
        }.bind(this))
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
  updateTextData: function() {

    /**
     *
     *
     *
     */
    this.text.coins.format(Counter.values.coins.total + 0);
  }
});
