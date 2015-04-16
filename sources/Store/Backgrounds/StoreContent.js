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
    this.index = index - 1;
    this.id = id - 1;

    /**
     *
     *
     *
     */
    this.updateData();

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
      count: new Entity(resources.main.store.count, this),
      price: new Entity(resources.main.store.price, this)
    };

    /**
     *
     *
     *
     */
    this.buttons = {
      purchase: new Button(resources.main.buttons.coins, 1, 2, this, this.onPurchase.bind(this)),
      choose: new Button(resources.main.buttons.empty, 1, 2, this, this.onChoose.bind(this))
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
      purchase: new Text('store-purchase', this.buttons.purchase),
      choose: new Text('store-choose', this.buttons.choose),
      choosen: new Text('store-choosen', this)
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
    this.buttons.purchase.create().attr({
      x: Camera.center.x,
      y: 150
    });
    this.buttons.choose.create().attr({
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
    this.text.purchase.create().attr({
      x: this.buttons.purchase.width / 2,
      y: this.buttons.purchase.height / 2
    });
    this.text.choose.create().attr({
      x: this.buttons.choose.width / 2,
      y: this.buttons.choose.height / 2
    });
    this.text.choosen.create().attr({
      x: Camera.center.x,
      y: 175
    });

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
    this.updateInfo();

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
  updateData: function() {

    /**
     *
     *
     *
     */
    var item = Items.items[this.index][this.id];

    /**
     *
     *
     *
     */
    this.choisable = item.choisable;
    this.choosen = item.choosen;
    this.unlock = item.unlock;
    this.price = item.price;
    this.owned = item.owned;
    this.type = item.type;
    this.item = item.item;
    this.chooseCode = item.chooseCode;
    this.purchaseCode = item.purchaseCode;
  },
  updateInfo: function() {

    /**
     *
     *
     *
     */
    this.updateData();

    /**
     *
     *
     *
     */
    var unlocked = Counter.values.scores.best >= this.unlock;

    /**
     *
     *
     *
     */
    if(!unlocked) {

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
      this.buttons.purchase.destroy();
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
      this.buttons.purchase.create();
    }

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
      if(unlocked) {

        /**
         *
         *
         *
         */
        this.elements.count.create().attr({
          x: Camera.center.x + 180,
          y: Camera.center.y - 380
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
        this.text.count.format([Data.get(false, this.purchaseCode) || 0]);
      }

      /**
       *
       *
       *
       */
      this.text.choosen.destroy();

      /**
       *
       *
       *
       */
      this.buttons.choose.destroy();
      break;
      case Items.types.permanent:

      /**
       *
       *
       *
       */
      if(this.owned) {

        /**
         *
         *
         *
         */
        this.elements.price.destroy();

        /**
         *
         *
         *
         */
        this.buttons.purchase.destroy();

        /**
         *
         *
         *
         */
        if(this.choisable) {

          /**
           *
           *
           *
           */
          if(this.choosen) {

            /**
             *
             *
             *
             */
            this.text.choosen.create();

            /**
             *
             *
             *
             */
            this.buttons.choose.destroy();
          } else {

            /**
             *
             *
             *
             */
            this.text.choosen.destroy();

            /**
             *
             *
             *
             */
            this.buttons.choose.create();
          }
        }
      } else {

        /**
         *
         *
         *
         */
        this.text.choosen.destroy();

        /**
         *
         *
         *
         */
        this.buttons.choose.destroy();
      }
      break;
    }
  },

  /**
   *
   *
   *
   */
  onPurchase: function() {

    /**
     *
     *
     *
     */
    if(Counter.values.coins.total >= this.price) {

      /**
       *
       *
       *
       */
      Counter.values.coins.total -= this.price;

      /**
       *
       *
       *
       */
      Items.items[this.index][this.id].owned = true;

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
        Data.update(false, this.purchaseCode, 1);
        break;
        case Items.types.permanent:

        /**
         *
         *
         *
         */
        Data.set(false, this.purchaseCode, true);
        break;
      }
    } else {
      // TODO: Opem coins.
      alert('Not enought coins.');
    }

    /**
     *
     *
     *
     */
    Counter.updateTextData();
    Store.updateTextData();

    /**
     *
     *
     *
     */
    Data.set(false, properties.coins, Counter.values.coins.total);

    /**
     *
     *
     *
     */
    this.updateInfo();
  },

  /**
   *
   *
   *
   */
  onChoose: function() {

    /**
     *
     *
     *
     */
    for(var i = 0; i < Items.items[this.index].length; i++) {
      Items.items[this.index][i].choosen = false;
    }

    /**
     *
     *
     *
     */
    Items.items[this.index][this.id].choosen = true;

    /**
     *
     *
     *
     */
    Data.set(false, this.chooseCode, this.id);

    /**
     *
     *
     *
     */
    this.updateInfo();
  }
});
