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
      select: new Button(resources.main.buttons.empty, 1, 2, this, this.onSelect.bind(this))
    };

    /**
     *
     *
     *
     */
    this.text = {
      title: new Text('store-item-title-' + index + '-' + id, this, Text.position.left),
      description: new Text('store-item-description-' + index + '-' + id, this, Text.position.left),
      price: new Text('store-price', this.elements.price),
      count: new Text('store-count', this.elements.count),
      purchase: new Text('store-purchase', this.buttons.purchase),
      select: new Text('store-select', this.buttons.select),
      selected: new Text('store-selected', this)
    };

    /**
     *
     *
     *
     */
    this.elements.price.create().attr({
      x: 130,
      y: Camera.height - 625 + (this.text.description.width < 100 ? 100 : 0)
    });

    /**
     *
     *
     *
     */
    this.buttons.purchase.create().attr({
      x: Camera.center.x,
      y: 100
    });
    this.buttons.select.create().attr({
      x: Camera.center.x,
      y: 100
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
    this.text.select.create().attr({
      x: this.buttons.select.width / 2,
      y: this.buttons.select.height / 2
    });
    this.text.selected.create().attr({
      x: Camera.center.x,
      y: 100
    });

    /**
     *
     *
     *
     */
    this.text.price.format(this.price);

    /**
     *
     *
     *
     */
    this.buttons.purchase.onTouch = function() {

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
        this.onPurchase();

        /**
         *
         *
         *
         */
        Sound.play(resources.main.sound.store.purchase);
      } else {

        /**
         *
         *
         *
         */
        Store.onBackground(4);

        /**
         *
         *
         *
         */
        Sound.play(resources.main.sound.store.more);
      }
    }.bind(this);

    /**
     *
     *
     *
     */
    this.buttons.select.onTouch = function() {

      /**
       *
       *
       *
       */
      this.onSelect();
    }.bind(this);
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
    this.autoselectable = item.autoselectable;
    this.selectable = item.selectable;
    this.selected = item.selected;
    this.price = item.price;
    this.owned = item.owned;
    this.type = item.type;
    this.item = item.item;
    this.selectCode = item.selectCode;
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
    this.item.setColor(cc.color.WHITE);

    /**
     *
     *
     *
     */
    this.buttons.purchase.create();

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
      this.text.count.format(Data.get(false, this.purchaseCode) || 0);

      /**
       *
       *
       *
       */
      this.text.selected.destroy();

      /**
       *
       *
       *
       */
      this.buttons.select.destroy();

      /**
       *
       *
       *
       */
      if(Data.get(false, this.purchaseCode) < 1) {

        /**
         *
         *
         *
         */
        this.item.setColor(cc.color.BLACK);
      } else {

        /**
         *
         *
         *
         */
        this.item.setColor(cc.color.WHITE);
      }
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
        if(this.selectable) {

          /**
           *
           *
           *
           */
          if(this.selected) {

            /**
             *
             *
             *
             */
            this.text.selected.create();

            /**
             *
             *
             *
             */
            this.buttons.select.destroy();
          } else {

            /**
             *
             *
             *
             */
            this.text.selected.destroy();

            /**
             *
             *
             *
             */
            this.buttons.select.create();
          }
        } else {

          /**
           *
           *
           *
           */
          this.text.selected.destroy();

          /**
           *
           *
           *
           */
          this.buttons.select.destroy();
        }
      } else {

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
        this.text.selected.destroy();

        /**
         *
         *
         *
         */
        this.buttons.select.destroy();
      }
      break;
    }

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
    Game.parameters.creatures = true;

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
      Items.items[this.index][this.id].owned = true;

      /**
       *
       *
       *
       */
      Data.set(false, this.purchaseCode, true);

      /**
       *
       *
       *
       */
      if(this.autoselectable) {
        this.onSelect();
      }

      /**
       *
       * Manage achievements.
       *
       */
      var count = 0;
      properties.rockets.each(function(element) {
        if(Data.get(false, element)) {
          count++;
        }
      });

      if(count >= 25) {
        Services.achievements.update(Config.services.achievements.characters[4]);
      }
      if(count >= 20) {
        Services.achievements.update(Config.services.achievements.characters[3]);
      }
      if(count >= 15) {
        Services.achievements.update(Config.services.achievements.characters[2]);
      }
      if(count >= 10) {
        Services.achievements.update(Config.services.achievements.characters[1]);
      }
      if(count >= 5) {
        Services.achievements.update(Config.services.achievements.characters[0]);
      }
      break;
    }

    /**
     *
     *
     *
     */
    Sound.play(resources.main.sound.store.purchase);

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
  onSelect: function() {

    /**
     *
     *
     *
     */
    for(var i = 0; i < Items.items[this.index].length; i++) {
      Items.items[this.index][i].selected = false;
    }

    /**
     *
     *
     *
     */
    Items.items[this.index][this.id].selected = true;

    /**
     *
     *
     *
     */
    Data.set(false, this.selectCode, this.id);

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
    Sound.play(resources.main.sound.store.select);

    /**
     *
     * TODO: Remove it somewhere.
     *
     */
    Character.setSkin(Character.parameters.skins[this.id]);
    Finish.elements.rocket.setSkin(Character.parameters.skins[this.id]);

    Character.retain();
    Finish.elements.rocket.retain();

    var a = Character.parent;
    var b = Finish.elements.rocket.parent;

    if(a) Character.removeFromParent();
    if(b) Finish.elements.rocket.removeFromParent();

    if(a) a.addChild(Character);
    if(b) b.addChild(Finish.elements.rocket);

    Character.release();
    Finish.elements.rocket.release();

    cc.Node.prototype.unscheduleUpdate.call(Character);

    if(b) {

      /**
       *
       *
       *
       */
      Finish.elements.rocket.x = Camera.center.x - parameters.character.positions.finish[Character.parameters.skins.indexOf(Character.parameters.skin)].x;
      Finish.elements.rocket.y = Camera.center.y - parameters.character.positions.finish[Character.parameters.skins.indexOf(Character.parameters.skin)].y;
    }

    /**
     *
     *
     *
     */
    switch(Game.parameters.state) {
      case Game.parameters.states.menu:

      /**
       *
       *
       *
       */
      Character.x = Camera.center.x + parameters.character.positions.menu[Character.parameters.skins.indexOf(Character.parameters.skin)].x;
      Character.y = parameters.character.positions.menu[Character.parameters.skins.indexOf(Character.parameters.skin)].y;
      break;
    }
  }
});
