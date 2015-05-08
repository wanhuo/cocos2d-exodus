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

Explanation = Entity.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(false, Character);

    /**
     *
     * 
     *
     */
    this.setLocalZOrder(20);

    /**
     *
     * 
     *
     */
    this.circle = new Entity(resources.main.explanation.circle, this);

    /**
     *
     * 
     *
     */
    this.elements = [
      new Manager(10, new Entity(resources.main.explanation.texture), this, true),
      new Manager(10, new Entity(resources.main.explanation.texture), this, true)
    ];

    /**
     *
     * 
     *
     */
    this.circle.create();

    /**
     *
     * 
     *
     */
    for(var i = 0; i < 2; i++) {

      /**
       *
       * 
       *
       */
      this.elements[i].setCascadeOpacityEnabled(true);

      /**
       *
       * 
       *
       */
      var x;
      var y;

      /**
       *
       * 
       *
       */
      x = 0;
      y = this.circle.height * 1.4;

      /**
       *
       * 
       *
       */
      while(y < Camera.height * 0.5) {
        var element = this.elements[i].create();

        /**
         *
         *
         *
         */
        element.x = x;
        element.y = y;

        /**
         *
         *
         *
         */
        y += element.height * 1.5;
      }

      /**
       *
       * 
       *
       */
      x = 0;
      y = -this.circle.height * 1.4;

      /**
       *
       * 
       *
       */
      while(y > -Camera.height * 0.5) {
        var element = this.elements[i].create();

        /**
         *
         *
         *
         */
        element.x = x;
        element.y = y;

        /**
         *
         *
         *
         */
        y -= element.height * 1.5;
      }
    }

    /**
     *
     *
     *
     */
    this.elements[1].rotation = 90;
  },

  /**
   *
   *
   *
   */
  onCreate: function() {
    this._super();

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
    this.opacity = 255;

    /**
     *
     *
     *
     */
    for(var i = 0; i < 2; i++) {

      /**
       *
       *
       *
       */
      this.elements[i].stopAllActions();

      /**
       *
       *
       *
       */
      this.elements[i].opacity = 255;
    }

    /**
     *
     *
     *
     */
    this.runAction(
      cc.RepeatForever.create(
        cc.EaseSineInOut.create(
          cc.RotateTo.create(10.0, 720)
        )
      )
    );
  },
  onDestroy: function() {
    this._super();
  }
});
