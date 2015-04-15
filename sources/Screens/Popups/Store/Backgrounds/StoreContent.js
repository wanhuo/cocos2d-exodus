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

StoreContent = StoreBackground.extend({

  /**
   *
   *
   *
   */
  ctor: function(index, id) {
    this._super();

    /**
     *
     *
     *
     */
    this.unlock = Items.items[index - 1][id - 1].unlock;
    this.price = Items.items[index - 1][id - 1].price;
    this.type = Items.items[index - 1][id - 1].type;
    this.item = Items.items[index - 1][id - 1].item;

    /**
     *
     *
     *
     */
    if(this.item) {

      /**
       *
       *
       *
       */
      this.addChild(this.item.create());
    }

    /**
     *
     *
     *
     */
    this.elements = {
      count: new Entity(resources.main.store.count, this.item),
      price: new Entity(resources.main.store.price, this)
    };

    /**
     *
     *
     *
     */
    this.buttons = {
      buy: new Button(resources.main.buttons.coins, 1, 2, this, this.onBuy.bind(this)),
    };

    /**
     *
     *
     *
     */
    this.text = {
      title: new Text('store-item-title-' + index + '-' + id, this, Text.position.left),
      description: new Text('store-item-description-' + index + '-' + id, this, Text.position.left),
      unlock: new Text('store-unlock', this),
      price: new Text('store-price', this.elements.price),
      count: new Text('store-count', this.elements.count),
      buy: new Text('store-buy', this.buttons.buy)
    };

    /**
     *
     *
     *
     */
    this.elements.price.create().attr({
      x: 130,
      y: Camera.height - 625
    });

    /**
     *
     *
     *
     */
    this.buttons.buy.create().attr({
      x: Camera.center.x,
      y: 150
    });

    /**
     *
     *
     *
     */
    this.text.title.create().attr({
      x: 50 - 8,
      y: Camera.height - 450
    });
    this.text.description.create().attr({
      x: 50,
      y: Camera.height - 550
    });
    this.text.price.create().attr({
      x: this.elements.price.width / 2,
      y: this.elements.price.height / 2
    });
    this.text.buy.create().attr({
      x: this.buttons.buy.width / 2,
      y: this.buttons.buy.height / 2
    });

    /**
     *
     *
     *
     */
    switch(this.type) {
      case Items.types.consumable:

      /**
       *
       *
       *
       */
      this.elements.count.create().attr({
        x: this.item.width,
        y: 0
      });

      /**
       *
       *
       *
       */
      this.text.count.create().attr({
        x: this.elements.count.width / 2,
        y: this.elements.count.height / 2
      });
      break;
      case Items.types.permanent:
      break;
    }

    /**
     *
     *
     *
     */
    this.text.price.format([this.price]);
  },

  /**
   *
   *
   *
   */
  onEnter: function() {

    /**
     *
     *
     *
     */
    if(Counter.values.scores.best < this.unlock) {

      /**
       *
       *
       *
       */
      this.item.setColor(cc.color.BLACK);

      /**
       *
       *
       *
       */
      this.text.unlock.create().attr({
        x: Camera.center.x,
        y: 175
      });
      this.text.unlock.format([this.unlock]);

      /**
       *
       *
       *
       */
      this.buttons.buy.destroy();
    } else {

      /**
       *
       *
       *
       */
      this.item.setColor(cc.color.WHITE);

      /**
       *
       *
       *
       */
      this.text.unlock.destroy();

      /**
       *
       *
       *
       */
      this.buttons.buy.create();
    }

    /**
     *
     *
     *
     */
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
  onBuy: function() {
  }
});
