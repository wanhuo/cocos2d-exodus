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
 * @version of cocos2d is 3.4
 *
 */

Explanation = Entity.extend({

  /**
   *
   *
   *
   */
  ctor: function() {
    this._super(false, Game.backgrounds.game);

    /**
     *
     * 
     *
     */
    this.setLocalZOrder(9);

    /**
     *
     * 
     *
     */
    this.elements = [
      new Manager(10, new Entity(resources.main.explanation), this, true),
      new Manager(10, new Entity(resources.main.explanation), this, true)
    ];

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
      y = 0;

      /**
       *
       * 
       *
       */
      while(y < Camera.height) {
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
      y = 0;

      /**
       *
       * 
       *
       */
      while(y > -Camera.height) {
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
    this.opacity = 255;

    /**
     *
     * 
     *
     */
    for(var i = 0; i < 2; i++) {
      this.elements[i].rotation = random(-360, 360)
    }
  },
  onDestroy: function() {
    this._super();
  }
});
