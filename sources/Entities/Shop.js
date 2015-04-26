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

Shop = Button.extend({

  /**
   *
   *
   *
   */
  ctor: function(textureFileName, horizontalFramesCount, verticalFramesCount, parent, action) {
    this._super(textureFileName, horizontalFramesCount, verticalFramesCount, parent, action);

    /**
     *
     *
     *
     */
    this.count = 0;

    /**
     *
     *
     *
     */
    this.holder = new Entity(false, this);

    /**
     *
     *
     *
     */
    this.text = new Text('items-count', this.holder);

    /**
     *
     *
     *
     */
    this.holder.create().attr({
      x: this.width,
      y: this.height
    });

    /**
     *
     *
     *
     */
    this.text.create().attr({
      x: this.holder.width / 2,
      y: this.holder.height / 2
    });
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
  },
  onExit: function() {
    this._super();
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
    var count = this.getAvailableItemsCount();

    /**
     *
     *
     *
     */
    if(count != this.count || !count) {
      this.count = count;

      /**
       *
       *
       *
       */
      this.holder.scale = 0;

      /**
       *
       *
       *
       */
      if(count) {

        /**
         *
         *
         *
         */
        this.text.format(count);

        /**
         *
         *
         *
         */
        this.holder.runAction(
          cc.Sequence.create(
            cc.EaseSineInOut.create(
              cc.ScaleTo.create(0.5, 1.0)
            )
          )
        );
      }
    }
  },

  /**
   *
   *
   *
   */
  getAvailableItemsCount: function() {

    /**
     *
     *
     *
     */
    var count = 0;

    /**
     *
     *
     *
     */
    Items.items.each(function(category) {
      category.each(function(item) {
        if(!item.owned && Counter.values.scores.best >= item.unlock && Counter.values.coins.total >= item.price) {
          count++;
        }
      })
    });

    /**
     *
     *
     *
     */
    return count;
  }
});