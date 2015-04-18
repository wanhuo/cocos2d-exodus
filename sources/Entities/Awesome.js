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

Awesome = Entity.extend({

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
    this.elements = new Manager(10, new Entity(resources.main.awesome.texture), this, true);

    /**
     *
     * 
     *
     */
    this.text = new Text('awesome', this, Text.position.left);

    /**
     *
     * 
     *
     */
    this.text.create().attr({
      x: -40,
      y: -40
    });

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
    this.needScheduleUpdate = true;
  },

  /**
   *
   *
   *
   */
  onCreate: function(position) {
    this._super();

    /**
     *
     *
     *
     */
    this.text.format([position]);

    /**
     *
     *
     *
     */
    this.x = 0;
    this.y = position;

    /**
     *
     *
     *
     */
    var x = (Camera.width / Game.parameters.scale.min) / 2;
    var y = 0;

    /**
     *
     *
     *
     */
    while(x > -(Camera.width / Game.parameters.scale.min) / 1.5) {

      /**
       *
       *
       *
       */
      var element = this.elements.create();

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
      x -= 75;
    }
  },
  onDestroy: function() {
    this._super();

    /**
     *
     * 
     *
     */
    this.elements.clear();
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
    this.x = Game.parameters.camera.x + Game.parameters.camera.width / 2;
  }
});
