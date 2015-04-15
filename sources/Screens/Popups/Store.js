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
    this.elements = {
      coins: new Entity(resources.main.store.coins, this),
      decorations: [
        new Entity(resources.main.store.decorations[0], this)
      ]
    };

    /**
     *
     *
     *
     */
    this.buttons = {
      rockets: new Button(resources.main.store.buttons.rockets, 1, 3, this, this.onBackground1.bind(this)),
      creatures: new Button(resources.main.store.buttons.creatures, 1, 3, this, this.onBackground2.bind(this)),
      bonuses: new Button(resources.main.store.buttons.bonuses, 1, 3, this, this.onBackground3.bind(this)),
      points: new Button(resources.main.store.buttons.points, 1, 3, this, this.onBackground4.bind(this)),
      coins: new Button(resources.main.store.buttons.coins, 1, 3, this, this.onBackground5.bind(this)),
      close: new Button(resources.main.buttons.bottom, 1, 1, this, this.hide.bind(this))
    };

    /**
     *
     *
     *
     */
    this.swithers = [
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
      close: new Text('close', this)
    };

    /**
     *
     *
     *
     */
    this.elements.decorations[0].create().attr({
      x: Camera.center.x,
      y: Camera.height - 300
    });
    this.elements.coins.create().attr({
      x: 150,
      y: Camera.height - 50
    });

    /**
     *
     *
     *
     */
    this.buttons.rockets.create().attr({
      x: Camera.center.x - 180,
      y: Camera.height - 300
    });
    this.buttons.creatures.create().attr({
      x: Camera.center.x - 90,
      y: Camera.height - 300
    });
    this.buttons.bonuses.create().attr({
      x: Camera.center.x,
      y: Camera.height - 300
    });
    this.buttons.points.create().attr({
      x: Camera.center.x + 90,
      y: Camera.height - 300
    });
    this.buttons.coins.create().attr({
      x: Camera.center.x + 180,
      y: Camera.height - 300
    });
    this.buttons.close.create().attr({
      x: Camera.center.x,
      y: 40
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
    this.text.close.create().attr({
      x: Camera.center.x,
      y: 40
    });

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
    this.parameters.index = 0;

    /**
     *
     *
     *
     */
    this.swithers[this.parameters.index].setCurrentFrameIndex(2);

    /**
     *
     *
     *
     */
    this.addChild(this.backgrounds[this.parameters.index]);
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
    this.swithers.each(function(element) {

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
      this.swithers.each(function(element) {

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
      this.swithers[this.parameters.index].setCurrentFrameIndex(2);

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
  updateTextData: function() {

    /**
     *
     *
     *
     */
    this.text.coins.format([Counter.values.coins.total]);
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
