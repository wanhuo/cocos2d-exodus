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

StoreItem50 = Entity.extend({

  /**
   *
   *
   *
   */
  ctor: function(index) {
    this._super(resources.main.store.items[4][index - 1].decoration);

    /**
     *
     *
     *
     */
    this.parameters = {
      index: index
    };

    /**
     *
     *
     *
     */
    this.elements = {
      background: new Entity(resources.main.store.items[4][index - 1].background, this)
    };

    /**
     *
     *
     *
     */
    this.buttons = {
      purchase: new Button(resources.main.store.items[4][index - 1].button, 1, 2, this, this.onTouch)
    };

    /**
     *
     *
     *
     */
    this.buttons.purchase.create().attr({
      x: this.width / 2,
      y: -80
    });

    /**
     *
     *
     *
     */
    this.elements.background.x = Camera.center.x;
    this.elements.background.y = Camera.center.y;

    /**
     *
     *
     *
     */
    this.elements.background.retain();

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
    this.elements.background.pool.parent = Store.holder1;

    /**
     *
     *
     *
     */
    this.elements.background.create();
  },
  onExit: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.elements.background.destroy();
  },

  /**
   *
   *
   *
   */
  onTouch: function() {

    /**
     *
     *
     *
     */
    Store.updateTextData();

    /**
     *
     *
     *
     */
    Counter.updateTextData();

    /**
     *
     *
     *
     */
    Data.set(false, properties.coins, Counter.values.coins.total);
    Game.disableAds();

    /**
     *
     *
     *
     */
    Store.switchers.each(function(element) {

      /**
       *
       *
       *
       */
      element.updateTextData();
    });

    /**
     *
     *
     *
     */
    Sound.play(resources.main.sound.store.purchase);
  }
});
