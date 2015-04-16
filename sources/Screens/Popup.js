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

Popup = BackgroundColor.extend({

  /**
   *
   *
   *
   */
  ctor: function(color) {
    this._super(false, color);

    /**
     *
     *
     *
     */
    this.install();

    /**
     *
     *
     *
     */
    this.parameters = {
    };

    /**
     *
     *
     *
     */
    this.opacity = 0;

    /**
     *
     *
     *
     */
    this.retain();

    /**
     *
     *
     *
     */
    this.setLocalZOrder(1100);
    this.setCascadeOpacityEnabled(true);
  },

  /**
   *
   *
   *
   */
  onTouchStart: function() {
    this.onTouch();
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
    this.state.create = true;

    /**
     *
     *
     *
     */
    this.scheduleUpdate();
    this.register();

    /**
     *
     *
     *
     */
    if(this.parameters.popup.scheduler) {

      /**
       *
       *
       *
       */
      Game.pauseSchedulerAndActions();

      /**
       *
       *
       *
       */
      Counter.unregister();

      /**
       *
       * Check whether else popups were presented.
       * We should pause their schedulers and actions.
       *
       */
      Game.popups.each(function(element) {

        /**
         *
         *
         *
         */
        element.pauseSchedulerAndActions();
      }.bind(this));
    }

    /**
     *
     *
     *
     */
    Game.popups.push(this);
  },
  onExit: function() {
    this._super();

    /**
     *
     *
     *
     */
    this.state.create = false;

    /**
     *
     *
     *
     */
    this.unscheduleUpdate();
    this.unregister();

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
    if(this.parameters.popup.scheduler) {

      /**
       *
       *
       *
       */
      Game.resumeSchedulerAndActions();

      /**
       *
       *
       *
       */
      Counter.register();

      /**
       *
       * Check whether else popups were presented.
       * We should resume their schedulers and actions.
       *
       */
      Game.popups.each(function(element) {

        /**
         *
         *
         *
         */
        element.resumeSchedulerAndActions();
      }.bind(this));
    }

    /**
     *
     *
     *
     */
    Game.elements.rockets.clear();

    /**
     *
     *
     *
     */
    Game.popups.remove(this);
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
    Game.addChild(this);
  },
  hide: function() {

    /**
     *
     *
     *
     */
    this.removeFromParent();
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
    Game.updateRockets(time);
  },

  /**
   *
   * 
   *
   */
  containsTouchLocation: function() {
    return true;
  }
});
