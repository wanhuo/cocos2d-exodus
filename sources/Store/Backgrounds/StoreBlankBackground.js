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

StoreBlankBackground = StoreBackground.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.buttons = {
      refresh: new Button(resources.main.store.buttons.refresh, 1, 2, this, this.onRefresh.bind(this))
    };

    /**
     *
     *
     *
     */
    this.text = {
      title: new Text('store-no-items-title', this),
      decription: new Text('store-no-items-description', this),
      refresh: new Text('store-refresh', this)
    };

    /**
     *
     *
     *
     */
    this.buttons.refresh.create().attr({
      x: Camera.center.x,
      y: Camera.center.y - 200 - 100
    });

    /**
     *
     *
     *
     */
    this.text.title.create().attr({
      x: Camera.center.x,
      y: Camera.center.y - 200 + 250
    });
    this.text.decription.create().attr({
      x: Camera.center.x,
      y: Camera.center.y - 200 + 150
    });
    this.text.refresh.create().attr({
      x: Camera.center.x,
      y: Camera.center.y - 200 - 100 - 60
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
  onRefresh: function() {

    /**
     *
     *
     *
     */
    if(this.buttons.refresh.getNumberOfRunningActions() > 0) return false;

    /**
     *
     *
     *
     */
    this.buttons.refresh.runAction(
      cc.RotateBy.create(0.5, 360)
    );
  }
});
